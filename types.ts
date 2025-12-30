
export interface Diagnosis {
  crop: string;
  issueName: string;
  cause: string;
  organicTreatment: string[];
  preventionTips: string[];
  expertHelp: string;
}

export type InputMode = 'text' | 'image';

// FIX: Add AnalysisData interface to share data structure for analysis between components.
export interface AnalysisData {
  mode: InputMode;
  data: string; // for text or base64 image
  mimeType?: string; // for image
}
