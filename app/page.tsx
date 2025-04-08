import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">動画配信アプリへようこそ</h1>
      <Link
        href="/videos/1"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        サンプル動画を見る
      </Link>
    </main>
  );
} 