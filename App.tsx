import React, { useState } from 'react';
import HomePage from './components/HomePage';
import DiagnosisPage from './components/DiagnosisPage';
import AnalysisPage from './components/AnalysisPage';
import type { AnalysisData } from './types';
import { useLocale } from './i18n/LocaleContext';
import type { Locale } from './i18n/LocaleContext';

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale, t } = useLocale();
  
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLocale(e.target.value as Locale);
    };
  
    return (
      <div className="relative">
        <select
          value={locale}
          onChange={handleLanguageChange}
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-label={t('language')}
        >
          <option value="en">{t('english')}</option>
          <option value="es">{t('spanish')}</option>
          <option value="hi">{t('hindi')}</option>
          <option value="te">{t('telugu')}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
};


const App: React.FC = () => {
  const [page, setPage] = useState<'landing' | 'diagnosis' | 'analysis'>('landing');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const { t } = useLocale();

  const handleStartAnalysis = (data: AnalysisData) => {
    setAnalysisData(data);
    setPage('analysis');
  };

  const handleReset = () => {
    setAnalysisData(null);
    setPage('diagnosis');
  };
  
  const goBackToHome = () => {
      setAnalysisData(null);
      setPage('landing');
  }
  
  const goToDiagnosis = () => {
      setPage('diagnosis');
  }

  const renderPage = () => {
    switch(page) {
      case 'landing':
        return <HomePage onGetStarted={goToDiagnosis} />;
      case 'diagnosis':
        return <DiagnosisPage onStartAnalysis={handleStartAnalysis} onBack={goBackToHome} />;
      case 'analysis':
        // This check ensures analysisData is not null when rendering AnalysisPage
        return analysisData ? <AnalysisPage analysisData={analysisData} onReset={handleReset} /> : <HomePage onGetStarted={goToDiagnosis} />;
      default:
        return <HomePage onGetStarted={goToDiagnosis} />;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={goBackToHome}
            aria-label="Go to homepage"
            role="button"
          >
            <span className="text-4xl">🌿</span>
            <h1 className="text-3xl md:text-4xl font-bold text-green-700">
              {t('headerTitle')}
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-gray-500 text-sm">
          {t('footerText')}
        </p>
      </footer>
    </div>
  );
};

export default App;