export function Legend() {
  const items = [
    { label: 'Low Risk', color: '#10B981', border: '#059669' },
    { label: 'Medium Risk', color: '#F59E0B', border: '#D97706' },
    { label: 'High Risk', color: '#EF4444', border: '#DC2626' },
    { label: 'Very High Risk', color: '#B91C1C', border: '#991B1B' },
  ];

  return (
    <div className="absolute bottom-8 right-8 bg-white p-6 rounded-lg shadow-xl border border-gray-200 z-[1000] min-w-[200px]">
      <h3 className="text-gray-900 font-semibold mb-3">Flood Risk Level</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{ backgroundColor: item.color, borderColor: item.border }}
            />
            <span className="text-gray-700 text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
        Data from Open-Meteo Flood API
      </div>
    </div>
  );
}