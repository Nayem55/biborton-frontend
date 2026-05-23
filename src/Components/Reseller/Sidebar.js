import { FiLogOut } from "react-icons/fi";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  handleLogout,
  reseller,
}) => {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b">
          <p className="text-xs font-semibold tracking-wider text-gray-500">
            Junaid Jamshed Fragrances
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
            Reseller Hub
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Grow your earnings with shareable links.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="rounded-2xl border bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="text-lg font-extrabold text-gray-900 mt-1">
              {reseller?.name}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              ID: {reseller?.resellerID}
            </p>
          </div>
          <nav className="space-y-3">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl font-semibold transition border ${
                activeTab === "dashboard"
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-50 text-gray-700 border-gray-200"
              }`}
            >
              Affiliate Links
            </button>
            <button
              onClick={() => {
                setActiveTab("orders");
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl font-semibold transition border ${
                activeTab === "orders"
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-50 text-gray-700 border-gray-200"
              }`}
            >
              Orders & Earnings
            </button>
          </nav>
          <div className="pt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 font-semibold rounded-2xl hover:bg-red-50 transition border border-red-100"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
