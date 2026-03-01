import { useEffect, useState } from 'react';
import { Search, PlusCircle, CheckCircle } from 'lucide-react';
import api from '../../lib/axios';

export default function MealsPage() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [todayLog, setTodayLog] = useState(null);

    useEffect(() => {
        // Fetch user's active daily log for attaching
        const init = async () => {
            try {
                const logRes = await api.get('/daily-logs/active');
                setTodayLog(logRes.data.daily_log);
            } catch (e) { }
        };
        init();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                const res = await api.get(`/meals?${params.toString()}`);
                setMeals(res.data.data);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        };
        fetchMeals();
    }, [category]);

    const filteredMeals = meals.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    const handleAttach = async (mealId) => {
        if (!todayLog) return;
        try {
            await api.post(`/daily-logs/${todayLog.id}/meals`, {
                meal_id: mealId,
                servings: 1
            });
            // Give some visual feedback - ideal would be a toast, but using state is okay for now
            // Re-fetch todayLog to update the attached state if we had a checkmark
            const logRes = await api.get('/daily-logs/active');
            setTodayLog(logRes.data.daily_log);
        } catch (e) { }
    };

    const isAttached = (mealId) => {
        return todayLog?.meals?.some(m => m.id === mealId);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Meal Catalog</h1>
                    <p className="text-sm text-gray-500">Find and log your food.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text" placeholder="Search meals..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-primary-500 focus:border-primary-500"
                            value={search} onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500"
                        value={category} onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full"></div></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMeals.map(meal => (
                        <div key={meal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-primary-200 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{meal.name}</h3>
                                    <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-1 rounded capitalize">{meal.category}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-extrabold text-2xl text-gray-900">{meal.calories}</div>
                                    <div className="text-xs text-gray-500 font-medium tracking-wide">KCAL / SERVING</div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-6 flex-1">
                                {meal.description}
                            </div>

                            <div className="flex justify-between pb-4 border-b border-gray-100 mb-4 text-sm text-gray-500">
                                <div className="text-center"><span className="font-bold text-gray-900 tracking-tight">{meal.protein_g}g</span><br />Protein</div>
                                <div className="text-center"><span className="font-bold text-gray-900 tracking-tight">{meal.carbs_g}g</span><br />Carbs</div>
                                <div className="text-center"><span className="font-bold text-gray-900 tracking-tight">{meal.fat_g}g</span><br />Fat</div>
                            </div>

                            {todayLog?.is_completed ? (
                                <div className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 font-medium flex items-center justify-center cursor-not-allowed">
                                    <CheckCircle className="h-5 w-5 mr-2" /> Day Completed
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAttach(meal.id)}
                                    className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center transition-colors ${isAttached(meal.id)
                                        ? 'bg-success-50 text-success-700 hover:bg-success-100'
                                        : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white'
                                        }`}
                                >
                                    {isAttached(meal.id) ? (
                                        <><CheckCircle className="h-5 w-5 mr-2" /> Added</>
                                    ) : (
                                        <><PlusCircle className="h-5 w-5 mr-2" /> Add to Today</>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
