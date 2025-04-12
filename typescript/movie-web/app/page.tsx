import { VideoList } from "@/components/features/videos/VideoList";

export default function Home() {
  // モックデータ
  const mockVideos = [
    { id: '1', title: 'サンプル動画 1', thumbnail: 'https://via.placeholder.com/640x360?text=Video+1' },
    { id: '2', title: 'サンプル動画 2', thumbnail: 'https://via.placeholder.com/640x360?text=Video+2' },
    { id: '3', title: 'サンプル動画 3', thumbnail: 'https://via.placeholder.com/640x360?text=Video+3' },
    { id: '4', title: 'サンプル動画 4', thumbnail: 'https://via.placeholder.com/640x360?text=Video+4' },
    { id: '5', title: 'サンプル動画 5', thumbnail: 'https://via.placeholder.com/640x360?text=Video+5' },
    { id: '6', title: 'サンプル動画 6', thumbnail: 'https://via.placeholder.com/640x360?text=Video+6' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">MOVEX へようこそ</h1>
          <p className="mt-1 text-sm text-gray-500">
            最新の動画コンテンツをお楽しみください
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">おすすめ動画</h2>
          <VideoList videos={mockVideos.slice(0, 3)} />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">新着動画</h2>
          <VideoList videos={mockVideos.slice(3)} />
        </section>
      </div>
    </div>
  );
} 