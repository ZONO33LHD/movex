'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_VIDEO } from '@/lib/graphql/video-mutations';
import { VideoInput } from '@/lib/types/video';
import { Button } from '@/components/ui/button';

export default function NewVideoPage() {
  const router = useRouter();
  const [createVideo, { loading, error }] = useMutation(CREATE_VIDEO);
  const [videoData, setVideoData] = useState<VideoInput>({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    published: false,
  });

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
      await createVideo({
        variables: {
          input: videoData,
        },
      });
      router.push('/admin/videos');
    } catch (err) {
      console.error('Error creating video:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">新規動画登録</h1>
          <p className="mt-1 text-sm text-gray-500">
            動画情報を入力して登録してください
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
                  エラーが発生しました: {error.message}
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
                  disabled={loading}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={loading}
                >
                  {loading ? '登録中...' : '登録する'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 