import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { Header } from '../components/Header';

export function Database() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Default coordinates (can be made dynamic)
    // Updated coordinates from user screenshot
    const lat = 23.73;
    const lon = 90.43;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching ~3 months of data to match the visual style requested
                const response = await fetch(
                    `https://flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}&daily=river_discharge&past_days=92&forecast_days=16`
                );
                const result = await response.json();

                if (result.daily && result.daily.time) {
                    const formattedData = result.daily.time.map((date: string, index: number) => ({
                        date: date,
                        discharge: result.daily.river_discharge[index],
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching flood data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lat, lon]);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />

            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">River Discharge Database</h1>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Graph Section */}
                        <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800 h-[600px]">
                            <h2 className="text-xl font-semibold mb-4 text-white">River Discharge Forecast</h2>
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-gray-400">Loading data...</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="90%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#94a3b8"
                                            tickFormatter={(str) => {
                                                const date = new Date(str);
                                                return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                                            }}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            label={{ value: 'm³/s', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#f8fafc' }}
                                            labelFormatter={(str) => new Date(str).toLocaleDateString()}
                                        />
                                        <RechartsLegend />
                                        <Line
                                            type="monotone"
                                            dataKey="discharge"
                                            stroke="#38bdf8"
                                            strokeWidth={2}
                                            dot={true}
                                            activeDot={{ r: 6, fill: '#38bdf8' }}
                                            name="River Discharge (m³/s)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
