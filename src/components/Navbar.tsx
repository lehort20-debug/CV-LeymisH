import React, { useState } from 'react';
import {
  FileText,
  Moon,
  Sun,
  Palette,
  Edit3,
  Download,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
  QrCode,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface NavbarProps {
  data: PortfolioData;
  onOpenCvModal: () => void;
  onOpenQrModal: () => void;
  onOpenEditorModal: () => void;
  onOpenExportModal: () => void;
  onThemeColorChange: (color: ThemeColor) => void;
  onToggleDarkMode: () => void;
  activeColor: ThemeColor;
  darkMode: boolean;
}

const navItems = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Contacto', href: '#contacto' },
];

const colorOptions: { id: ThemeColor; label: string; bg: string }[] = [
  { id: 'indigo', label: 'Índigo', bg: 'bg-indigo-600' },
  { id: 'emerald', label: 'Esmeralda', bg: 'bg-emerald-600' },
  { id: 'violet', label: 'Violeta', bg: 'bg-violet-600' },
  { id: 'amber', label: 'Ámbar', bg: 'bg-amber-600' },
  { id: 'rose', label: 'Rosa', bg: 'bg-rose-600' },
  { id: 'slate', label: 'Minimal', bg: 'bg-slate-900' },
];

export const Navbar: React.FC<NavbarProps> = ({
  data,
  onOpenCvModal,
  onOpenQrModal,
  onOpenEditorModal,
  onOpenExportModal,
  onThemeColorChange,
  onToggleDarkMode,
  activeColor,
  darkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  const theme = themeConfigs[activeColor];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brand Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white tracking-tight group"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm transition-transform group-hover:scale-105 ${theme.accentBg}`}
          >
            {data.personal.fullName.slice(0, 1) || 'CV'}
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-sm sm:text-base font-bold leading-tight whitespace-nowrap">
              Leymis<span className={theme.accentText}>.HP</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden lg:inline whitespace-nowrap">
              Marketing Estratégico
            </span>
          </div>
        </a>

        {/* Desktop Nav Links - Single line guaranteed */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white ${theme.accentHover}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Compartir QR Button - High visibility */}
          <button
            id="btn-navbar-qr"
            onClick={onOpenQrModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 text-white ${theme.accentBg} cursor-pointer`}
            title="Compartir código QR de mi landing page"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Compartir QR</span>
            <span className="sm:hidden">QR</span>
          </button>

          {/* Quick Edit */}
          <button
            id="btn-edit-landing"
            onClick={onOpenEditorModal}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Editar contenido"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Color Palette Menu */}
          <div className="relative">
            <button
              id="btn-toggle-color-menu"
              onClick={() => setColorMenuOpen(!colorMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Cambiar color del tema"
            >
              <Palette className="w-4 h-4" />
            </button>

            {colorMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 py-1 tracking-wider">
                  Color de acento
                </div>
                <div className="space-y-1 mt-1">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onThemeColorChange(opt.id);
                        setColorMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        activeColor === opt.id
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${opt.bg}`} />
                        <span>{opt.label}</span>
                      </div>
                      {activeColor === opt.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="btn-toggle-dark-mode"
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Export / Share */}
          <button
            id="btn-export-landing"
            onClick={onOpenExportModal}
            className="hidden sm:flex items-center gap-1 p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Exportar o descargar"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenQrModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 px-3 py-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              Código QR
            </button>
            <button
              onClick={() => {
                onOpenExportModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 px-3 py-2"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button
              onClick={() => {
                onOpenEditorModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 px-3 py-2"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
