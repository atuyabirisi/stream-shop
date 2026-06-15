import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import TopNavbar from "../../components/admin/TopNavbar";
import { useState } from "react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN COLUMN */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* TOP NAVBAR */}
        <div className="h-[70px] flex-shrink-0 sticky top-0 z-50">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            overflow-y-auto
            min-h-0

            bg-gradient-to-b
            from-gray-50
            to-white

            px-4
            sm:px-6
            lg:px-10

            py-4
            sm:py-6
            lg:py-8
          "
        >
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
