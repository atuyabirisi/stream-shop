type TopNavbarProps = {
  onMenuClick: () => void;
};

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <header className="h-[70px] bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* HAMBURGER */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="text-2xl">☰</span>
        </button>

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-black text-xl font-bold">Bethany Cushy Homes</h1>
          <h5 className="text-black-400">Admin Dashboard</h5>

          {/* <p className="text-sm text-gray-500 hidden md:block">
            Manage your Airbnb properties
          </p> */}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* PROFILE INFO */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-800">
            Bethany Admin
          </span>

          <span className="text-xs text-gray-500">Administrator</span>
        </div>

        {/* AVATAR */}
        <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
          BA
        </div>
      </div>
    </header>
  );
}
