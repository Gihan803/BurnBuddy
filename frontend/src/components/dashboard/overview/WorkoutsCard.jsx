import { Trash2, Flame } from 'lucide-react';

export default function WorkoutsCard({ log, handleRemoveWorkout }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Workouts Logged</h3>
                <span className="text-xs font-bold text-danger-600 bg-danger-50 px-2 py-1 rounded-lg">{log.workouts?.length || 0} ITEMS</span>
            </div>
            {log.workouts?.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                    {log.workouts.map(wk => (
                        <li key={wk.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{wk.name}</p>
                                <p className="text-xs text-gray-400 capitalize font-medium">{wk.category} • {wk.pivot.duration_minutes} min</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="font-black text-danger-600 text-sm flex items-center">
                                    -{Math.floor((wk.calories_burned / wk.duration_minutes) * (wk.pivot?.duration_minutes || wk.duration_minutes))} <Flame className="w-3 h-3 ml-1" />
                                </div>
                                {!log.is_completed && (
                                    <button
                                        onClick={() => handleRemoveWorkout(wk.id)}
                                        className="p-2 text-gray-300 hover:text-danger-500 hover:bg-danger-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="px-6 py-12 text-center text-sm text-gray-400 font-medium">
                    No workouts logged yet.
                </div>
            )}
        </div>
    );
}
