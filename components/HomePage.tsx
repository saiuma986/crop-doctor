import React from 'react';
import { useLocale } from '../i18n/LocaleContext';

const IconCamera: React.FC = () => (
    <div className="bg-green-100 p-3 rounded-full inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </div>
);

const IconFlask: React.FC = () => (
    <div className="bg-green-100 p-3 rounded-full inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477z" />
        </svg>
    </div>
);

const IconShield: React.FC = () => (
    <div className="bg-green-100 p-3 rounded-full inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.917l9 2.083 9-2.083c-1.181-4.685-4.209-8.491-7.382-10.957z" />
        </svg>
    </div>
);


interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const { t } = useLocale();

  return (
    <div className="animate-fade-in py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center">
        <button
          onClick={onGetStarted}
          className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          {t('diagnosePlantButton')}
        </button>
      </div>

      <div className="mt-20 md:mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <IconCamera />
          <h3 className="text-xl font-semibold text-gray-900 mt-4">{t('feature1Title')}</h3>
          <p className="mt-2 text-gray-600">{t('feature1Text')}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <IconFlask />
          <h3 className="text-xl font-semibold text-gray-900 mt-4">{t('feature2Title')}</h3>
          <p className="mt-2 text-gray-600">{t('feature2Text')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <IconShield />
          <h3 className="text-xl font-semibold text-gray-900 mt-4">{t('feature3Title')}</h3>
          <p className="mt-2 text-gray-600">{t('feature3Text')}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;