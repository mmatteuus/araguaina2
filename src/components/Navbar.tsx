export const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#003EDC] to-[#005EDC] border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              Prefeitura de Araguaína
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};