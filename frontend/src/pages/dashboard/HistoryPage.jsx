import { useEffect, useState } from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

import HistorySidebar from '../../components/dashboard/history/HistorySidebar';
import HistoryDetails from '../../components/dashboard/history/HistoryDetails';

export default function HistoryPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLog, setSelectedLog] = useState(null);
    const [isClearing, setIsClearing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClearHistory = async () => {
        try {
            setIsClearing(true);
            await api.delete('/daily-logs');
            setLogs([]);
            setSelectedLog(null);
            setShowConfirm(false);
        } catch (e) {
            console.error("Failed to clear history", e);
            alert("Failed to clear history. Please try again.");
        } finally {
            setIsClearing(false);
        }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                // Fetch paginated history (we'll just grab the first page for now)
                const res = await api.get('/daily-logs');
                const fetchedLogs = res.data.data;
                setLogs(fetchedLogs);
                if (fetchedLogs.length > 0) {
                    setSelectedLog(fetchedLogs[0]);
                }
            } catch (e) {
                console.error("History fetch error", e);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="text-center py-12">Loading history...</div>;

    if (logs.length === 0) {
        return (
            <div className="text-center py-20">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900">No History Yet</h2>
                <p className="text-gray-500 mt-2">Your past daily logs will appear here once you start tracking.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your History</h1>
                        <p className="text-sm text-gray-500 mt-1">Review your past performance and consistency.</p>
                    </div>
                    {logs.length > 0 && (
                        <div>
                            {showConfirm ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-danger-600 font-medium mr-2">Delete all logs?</span>
                                    <button
                                        onClick={handleClearHistory}
                                        disabled={isClearing}
                                        className="px-3 py-1.5 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors text-sm disabled:opacity-50"
                                    >
                                        {isClearing ? 'Clearing...' : 'Yes, delete'}
                                    </button>
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        disabled={isClearing}
                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="flex items-center px-4 py-2 bg-white border border-danger-200 text-danger-600 rounded-lg hover:bg-danger-50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear History
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <HistorySidebar logs={logs} selectedLog={selectedLog} setSelectedLog={setSelectedLog} />
                    <HistoryDetails selectedLog={selectedLog} />
                </div>
            </div>
        </div>
    );
}
