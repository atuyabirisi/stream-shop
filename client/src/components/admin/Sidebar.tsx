import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  {
    name: "Create Property",
    path: "/admin/properties/new",
    icon: "＋",
  },
  {
    name: "View Properties",
    path: "/admin/properties",
    icon: "⌂",
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: "◔",
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* OVERLAY (mobile only) */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/50 z-40 lg:hidden
          ${isOpen ? "block" : "hidden"}
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px]
          bg-[#111827]
          border-r border-white/10
          flex flex-col

          transition-transform duration-300

          /* MOBILE: controlled by state */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP: ALWAYS visible */
          lg:translate-x-0
          lg:static
        `}
      >
        {/* HEADER */}
        <div className="h-[70px] border-b border-white/10 flex items-center justify-between px-6">
          <div>
            <h1 className="text-white text-xl font-bold">Dashboard Menu</h1>
          </div>

          {/* CLOSE BUTTON (mobile only) */}
          <button onClick={onClose} className="lg:hidden text-white text-2xl">
            ×
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose} // closes ONLY on mobile
              className={({ isActive }) =>
                `
                flex items-center gap-4 px-4 py-3 rounded-xl
                transition

                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `
              }
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              BA
            </div>

            <div>
              <p className="text-white text-sm font-semibold">Bethany Admin</p>
              <p className="text-gray-400 text-xs">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
