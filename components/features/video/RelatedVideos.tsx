"use client";

import Link from "next/link";

interface RelatedVideosProps {
  currentVideoId: string;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: string;
  uploadDate: string;
}

export function RelatedVideos({ currentVideoId }: RelatedVideosProps) {
  // この部分は実際のデータフェッチに置き換えてください
  const mockVideos: VideoItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: `video-${i + 1}`,
    title: `関連動画タイトル ${i + 1}`,
    thumbnail: `/thumbnails/video-${i + 1}.jpg`,
    channelName: `チャンネル ${i + 1}`,
    views: `${Math.floor(Math.random() * 100)}K`,
    uploadDate: "1週間前",
  }));

  return (
    <div className="space-y-6">
      {mockVideos.map((video) => (
        <Link
          key={video.id}
          href={`/videos/${video.id}`}
          className="group block"
        >
          <div className="flex gap-4">
            {/* サムネイル */}
            <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* 動画情報 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-500 transition-colors">
                {video.title}
              </h3>

              <div className="mt-1.5 space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {video.channelName}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span>{video.views} 回視聴</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
