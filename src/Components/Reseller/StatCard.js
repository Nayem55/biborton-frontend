const StatCard = ({ title, value, icon: Icon, tone = "indigo" }) => {
  const tones = {
    indigo: "from-indigo-50 to-purple-100 text-indigo-700",
    green: "from-green-50 to-emerald-100 text-green-700",
    orange: "from-orange-50 to-amber-100 text-orange-700",
    blue: "from-blue-50 to-sky-100 text-sky-700",
  };

  return (
    <div className={`rounded-2xl p-6 shadow-sm border bg-gradient-to-br ${tones[tone]}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{title}</p>
        {Icon && <Icon className="opacity-70" size={18} />}
      </div>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;