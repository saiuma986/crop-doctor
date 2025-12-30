import React, { useState, useEffect } from 'react';
import { analyzePlantIssueWithText, analyzePlantIssueWithImage } from '../services/geminiService';
import type { Diagnosis, AnalysisData } from '../types';
import Spinner from './Spinner';
import ResultCard from './ResultCard';
import { useLocale } from '../i18n/LocaleContext';

interface AnalysisPageProps {
  analysisData: AnalysisData;
  onReset: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ analysisData, onReset }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();

  useEffect(() => {
    const performAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let result: Diagnosis;
        if (analysisData.mode === 'text') {
          result = await analyzePlantIssueWithText(analysisData.data);
        } else {
          if (!analysisData.mimeType) {
            throw new Error("MIME type is missing for image analysis.");
          }
          result = await analyzePlantIssueWithImage(analysisData.mimeType, analysisData.data);
        }
        setDiagnosis(result);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred during analysis.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    performAnalysis();
  }, [analysisData]);

  return (
    <div className="max-w-3xl mx-auto">
      {isLoading && <Spinner />}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
          <strong className="font-bold">{t('analysisFailed')}</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {!isLoading && diagnosis && <ResultCard diagnosis={diagnosis} />}

      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
        >
          {t('analyzeAnotherButton')}
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;