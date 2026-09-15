import React, { useState, useEffect } from 'react';
import { defaultPortfolio } from './data/defaultPortfolio';
import { PortfolioData, ThemeColor } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvImportModal } from './components/CvImportModal';
import { LiveEditorModal } from './components/LiveEditorModal';
import { ExportModal } from './components/ExportModal';
import { QRCodeModal } from './components/QRCodeModal';
import { Sparkles, X } from 'lucide-react';

const STORAGE_KEY = 'cv_landing_portfolio_leymis_marketing_v6';

export default function App() {
  // Load saved state or default
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.personal?.fullName?.toLowerCase().includes('leymis')) {
          const prevAvatar = parsed?.personal?.avatarUrl;
          const cleanAvatar =
            prevAvatar &&
            prevAvatar !== '/leymis-profile.jpg' &&
            prevAvatar !== '/leymis-real-headshot.jpg' &&
            prevAvatar !== '/Foto.png'
              ? prevAvatar
              : '/Foto800x800.png';
          return {
            ...defaultPortfolio,
            personal: {
              ...defaultPortfolio.personal,
              avatarUrl: cleanAvatar,
            },
          };
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return defaultPortfolio;
  });

  const [activeColor, setActiveColor] = useState<ThemeColor>(
    data.theme?.color || 'indigo'
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    data.theme?.darkMode || false
  );

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Sync darkMode with HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist changes to localStorage
  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
    if (newData.theme?.color) {
      setActiveColor(newData.theme.color);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleThemeColorChange = (color: ThemeColor) => {
    setActiveColor(color);
    const updated = {
      ...data,
      theme: {
        ...data.theme,
        color,
      },
    };
    handleUpdateData(updated);
  };

  const handleToggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    const updated = {
      ...data,
      theme: {
        ...data.theme,
        darkMode: nextDark,
      },
    };
    handleUpdateData(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        data={data}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenEditorModal={() => setIsEditorModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onThemeColorChange={handleThemeColorChange}
        onToggleDarkMode={handleToggleDarkMode}
        activeColor={activeColor}
        darkMode={darkMode}
      />

      {/* Main Landing Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          data={data}
          themeColor={activeColor}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          onUpdateAvatar={(newUrl: string) => {
            handleUpdateData({
              ...data,
              personal: {
                ...data.personal,
                avatarUrl: newUrl,
              },
            });
          }}
        />

        {/* 2. About Me Section */}
        <About
          data={data}
          themeColor={activeColor}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        {/* 3. Professional Experience & Achievements */}
        <Experience data={data} themeColor={activeColor} />

        {/* 4. Featured Projects Showcase */}
        <Projects
          projects={data.projects}
          themeColor={activeColor}
          onOpenEditorModal={() => setIsEditorModalOpen(true)}
        />

        {/* 5. Skills Matrix */}
        <Skills
          categories={data.skillCategories}
          themeColor={activeColor}
        />

        {/* 6. Education & Certifications */}
        <Education
          education={data.education}
          themeColor={activeColor}
        />

        {/* 7. Interactive Contact Section */}
        <Contact personal={data.personal} themeColor={activeColor} />
      </main>

      {/* Footer */}
      <Footer data={data} themeColor={activeColor} />

      {/* Modals */}
      <CvImportModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        onApplyData={handleUpdateData}
        themeColor={activeColor}
      />

      <LiveEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        data={data}
        onSave={handleUpdateData}
        themeColor={activeColor}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={data}
        themeColor={activeColor}
      />

      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        data={data}
        themeColor={activeColor}
      />
    </div>
  );
}
