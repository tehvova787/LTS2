'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface AdminSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Content', href: '/admin/content', icon: '📝' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
    { name: 'Back to Site', href: '/', icon: '🏠' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-full ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-blue-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
} 