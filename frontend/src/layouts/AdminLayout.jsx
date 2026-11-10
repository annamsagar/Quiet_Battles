import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AlertCircle } from 'lucide-react';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1EA] flex">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Administrative Canvas */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Assessment Notice Banner */}
        <div className="bg-[#151515] border-b border-[#333333] px-6 py-2 flex items-center justify-between text-[11px] font-mono text-[#A88B65]">
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>
              <strong>TECHNICAL ASSESSMENT MODE:</strong> Changes are saved to browser LocalStorage and immediately update public pages.
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-500">Pholus Globos Assignment</span>
        </div>

        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;

