# Video Portfolio Setup Guide

## How to Add Your Videos

### 1. Video Files
Place your video files in the `public/videos/` directory with these filenames:
- `nike-summer.mp4`
- `electric-dreams.mp4`
- `urban-nights.mp4`
- `pop-anthem.mp4`
- `apple-launch.mp4`
- `festival-banger.mp4`

### 2. Thumbnail Images
Place thumbnail images in the `public/images/` directory:
- `nike-thumbnail.jpg`
- `electric-thumbnail.jpg`
- `urban-thumbnail.jpg`
- `pop-thumbnail.jpg`
- `apple-thumbnail.jpg`
- `festival-thumbnail.jpg`

### 3. Video Features Implemented
- **Auto-play on hover**: Videos automatically play when you hover over them
- **Click to open**: Clicking the play button opens the YouTube/external link
- **Thumbnail support**: Shows thumbnail image when video is not playing
- **Responsive design**: Works on all screen sizes

### 4. Customizing Videos
To update video information, edit the `projects` array in `app/page.tsx`:

```typescript
{
  id: 1,
  title: "Your Project Title",
  client: "Client Name",
  type: "commercial", // commercial, edm, hiphop, pop
  videoUrl: "https://youtube.com/watch?v=YOUR_VIDEO_ID", // External link
  videoFile: "/videos/your-video.mp4", // Local video file
  thumbnail: "/images/your-thumbnail.jpg" // Thumbnail image
}
```

### 5. Video Format Recommendations
- **Format**: MP4 (H.264 codec for best compatibility)
- **Resolution**: 1920x1080 or 1280x720
- **File size**: Keep under 10MB for smooth loading
- **Thumbnail**: 1920x1080 JPG or PNG

### 6. Optional: Using Only YouTube Links
If you prefer to use only YouTube videos without local files, simply remove the `videoFile` property from each project and keep only the `videoUrl`.