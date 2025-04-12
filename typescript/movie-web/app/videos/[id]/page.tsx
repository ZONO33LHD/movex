"use client";

import { VideoPlayer } from "@/components/features/videos/VideoPlayer";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default function VideoPage({ params }: PageProps) {
  const mockVideoData = {
    id: params.id,
    title: "サンプル動画 " + params.id,
    description: "これはサンプル動画の説明文です。",
  };

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
              <h1 className="text-2xl font-bold">{mockVideoData.title}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{mockVideoData.description}</p>
            </div>

          </div>

          {/* 右カラム: 関連動画 */}
          <div className="xl:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-6">
              <h2 className="text-xl font-bold mb-4">関連動画</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((id) => (
                  <Link href={`/videos/${id}`} key={id} className="block">
                    <div className="flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
                      <div className="w-24 h-16 bg-gray-200 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">関連動画 {id}</h3>
                        <p className="text-sm text-gray-500">サンプル説明</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
