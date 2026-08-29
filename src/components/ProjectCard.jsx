"use client";

import { useState, useEffect } from "react";

export default function ProjectCard({ project, index = 0 }) {
  const { title, url, description, tags, member } = project;
  
  // URL Encode for Microlink API
  const encodedUrl = encodeURIComponent(url);
  const screenshotUrl = `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url`;
  const fallbackUrl = `https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(title)}`;
  
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Asynchronous Image Preloader
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    let attempt = 0;
    const maxAttempts = 3;

    const loadRealImage = () => {
      if (!isMounted) return;
      
      const img = new window.Image();
      
      img.onload = () => {
        if (!isMounted) return;
        setImgSrc(screenshotUrl);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        if (!isMounted) return;
        attempt++;
        if (attempt < maxAttempts) {
          // Retry after 3 seconds if it fails
          setTimeout(loadRealImage, 3000);
        } else {
          setImgSrc(fallbackUrl);
          setIsLoading(false);
        }
      };
      
      img.src = screenshotUrl;
    };

    // Stagger the initial fetch based on index to avoid overloading the screenshot service
    const initialWaitTime = index * 500;
    const timer = setTimeout(loadRealImage, initialWaitTime);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [screenshotUrl, fallbackUrl, index]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col bg-[#0F172A] border border-gray-800 rounded-lg shadow-md hover:shadow-xl hover:shadow-[#ff6a1a]/10 hover:scale-105 transition-all duration-300 overflow-hidden group"
    >
      {/* Image Container with 16:9 Aspect Ratio */}
      <div className="relative w-full aspect-video bg-gray-800">
        {/* Loading Skeleton / Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10 animate-pulse">
            <div className="w-8 h-8 border-4 border-[#ff6a1a]/30 border-t-[#ff6a1a] rounded-full animate-spin"></div>
          </div>
        )}

        {imgSrc && (
          <img
            src={imgSrc}
            alt={`Screenshot of ${title}`}
            className="object-cover object-top w-full h-full rounded-t-lg transition-opacity duration-500"
          />
        )}
        {/* Overlay that appears slightly on hover to give visual feedback */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff6a1a] transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-auto">
          {/* Tags / Badges */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Members */}
          {member && (
            <div className="text-xs text-gray-500 flex items-center mt-2">
              <span className="font-medium mr-1 text-gray-400">Team:</span>
              {Array.isArray(member) ? member.join(", ") : member}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
