import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">管理ページ</h1>
          <p className="mt-1 text-sm text-gray-500">
            動画や設定を管理します
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium">動画管理</h2>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-4">動画の一覧や編集、追加などの機能を提供します。</p>
              <Link 
                href="/admin/videos" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                動画管理へ
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium">ユーザー管理</h2>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p>ユーザーの一覧や編集、権限管理などの機能がここに表示されます。</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium">システム設定</h2>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p>システム全体の設定や統計情報などの機能がここに表示されます。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 