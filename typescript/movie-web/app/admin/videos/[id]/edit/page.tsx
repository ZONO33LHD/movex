'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_VIDEO } from '@/lib/graphql/video-queries';
import { UPDATE_VIDEO } from '@/lib/graphql/video-mutations';
import { VideoInput } from '@/lib/types/video';
import { Button } from '@/components/ui/button';

interface EditVideoPageProps {
  params: {
    id: string;
  };
}

export default function EditVideoPage({ params }: EditVideoPageProps) {
  const router = useRouter();
  const { id } = params;
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_VIDEO, {
    variables: { id },
  });
  
  const [updateVideo, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_VIDEO);
  
  const [videoData, setVideoData] = useState<VideoInput>({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    published: false,
  });

  useEffect(() => {
    if (data?.video) {
      const { title, description, thumbnailUrl, videoUrl, duration, published } = data.video;
      setVideoData({
        title,
        description,
        thumbnailUrl,
        videoUrl,
        duration,
        published,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setVideoData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVideo({
        variables: {
          id,
          input: videoData,
        },
      });
      router.push('/admin/videos');
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  if (queryLoading) return <div className="p-6">読み込み中...</div>;
  if (queryError) return <div className="p-6 text-red-500">エラーが発生しました: {queryError.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">動画編集</h1>
          <p className="mt-1 text-sm text-gray-500">
            動画情報を編集してください
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {mutationError && (
                <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
                  エラーが発生しました: {mutationError.message}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={videoData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  説明
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={videoData.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  動画URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  id="videoUrl"
                  required
                  value={videoData.videoUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  サムネイルURL
                </label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  id="thumbnailUrl"
                  value={videoData.thumbnailUrl || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  動画時間（秒）
                </label>
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  value={videoData.duration || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="published"
                    id="published"
                    checked={videoData.published || false}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="published" className="font-medium text-gray-700 dark:text-gray-200">
                    公開する
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">チェックすると動画が公開されます</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/videos')}
                  disabled={mutationLoading}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={mutationLoading}
                >
                  {mutationLoading ? '更新中...' : '更新する'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 