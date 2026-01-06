import { CloudRain, Database, Map as MapIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onRefresh?: () => void;
  loading?: boolean;
}

export function Header({ onRefresh, loading }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-[1000] shadow-sm flex-none">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <CloudRain size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Bangladesh Flood Monitoring System</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isHomePage && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CloudRain size={18} className={loading ? 'animate-pulse' : ''} />
            <span>{loading ? 'Updating...' : 'Refresh Data'}</span>
          </button>
        )}

        <button
          onClick={() => navigate('/database')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${location.pathname === '/database' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          <Database size={18} />
          <span>Database</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">
          <MapIcon size={18} />
          <span>Maps</span>
        </button>
      </div>
    </header>
  );
}