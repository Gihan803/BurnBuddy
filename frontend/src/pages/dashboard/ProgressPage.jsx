import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import api from '../../lib/axios';

export default function ProgressPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/daily-logs');
                // The API returns paginated data (latest first). We want older first for charts.
                const reversedData = [...res.data.data].reverse();
                setLogs(reversedData);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return <div className="text-center py-12">Loading analytics...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Progress Analytics</h1>
                <p className="text-sm text-gray-500">Track your consistency and changes over time.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Caloric Trend */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-96">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Net Calorie Trend</h2>
                    <div className="flex-1 w-full relative min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={logs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="log_date" tickFormatter={(v) => v.slice(5)} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    labelFormatter={(v) => `Date: ${v}`}
                                />
                                <Area type="monotone" dataKey="net_calories" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" name="Net KCAL" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Consumed vs Burned (Bar) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-96">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Intake vs. Burn</h2>
                    <div className="flex-1 w-full relative min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={logs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="log_date" tickFormatter={(v) => v.slice(5)} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                <Legend iconType="circle" />
                                <Bar dataKey="calories_consumed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Consumed" stackId="a" />
                                <Bar dataKey="calories_burned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Burned" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
