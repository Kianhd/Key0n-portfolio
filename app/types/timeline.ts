export interface TimelineStep {
  title: string;
  description: string;
  duration: string;
  icon: string; // Icon name from react-icons
}

export interface ServiceTimeline {
  serviceId: string;
  steps: TimelineStep[];
}

export const serviceTimelines: Record<string, TimelineStep[]> = {
  'custom-brand-music': [
    {
      title: 'Discovery Call',
      description: 'Book a meeting to discuss your brand vision and musical direction',
      duration: '30 min',
      icon: 'FiPhone'
    },
    {
      title: 'Creative Development',
      description: 'Crafting 2-3 unique demo options based on your brief',
      duration: '7 days',
      icon: 'FiMusic'
    },
    {
      title: 'Demo Review',
      description: 'Present 30-second demos for your selection and feedback',
      duration: '1-2 days',
      icon: 'FiPlayCircle'
    },
    {
      title: 'Production & Refinement',
      description: 'Full production with up to 3 rounds of revisions',
      duration: '1-2 days',
      icon: 'FiEdit3'
    },
    {
      title: 'Final Delivery',
      description: 'Receive all versions: 7s, 15s, 30s, and 60s cuts',
      duration: '7-10 days',
      icon: 'FiPackage'
    }
  ],
  'sonic-logos': [
    {
      title: 'Discovery',
      description: 'Align on your brand personality, target audience, and emotional direction',
      duration: '1-2 days',
      icon: 'FiSearch'
    },
    {
      title: 'Concept & Sketches',
      description: 'Create multiple quick concepts with different melodies and tones',
      duration: '3-7 days',
      icon: 'FiPenTool'
    },
    {
      title: 'Refinement',
      description: 'Refine the chosen direction until it feels perfectly aligned',
      duration: '3 days',
      icon: 'FiEdit3'
    },
    {
      title: 'Final Delivery',
      description: 'Receive your sonic logo with platform-optimized cuts and full ownership',
      duration: '2 days',
      icon: 'FiPackage'
    }
  ],
  'content-creators': [
    {
      title: 'Brief Submission',
      description: 'Share your content style and music preferences',
      duration: '1 day',
      icon: 'FiFileText'
    },
    {
      title: 'Music Selection',
      description: 'Browse curated tracks or request custom creation',
      duration: '2-3 days',
      icon: 'FiHeadphones'
    },
    {
      title: 'Licensing & Delivery',
      description: 'Receive licensed music with usage rights',
      duration: '1 day',
      icon: 'FiDownload'
    }
  ],
  'sound-design': [
    {
      title: 'Script & Vision Review',
      description: 'Analyze your film narrative and emotional arc',
      duration: '1-2 days',
      icon: 'FiEye'
    },
    {
      title: 'Theme Development',
      description: 'Create main themes and character motifs',
      duration: '5-7 days',
      icon: 'FiMusic'
    },
    {
      title: 'Scene Scoring',
      description: 'Compose and arrange music for each scene',
      duration: '7-10 days',
      icon: 'FiFilm'
    },
    {
      title: 'Orchestration & Mix',
      description: 'Full orchestration and professional mixing',
      duration: '3-5 days',
      icon: 'FiLayers'
    },
    {
      title: 'Final Master',
      description: 'Cinema-ready masters in all required formats',
      duration: '2 days',
      icon: 'FiCheck'
    }
  ],
  'mixing-mastering': [
    {
      title: 'File Submission',
      description: 'Upload your stems or multitrack sessions',
      duration: '1 day',
      icon: 'FiUpload'
    },
    {
      title: 'Initial Mix',
      description: 'Professional mixing with EQ, compression, and effects',
      duration: '3-5 days',
      icon: 'FiSliders'
    },
    {
      title: 'Revision Round',
      description: 'Refine mix based on your feedback',
      duration: '2-3 days',
      icon: 'FiRefreshCw'
    },
    {
      title: 'Mastering',
      description: 'Final polish for streaming and broadcast standards',
      duration: '2 days',
      icon: 'FiZap'
    },
    {
      title: 'Delivery',
      description: 'Receive high-quality files in all requested formats',
      duration: '1 day',
      icon: 'FiSend'
    }
  ]
};