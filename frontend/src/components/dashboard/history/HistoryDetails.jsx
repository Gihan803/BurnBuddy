import { Flame, Droplets } from 'lucide-react';

export default function HistoryDetails({ selectedLog }) {
    if (!selectedLog) return null;

    return (
        <div className="lg:col-span-3 space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hidden md:block">
                    <div className="text-sm font-semibold text-gray-500 mb-1 flex items-center"><UtensilsIcon className="w-4 h-4 mr-2" /> Consumed</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedLog.calories_consumed} <span className="text-sm text-gray-500 font-normal">kcal</span></div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hidden md:block">
                    <div className="text-sm font-semibold text-gray-500 mb-1 flex items-center"><Flame className="w-4 h-4 mr-2 text-danger-500" /> Burned</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedLog.calories_burned} <span className="text-sm text-gray-500 font-normal">kcal</span></div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hidden md:block">
                    <div className="text-sm font-semibold text-gray-500 mb-1 flex items-center"><Droplets className="w-4 h-4 mr-2 text-blue-500" /> Water</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedLog.water_ml} <span className="text-sm text-gray-500 font-normal">ml</span></div>
                </div>
            </div>

            {/* Detailed Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Meals */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between">
                        <h3 className="font-bold text-gray-900">Meals</h3>
                        <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{selectedLog.meals?.length || 0}</span>
                    </div>
                    {selectedLog.meals?.length > 0 ? (
                        <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                            {selectedLog.meals.map(meal => (
                                <li key={meal.id} className="px-6 py-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{meal.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{meal.category} • {parseFloat(meal.pivot.servings)} serving(s)</p>
                                    </div>
                                    <div className="font-bold text-gray-900 text-sm">
                                        +{meal.calories * parseFloat(meal.pivot.servings)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-6 text-center text-sm text-gray-500">No meals logged.</div>
                    )}
                </div>

                {/* Workouts */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between">
                        <h3 className="font-bold text-gray-900">Workouts</h3>
                        <span className="text-sm font-semibold text-danger-600 bg-danger-50 px-2 py-0.5 rounded-full">{selectedLog.workouts?.length || 0}</span>
                    </div>
                    {selectedLog.workouts?.length > 0 ? (
                        <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                            {selectedLog.workouts.map(wk => (
                                <li key={wk.id} className="px-6 py-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{wk.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{wk.category} • {wk.pivot.duration_minutes} min</p>
                                    </div>
                                    <div className="font-bold text-danger-600 text-sm flex items-center">
                                        -{Math.floor((wk.calories_burned / wk.duration_minutes) * (wk.pivot?.duration_minutes || wk.duration_minutes))} <Flame className="w-3 h-3 ml-1" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-6 text-center text-sm text-gray-500">No workouts logged.</div>
                    )}
                </div>

            </div>
        </div>
    );
}

// Simple internal icon to avoid extra lucide imports
function UtensilsIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>;
}
