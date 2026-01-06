import { X } from 'lucide-react';
import { RegionData } from '../App';

interface RegionModalProps {
  region: RegionData;
  onClose: () => void;
}

const RISK_LABELS = {
  'low': 'Low Risk',
  'medium': 'Medium Risk',
  'high': 'High Risk',
  'very-high': 'Very High Risk',
};

const RISK_COLORS = {
  'low': 'bg-green-100 text-green-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-orange-100 text-orange-800',
  'very-high': 'bg-red-100 text-red-800',
};

export function RegionModal({ region, onClose }: RegionModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl mx-4">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900 mb-2">{region.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${RISK_COLORS[region.riskLevel]}`}>
                {RISK_LABELS[region.riskLevel]}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Current River Discharge */}
            {region.currentDischarge !== undefined && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Current River Discharge</div>
                <div className="text-gray-900">{region.currentDischarge} m³/s</div>
              </div>
            )}

            {/* Average Discharge */}
            {region.averageDischarge !== undefined && (
              <div>
                <div className="text-sm text-gray-500 mb-1">7-Day Average Discharge</div>
                <div className="text-gray-900">{region.averageDischarge} m³/s</div>
              </div>
            )}

            {/* Max Discharge */}
            {region.maxDischarge !== undefined && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Max Discharge (Today)</div>
                <div className="text-gray-900">{region.maxDischarge} m³/s</div>
              </div>
            )}

            {/* Last Major Flood */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Last Major Flood</div>
              <div className="text-gray-900">{region.lastFlood}</div>
            </div>

            {/* Population Vulnerable */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Population Vulnerable</div>
              <div className="text-gray-900">{region.population}</div>
            </div>

            {/* Data Date */}
            {region.forecastDate && (
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400">
                  Data from: {new Date(region.forecastDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}