'use client';

import { generateProjectVideos } from "../../lib/cloudinary";
import VideoCarousel from "../components/VideoCarousel";

export default function TestVideos() {
  const projects = [
    {
      title: "Always Generic Pack",
      videos: generateProjectVideos('Always Generic pack - music composition - hiphop')
    },
    {
      title: "Clorox Platinum Campaign", 
      videos: generateProjectVideos('Clorox - platinum campaign - "mhhmm..." - music composition - commercial')
    },
    {
      title: "Evvoli Sound Design",
      videos: generateProjectVideos('Evvoli - sound design')
    },
    {
      title: "KEY0N Resume Music Video",
      videos: generateProjectVideos('Key0n Resume - Music Video - music composition - hiphop trap')
    },
    {
      title: "LG Dual Sense",
      videos: generateProjectVideos('LG Dual Sense - Sound Design')
    },
    {
      title: "Nolte Küchen Campaign",
      videos: generateProjectVideos('Nolte Kuchen - Music composition + Sound design - commercial')
    },
    {
      title: "Oral-B Overnight Toothpaste",
      videos: generateProjectVideos('Oral B - overnight toothpaste - music composition')
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Video Test Grid</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.title} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <VideoCarousel
                videos={project.videos}
                autoSlide={false}
                className="max-h-96"
              />
              
              <div className="mt-4 text-xs text-muted">
                <p>Videos: {project.videos.length}</p>
                {project.videos.map((video, index) => (
                  <p key={video.id}>Video {index + 1}: {video.videoFile}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}