import { FiMenu } from "react-icons/fi";

const ResellerHeader = ({ reseller, setSidebarOpen }) => (
  <header className="bg-white/80 backdrop-blur border-b px-6 py-5 flex justify-between items-center sticky top-0 z-30">
    <div className="flex items-center gap-4">
      <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center font-extrabold">
        {String(reseller?.name || "R").slice(0, 1).toUpperCase()}
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Welcome back, {reseller?.name}</h1>
        <p className="text-sm text-gray-500">Creator ID: {reseller?.resellerID}</p>
      </div>
    </div>
    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl text-gray-700">
      <FiMenu />
    </button>
  </header>
);

export default ResellerHeader;