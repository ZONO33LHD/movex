'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: '動画', href: '/videos' },
    { name: '管理', href: '/admin' },
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ロゴとアプリ名 */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
                MOVEX
              </Link>
            </div>
            
            {/* タブナビゲーション */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-indigo-500 text-gray-900 dark:text-white dark:border-indigo-400'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* 右側のユーザーアイコン */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                aria-label="ユーザーメニュー"
              >
                <Avatar>
                  <AvatarImage src="/images/avatar.png" alt="ユーザーアイコン" />
                  <AvatarFallback>UR</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* モバイル用ナビゲーション */}
      <div className="sm:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between px-2 py-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex-1 text-center py-2 px-3 text-sm font-medium ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
} 