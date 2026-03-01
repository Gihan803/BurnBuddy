import { Calendar } from 'lucide-react';

export default function HistorySidebar({ logs, selectedLog, setSelectedLog }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1 h-fit max-h-[600px] overflow-y-auto">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                <h3 className="font-bold text-gray-900 flex items-center"><Calendar className="w-4 h-4 mr-2" /> Past Logs</h3>
            </div>
            <ul className="divide-y divide-gray-50">
                {logs.map(log => (
                    <li key={log.id}>
                        <button
                            onClick={() => setSelectedLog(log)}
                            className={`w-full text-left px-5 py-4 transition-colors hover:bg-gray-50 ${selectedLog?.id === log.id ? 'bg-primary-50 border-l-4 border-primary-500' : 'border-l-4 border-transparent'}`}
                        >
                            <div className="font-semibold text-gray-900">
                                {new Date(log.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex justify-between">
                                <span>Net: {log.net_calories} kcal</span>
                                {log.is_completed ? (
                                    <span className="text-success-600 font-medium">Completed</span>
                                ) : (
                                    <span className="text-warning-600">Open</span>
                                )}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
