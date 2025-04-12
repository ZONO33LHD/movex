export default function VideosPage() {
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
          <h1 className="text-3xl font-bold">動画一覧</h1>
          <p className="mt-1 text-sm text-gray-500">
            すべての動画コンテンツをご覧いただけます
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockVideos.map((video) => (
            <div key={video.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <a href={`/videos/${video.id}`}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{video.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 