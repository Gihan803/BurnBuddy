import { Trash2 } from 'lucide-react';

export default function MealsCard({ log, handleRemoveMeal }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Meals Logged</h3>
                <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">{log.meals?.length || 0} ITEMS</span>
            </div>
            {log.meals?.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                    {log.meals.map(meal => (
                        <li key={meal.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{meal.name}</p>
                                <p className="text-xs text-gray-400 capitalize font-medium">{meal.category} • {parseFloat(meal.pivot.servings)} serving(s)</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="font-black text-gray-900 text-sm">
                                    +{meal.calories * parseFloat(meal.pivot.servings)}
                                </div>
                                {!log.is_completed && (
                                    <button
                                        onClick={() => handleRemoveMeal(meal.id)}
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
                    No meals logged yet.
                </div>
            )}
        </div>
    );
}
