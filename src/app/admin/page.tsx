'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDashboard from '@/components/admin/AdminDashboard';
import MainNavigation from '@/components/MainNavigation';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavigation />
      
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <AdminDashboard />
          </main>
        </div>
      </div>
    </div>
  );
} 