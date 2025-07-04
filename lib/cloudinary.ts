export const CLOUDINARY_CLOUD_NAME = "dwzp6d4lb";

export const getCloudinaryUrl = (
  publicId: string,
  options: {
    type: "video" | "image";
    transformations?: string;
  }
) => {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;
  const resourceType = options.type === "video" ? "video" : "image";
  const transform = options.transformations || "f_auto,q_auto";
  
  // Don't encode the publicId - Cloudinary expects it as-is
  // Just use the publicId directly
  const url = `${baseUrl}/${resourceType}/upload/${transform}/${publicId}`;
  
  console.log('Generated Cloudinary URL:', url);
  return url;
};

// Real Cloudinary folder mapping with video files
export const projectFolders = {
  'Always Generic pack - music composition - hiphop': {
    folderName: 'Always Generic pack - music composition - hiphop',
    client: 'Independent Artist',
    type: 'hiphop',
    category: 'music composition',
    title: 'Always Generic Pack',
    videoFiles: ['Always_GenericPack_240403_1_vlefeu']
  },
  'Clorox - platinum campaign - "mhhmm..." - music composition - commercial': {
    folderName: 'Clorox - platinum campaign - "mhhmm..." - music composition - commercial',
    client: 'Clorox',
    type: 'commercial',
    category: 'music composition',
    title: 'Clorox Platinum Campaign',
    videoFiles: ['24050220_Clorox_30s_EN_240920_bxcloc', '24050220_Clorox_30s_AR_240930_xctonc']
  },
  'Evvoli - sound design': {
    folderName: 'Evvoli - sound design',
    client: 'Evvoli',
    type: 'commercial',
    category: 'sound design',
    title: 'Evvoli Sound Design',
    videoFiles: ['250207_Evvoli_SD-kian_copy_burfyi']
  },
  'Key0n Resume - Music Video - music composition - hiphop trap': {
    folderName: 'Key0n Resume - Music Video - music composition - hiphop trap',
    client: 'KEY0N',
    type: 'hiphop',
    category: 'music composition',
    title: 'KEY0N Resume Music Video',
    videoFiles: ['2._Music_Video_Music_Editing_kgnzme']
  },
  'LG Dual Sense - Sound Design': {
    folderName: 'LG Dual Sense - Sound Design',
    client: 'LG',
    type: 'commercial',
    category: 'sound design',
    title: 'LG Dual Sense',
    videoFiles: [
      '240418_5_IRAQ_Couple_30s_d0vyzx',
      '240418_2_SAUDI_2_Blanket_23s_bewqho', 
      '240418_4_SAUDI_Family_23s_p9d9tg',
      '240418_1_SAUDI_1_18s_rulexw',
      '240418_3_NIGERIA_18s_pkakxu'
    ]
  },
  'Nolte Kuchen - Music composition + Sound design - commercial': {
    folderName: 'Nolte Kuchen - Music composition + Sound design - commercial',
    client: 'Nolte Küchen',
    type: 'commercial',
    category: 'music composition + sound design',
    title: 'Nolte Küchen Campaign',
    videoFiles: ['Lid20_Montage-Nolte_kuchen_wlgm69']
  },
  'Oral B - overnight toothpaste - music composition': {
    folderName: 'Oral B - overnight toothpaste - music composition',
    client: 'Oral-B',
    type: 'commercial',
    category: 'music composition',
    title: 'Oral-B Overnight Toothpaste',
    videoFiles: ['WAid_02_Oral-B_Overnight_250313_op2_mzrjfi']
  }
};

export interface Video {
  id: string;
  videoFile?: string;
  videoUrl: string;
  thumbnail?: string;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  type: string;
  category: string;
  videos: Video[];
  description: string;
}

// Generate videos from Cloudinary folders
export const generateProjectVideos = (folderKey: string): Video[] => {
  const project = projectFolders[folderKey as keyof typeof projectFolders];
  if (!project || !project.videoFiles) return [];

  // Generate videos for each file in the folder
  return project.videoFiles.map((videoFileName, index) => {
    const videoId = `${folderKey.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}-${index}`;
    
    // Try both with folder path and without (just the video ID)
    // Cloudinary might store videos with just their public ID
    const fullVideoPath = `${folderKey}/${videoFileName}`;
    const justVideoId = videoFileName;
    
    // Add .mp4 extension for video files
    const videoWithExtension = `${justVideoId}.mp4`;
    
    // Try just the video ID first (more common in Cloudinary)
    // Standard transformations for all videos
    const videoTransformations = "f_mp4,vc_auto,q_auto";
    
    const videoUrl = getCloudinaryUrl(justVideoId, {
      type: "video",
      transformations: videoTransformations,
    });
    
    const thumbnailUrl = getCloudinaryUrl(justVideoId, {
      type: "video",
      transformations: "f_auto,q_auto,so_0,w_800,c_fill",
    });
    
    // Debug log to help troubleshoot
    if (typeof window !== 'undefined') {
      console.log('Trying video ID:', justVideoId);
      console.log('Video URL:', videoUrl);
    }
    
    return {
      id: videoId,
      videoFile: videoUrl,
      videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`, // Fallback
      thumbnail: thumbnailUrl,
    };
  });
};

// Brand descriptions based on research
export const brandDescriptions = {
  'Clorox': 'Leading global manufacturer of cleaning and disinfecting products, committed to health, wellness, and environmental responsibility.',
  'Evvoli': 'Premium home appliance brand offering innovative kitchen and laundry solutions with cutting-edge technology.',
  'LG': 'Global technology leader in consumer electronics, mobile communications, and home appliances.',
  'Nolte Küchen': 'German luxury kitchen manufacturer known for premium design, quality craftsmanship, and innovative solutions.',
  'Oral-B': 'World\'s leading oral care brand, trusted by dentists worldwide for advanced toothbrush and dental care technology.',
  'KEY0N': 'Music producer and composer specializing in commercial soundtracks, hip-hop beats, and sound design.',
  'Independent Artist': 'Collaborative work with emerging and established artists across various music genres.'
};