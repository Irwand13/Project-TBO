import { Home, Languages, BookOpen, GitBranch, CheckSquare, Info } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'translator', label: 'Penerjemah', icon: Languages },
    { id: 'grammar', label: 'Grammar', icon: BookOpen },
    { id: 'parsing', label: 'Parsing Tree', icon: GitBranch },
    { id: 'validation', label: 'Validasi', icon: CheckSquare },
    { id: 'about', label: 'Tentang', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#B11226] rounded-lg flex items-center justify-center">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-[#B11226]">Penerjemah Madura</div>
              <div className="text-xs text-gray-500">EBNF & CFG</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-[#B11226] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#B11226]'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) {
                menu.classList.toggle('hidden');
              }
            }}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className="hidden lg:hidden pb-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                  className={`
                    flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-[#B11226] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#B11226]'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
