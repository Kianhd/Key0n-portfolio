# Cloudinary Video Portfolio Setup Guide

## Quick Setup

1. **Update your Cloudinary cloud name** in `app/page.tsx`:
   ```typescript
   const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME";
   ```

2. **Upload your videos to Cloudinary** with these public IDs:
   - `nike-summer`
   - `electric-dreams`
   - `urban-nights`
   - `pop-anthem`
   - `apple-launch`
   - `festival-banger`

## How to Upload Videos to Cloudinary

### Option 1: Using Cloudinary Dashboard
1. Go to [console.cloudinary.com](https://console.cloudinary.com)
2. Navigate to Media Library
3. Click "Upload" and select your video files
4. After upload, rename the public ID to match the names above

### Option 2: Using Cloudinary CLI
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure with your credentials
cld config:set cloud_name=YOUR_CLOUD_NAME api_key=YOUR_API_KEY api_secret=YOUR_API_SECRET

# Upload videos
cld upload video nike-summer.mp4 public_id=nike-summer
cld upload video electric-dreams.mp4 public_id=electric-dreams
# ... repeat for other videos
```

### Option 3: Direct URL Upload
If your videos are already hosted elsewhere, you can upload via URL:
```javascript
// Example: Update in app/page.tsx
videoFile: getCloudinaryUrl('https://example.com/your-video.mp4', {
  type: 'video',
  transformations: 'f_auto,q_auto,vc_auto'
})
```

## Cloudinary Transformations Applied

The code automatically applies these optimizations:

### For Videos:
- `f_auto`: Auto format (serves WebM, MP4, etc. based on browser)
- `q_auto`: Auto quality (balances file size and quality)
- `vc_auto`: Auto video codec (H.264, VP9, etc.)

### For Thumbnails:
- `so_0`: Start offset at 0 seconds (first frame)
- `w_800`: Width 800px for thumbnails
- `c_fill`: Crop mode to fill the container

## Customizing Video Settings

### Different thumbnail frame:
```javascript
thumbnail: getCloudinaryUrl('nike-summer', {
  type: 'video',
  transformations: 'f_auto,q_auto,so_2.5,w_800,c_fill' // Thumbnail at 2.5 seconds
})
```

### Optimize for mobile:
```javascript
videoFile: getCloudinaryUrl('nike-summer', {
  type: 'video',
  transformations: 'f_auto,q_auto,vc_auto,w_720,br_500k' // 720p, 500kbps bitrate
})
```

### Add watermark:
```javascript
videoFile: getCloudinaryUrl('nike-summer', {
  type: 'video',
  transformations: 'f_auto,q_auto,l_text:Arial_40:©YourName,co_white,g_south_east,x_10,y_10'
})
```

## Using Different Video Sources

### If you want to use custom Cloudinary URLs:
Replace the videoFile URL directly:
```javascript
videoFile: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/folder/video-name.mp4"
```

### If you want to use external videos (YouTube, Vimeo):
Just update the `videoUrl` field and set `videoFile` to null:
```javascript
{
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  videoFile: null,
  thumbnail: "YOUR_THUMBNAIL_URL"
}
```

## Performance Tips

1. **Use adaptive streaming** for large videos:
   ```javascript
   transformations: 'f_auto,q_auto,vc_auto,sp_auto'
   ```

2. **Lazy load videos** that are below the fold
3. **Consider using Cloudinary's adaptive bitrate streaming** for longer videos
4. **Use responsive breakpoints** for different screen sizes

## Troubleshooting

- **Videos not playing**: Check browser console for CORS errors
- **Slow loading**: Reduce quality with `q_70` or lower bitrate
- **Thumbnail not showing**: Ensure video has been processed by Cloudinary
- **404 errors**: Verify cloud name and public ID are correct