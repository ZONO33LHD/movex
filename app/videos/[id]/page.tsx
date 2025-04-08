"use client";

import { VideoPlayer } from "@/components/features/video/VideoPlayer";
import { VideoInfo } from "@/components/features/video/VideoInfo";
import { RelatedVideos } from "@/components/features/video/RelatedVideos";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* メインコンテンツ */}
      <div className="max-w-[1800px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* 左カラム: 動画プレーヤーとコンテンツ情報 */}
          <div className="xl:col-span-8">
            {/* 動画プレーヤー */}
            <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
              <VideoPlayer videoId={params.id} />
            </div>

            {/* 動画情報 */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <VideoInfo videoId={params.id} />
            </div>

          </div>

          {/* 右カラム: 関連動画 */}
          <div className="xl:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-6">
              <h2 className="text-xl font-bold mb-4">関連動画</h2>
              <RelatedVideos currentVideoId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
