// Scraper para montar src/data/servicos.json com ordem igual ao site
// Requer: node >=18 (fetch nativo) e pacote 'cheerio'
// Instalar: npm i -D cheerio

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as loadHTML } from 'cheerio';

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
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Scraper Araguaina)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function getCategoriasPrincipais() {
  return [
    { id: 'cidadao',  titulo: 'Cidadão',  url: `${BASE}/cidadao` },
    { id: 'educacao', titulo: 'Educação', url: `${BASE}/educacao` },
    { id: 'empresa',  titulo: 'Empresa',  url: `${BASE}/categorias/empresa` },
    { id: 'servidor', titulo: 'Servidor', url: `${BASE}/servidor` },
    { id: 'turista',  titulo: 'Turista',  url: `${BASE}/turista` },
  ];
}

async function extractServiceLinksFromCategoryPage(catUrl) {
  const html = await fetchHTML(catUrl);
  const $ = loadHTML(html);
  const links = [];
  const seen = new Set();
  $('a[href^="/servicos/"]').each((_, a) => {
    const href = $(a).attr('href');
    if (!href) return;
    if (!/^\/servicos\//.test(href)) return;
    const abs = new URL(href, BASE).href;
    const slug = abs.split('/').filter(Boolean).pop();
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      links.push(abs);
    }
  });
  return links;
}

async function extractServiceDetail(url) {
  const html = await fetchHTML(url);
  const $ = loadHTML(html);
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
  const label = $('*:contains("Link para acesso ao Serviço no sistema de origem")');
  if (label.length) {
    const a = label.find('a[href]').first();
    const href = a.attr('href');
    if (href) {
      detail.url_destino_final = href.startsWith('http') ? href : new URL(href, BASE).href;
      detail.tipo_destino_final = classifyDestino(detail.url_destino_final);
    }
  } else {
    const a = $('a[href^="http"]').filter((_, el) => !$(el).attr('href').includes(BASE)).first();
    const href = a.attr('href');
    if (href) {
      detail.url_destino_final = href;
      detail.tipo_destino_final = classifyDestino(href);
    }
  }
  const texto = $('body').text();
  if (/servidor(es)?/i.test(texto)) detail.audience.push('Servidores');
  if (/empresa(s)?|iss|nfs/i.test(texto)) detail.audience.push('Empresas');
  if (detail.audience.length === 0) detail.audience.push('Cidadãos');
  if (/fazenda/i.test(texto)) detail.secretaria_responsavel = 'Secretaria Municipal da Fazenda';
  if (/meio\s+ambiente/i.test(texto)) detail.secretaria_responsavel = 'Meio Ambiente';
  return detail;
}

async function run() {
  const categorias = await getCategoriasPrincipais();
  const resultado = [];
  for (const cat of categorias) {
    try {
      const links = await extractServiceLinksFromCategoryPage(cat.url);
      const servicos = [];
      for (const link of links) {
        try {
          const d = await extractServiceDetail(link);
          d.category = cat.titulo;
          servicos.push(d);
          await sleep(200);
        } catch (e) {
          console.warn('Falha serviço', link, e.message);
        }
      }
      resultado.push({ id: cat.id, titulo: cat.titulo, servicos });
    } catch (e) {
      console.warn('Falha categoria', cat.url, e.message);
      resultado.push({ id: cat.id, titulo: cat.titulo, servicos: [] });
    }
  }
  const json = { categorias: resultado };
  const outPath = path.resolve(__dirname, '../src/data/servicos.json');
  await fs.writeFile(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log('Catálogo atualizado em', outPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

