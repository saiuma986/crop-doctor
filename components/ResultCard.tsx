import React from 'react';
import type { Diagnosis } from '../types';
import { useLocale } from '../i18n/LocaleContext';

interface ResultCardProps {
  diagnosis: Diagnosis;
}

const IconMicrobe: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12a8 8 0 1 0 16 0a8 8 0 0 0 -16 0" /><path d="M5 12h1" /><path d="M12 5v1" /><path d="M19 12h-1" /><path d="M12 19v-1" /><path d="M8.2 8.2l-1.4 1.4" /><path d="M17.2 17.2l-1.4 -1.4" /><path d="M8.2 15.8l-1.4 -1.4" /><path d="M15.8 8.2l1.4 -1.4" /></svg>
);

const IconCause: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
);

const IconLeaf: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21c.5 -4.5 2.5 -8 7 -10" /><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" /></svg>
);

const IconShield: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M12 11l-4 4" /><path d="M12 15l4 -4" /></svg>
);

const IconAlert: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M10.24 3.957l-8.24 14.043h16.48l-8.24 -14.043z" transform="rotate(120 12 12)" /><path d="M12 16h.01" /></svg>
);


const InfoSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      {icon}
      <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="pl-9">{children}</div>
  </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ diagnosis }) => {
  const { crop, issueName, cause, organicTreatment, preventionTips, expertHelp } = diagnosis;
  const { t } = useLocale();

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-800">{crop}</h2>
        <p className="text-xl text-gray-600 mt-1">{issueName}</p>
      </div>
      
      <div className="space-y-4">
        <InfoSection icon={<IconMicrobe className="w-6 h-6 text-green-600" />} title={t('issueTitle')}>
          <p className="text-gray-700">{issueName}</p>
        </InfoSection>

        <InfoSection icon={<IconCause className="w-6 h-6 text-yellow-600" />} title={t('causeTitle')}>
          <p className="text-gray-700">{cause}</p>
        </InfoSection>
        
        <InfoSection icon={<IconLeaf className="w-6 h-6 text-emerald-600" />} title={t('treatmentTitle')}>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {organicTreatment.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </InfoSection>

        <InfoSection icon={<IconShield className="w-6 h-6 text-blue-600" />} title={t('preventionTitle')}>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {preventionTips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </InfoSection>

        <InfoSection icon={<IconAlert className="w-6 h-6 text-red-600" />} title={t('expertHelpTitle')}>
          <p className="text-gray-700">{expertHelp}</p>
        </InfoSection>
      </div>
    </div>
  );
};

export default ResultCard;