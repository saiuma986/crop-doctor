import React, { useState, useRef } from 'react';
import type { InputMode, AnalysisData } from '../types';
import { useLocale } from '../i18n/LocaleContext';

interface DiagnosisPageProps {
  onStartAnalysis: (data: AnalysisData) => void;
  onBack: () => void;
}

const DiagnosisPage: React.FC<DiagnosisPageProps> = ({ onStartAnalysis, onBack }) => {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();

  const handleModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setError(null);
    setTextInput('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError(t('errorSize'));
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleAnalyzeClick = () => {
    if (inputMode === 'text') {
      if (!textInput.trim()) {
        setError(t('errorDescription'));
        return;
      }
      onStartAnalysis({ mode: 'text', data: textInput });
    } else {
      if (!imageFile || !imagePreview) {
        setError(t('errorImage'));
        return;
      }
      const base64Data = imagePreview.split(',')[1];
      onStartAnalysis({ mode: 'image', data: base64Data, mimeType: imageFile.type });
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex border-b mb-6">
        <button
          onClick={() => handleModeChange('text')}
          className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
            inputMode === 'text'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-500'
          }`}
        >
          {t('tabDescribe')}
        </button>
        <button
          onClick={() => handleModeChange('image')}
          className={`flex-1 py-3 text-center font-semibold transition-colors duration-300 ${
            inputMode === 'image'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-500'
          }`}
        >
          {t('tabUpload')}
        </button>
      </div>

      {inputMode === 'text' ? (
        <div>
          <label htmlFor="symptoms" className="block text-gray-700 font-medium mb-2">
            {t('describeLabel')}
          </label>
          <textarea
            id="symptoms"
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
            placeholder={t('describePlaceholder')}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="text-center">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          {imagePreview ? (
            <div className="mb-4 relative">
                <img src={imagePreview} alt="Plant preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                 <button 
                    onClick={() => {setImageFile(null); setImagePreview(null)}} 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 text-gray-600 text-2xl font-bold flex items-center justify-center h-8 w-8 leading-none"
                    aria-label={t('removeImageLabel')}
                 >&times;</button>
            </div>
          ) : (
            <div
              onClick={triggerFileSelect}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-green-500 bg-gray-50 transition-colors"
            >
              <p className="text-gray-500">{t('uploadPrompt')}</p>
              <p className="text-sm text-gray-400 mt-2">{t('uploadHint')}</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row-reverse gap-3 mt-6">
        <button
          onClick={handleAnalyzeClick}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          {t('analyzeButton')}
        </button>
        <button
          onClick={onBack}
          className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
          aria-label="Go back to homepage"
        >
          {t('backButton')}
        </button>
      </div>
    </div>
  );
};

export default DiagnosisPage;