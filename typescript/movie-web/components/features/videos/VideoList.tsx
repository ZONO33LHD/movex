'use client';

import React from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  thumbnail?: string;
}

interface VideoListProps {
  videos: Video[];
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Link href={`/videos/${video.id}`} key={video.id}>
          <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            {video.thumbnail ? (
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">サムネイルなし</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-lg">{video.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 