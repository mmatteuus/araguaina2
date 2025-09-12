// Scraper para montar src/data/servicos.json
// Requer: node >=18 (fetch nativo) e pacote 'cheerio'
// Instale: npm i -D cheerio

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'https://www.araguaina.to.gov.br';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function classifyDestino(url) {
  if (!url) return 'outros';
  const u = url.toLowerCase();
  if (u.endsWith('.pdf')) return 'pdf';
  if (u.includes('gov.br')) return 'govbr';
  if (u.includes('webiss')) return 'webiss';
  if (u.includes('serpro')) return 'serpro';
  if (u.includes('perkons')) return 'perkons';
  if (u.includes('sig.araguaina') || u.includes('prodata')) return 'prodata';
  return 'outros';
}

async function fetchHTML(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Scraper Araguaina)' }});
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function getCategoriasPrincipais() {
  // As 5 fixas já definidas
  return [
    { id: 'cidadao', titulo: 'Cidadão', url: `${BASE}/cidadao` },
    { id: 'educacao', titulo: 'Educação', url: `${BASE}/educacao` },
    { id: 'empresa', titulo: 'Empresa', url: `${BASE}/categorias/empresa` },
    { id: 'servidor', titulo: 'Servidor', url: `${BASE}/servidor` },
    { id: 'turista', titulo: 'Turista', url: `${BASE}/turista` },
  ];
}

async function extractServicosFromListaGeral() {
  // Página paginada de serviços
  const url = `${BASE}/servicos`;
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  // Heurística: encontrar cards/lista de serviços com links para /servicos/<slug>
  const links = new Set();
  $('a[href^="/servicos/"]').each((_, a) => {
    const href = $(a).attr('href');
    if (href && /^\/servicos\//.test(href)) links.add(new URL(href, BASE).href);
  });
  return [...links];
}

async function extractServiceDetail(url) {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  const title = ($('h1').first().text() || $('title').text() || '').trim();
  const slug = url.split('/').filter(Boolean).pop();
  const detail = {
    title,
    slug: slugify(slug || title),
    category: '',
    audience: [],
    secretaria_responsavel: undefined,
    url_pagina_servico: url,
    url_destino_final: '',
    tipo_destino_final: 'outros',
    observacoes: undefined,
  };
  // Procurar campo "Link para acesso ao Serviço no sistema de origem"
  const labels = $('*:contains("Link para acesso ao Serviço no sistema de origem")');
  if (labels.length) {
    const a = labels.find('a[href]').first();
    const href = a.attr('href');
    if (href) {
      detail.url_destino_final = href.startsWith('http') ? href : new URL(href, BASE).href;
      detail.tipo_destino_final = classifyDestino(detail.url_destino_final);
    }
  } else {
    // Heurística: primeiro link externo relevante
    const a = $('a[href^="http"]').filter((_, el) => !$(el).attr('href').includes(BASE)).first();
    const href = a.attr('href');
    if (href) {
      detail.url_destino_final = href;
      detail.tipo_destino_final = classifyDestino(href);
    }
  }
  // Público-alvo e secretaria (heurísticas)
  const texto = $('body').text();
  if (/servidor(es)?/i.test(texto)) detail.audience.push('Servidores');
  if (/empresa(s)?|iss|nfs/i.test(texto)) detail.audience.push('Empresas');
  if (detail.audience.length === 0) detail.audience.push('Cidadãos');
  if (/fazenda/i.test(texto)) detail.secretaria_responsavel = 'Secretaria Municipal da Fazenda';
  if (/meio\s+ambiente/i.test(texto)) detail.secretaria_responsavel = 'Meio Ambiente';
  return detail;
}

function mapDetailToCategoria(detail) {
  const aud = (detail.audience || []).map(a => a.toLowerCase());
  if (aud.includes('servidores')) return 'Servidor';
  if (aud.includes('empresas')) return 'Empresa';
  return 'Cidadão';
}

async function run() {
  const categorias = await getCategoriasPrincipais();
  const lista = await extractServicosFromListaGeral();
  const servicosDetalhe = [];

  for (const link of lista) {
    try {
      const d = await extractServiceDetail(link);
      d.category = mapDetailToCategoria(d);
      servicosDetalhe.push(d);
      await sleep(250);
    } catch (e) {
      console.warn('Falha ao extrair', link, e.message);
    }
  }

  const porCategoria = {
    cidadao: [], educacao: [], empresa: [], servidor: [], turista: [],
  };
  for (const s of servicosDetalhe) {
    const key = s.category.toLowerCase();
    if (key.includes('empresa')) porCategoria.empresa.push(s);
    else if (key.includes('servidor')) porCategoria.servidor.push(s);
    else porCategoria.cidadao.push(s);
  }

  const json = {
    categorias: categorias.map(c => ({
      id: c.id,
      titulo: c.titulo,
      servicos: porCategoria[c.id] || [],
    }))
  };

  const outPath = path.resolve(__dirname, '../src/data/servicos.json');
  await fs.writeFile(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log('Catálogo atualizado em', outPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

