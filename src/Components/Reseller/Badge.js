const Badge = ({ tone = "gray", children }) => {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${tones[tone] || tones.gray}`}
    >
      {children}
    </span>
  );
};

export default Badge;