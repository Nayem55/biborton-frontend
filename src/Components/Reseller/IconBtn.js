const IconBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium transition border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99] ${className}`}
  >
    {children}
  </button>
);

export default IconBtn;