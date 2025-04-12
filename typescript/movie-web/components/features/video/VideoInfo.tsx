"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoInfoProps {
  videoId: string;
}

export function VideoInfo({ videoId }: VideoInfoProps) {
  // この部分は実際のデータフェッチに置き換えてください
  const mockData = {
    title: "サンプル動画タイトル",
    views: "100K",
    uploadDate: "2024-02-24",
    channel: {
      name: "サンプルチャンネル",
      subscribers: "1M",
      avatarUrl: "/avatar.png",
    },
  };

  return (
    <div className="space-y-4">
      {/* タイトルと視聴情報 */}
      <div>
        <h1 className="text-2xl font-bold leading-tight">{mockData.title}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{mockData.views} 回視聴</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span>{mockData.uploadDate}</span>
        </div>
      </div>

      {/* チャンネル情報 */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={mockData.channel.avatarUrl}
              alt={mockData.channel.name}
            />
            <AvatarFallback>{mockData.channel.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold hover:text-blue-500 cursor-pointer transition-colors">
              {mockData.channel.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mockData.channel.subscribers} 登録者
            </p>
          </div>
        </div>

        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          チャンネル登録
        </Button>
      </div>
    </div>
  );
}
