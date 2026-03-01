import { useEffect, useState } from 'react';
import { Search, PlusCircle, CheckCircle, Activity, Heart, Zap, Play } from 'lucide-react';
import api from '../../lib/axios';

const DIFFICULTY_COLORS = {
    beginner: 'bg-success-50 text-success-700',
    intermediate: 'bg-warning-50 text-warning-700',
    advanced: 'bg-danger-50 text-danger-700',
};

const CATEGORY_ICONS = {
    cardio: <Heart className="h-4 w-4" />,
    strength: <Zap className="h-4 w-4" />,
    flexibility: <Activity className="h-4 w-4" />,
    hiit: <Play className="h-4 w-4" />,
};

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [todayLog, setTodayLog] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                const logRes = await api.get('/daily-logs/active');
                setTodayLog(logRes.data.daily_log);
            } catch (e) { }
        };
        init();
    }, []);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                const res = await api.get(`/workouts?${params.toString()}`);
                setWorkouts(res.data.data);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, [category]);

    const filteredWorkouts = workouts.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

    const handleAttach = async (workoutId, standardDuration) => {
        if (!todayLog) return;
        try {
            await api.post(`/daily-logs/${todayLog.id}/workouts`, {
                workout_id: workoutId,
                duration_minutes: standardDuration
            });
            const logRes = await api.get('/daily-logs/active');
            setTodayLog(logRes.data.daily_log);
        } catch (e) { }
    };

    const isAttached = (workoutId) => {
        return todayLog?.workouts?.some(w => w.id === workoutId);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Workout Library</h1>
                    <p className="text-sm text-gray-500">Fuel your daily burn.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text" placeholder="Search workouts..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-primary-500 focus:border-primary-500"
                            value={search} onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 capitalize"
                        value={category} onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                        <option value="hiit">HIIT</option>
                        <option value="flexibility">Flexibility</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-2 border-danger-500 border-t-transparent rounded-full"></div></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map(workout => (
                        <div key={workout.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-danger-200 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{workout.name}</h3>
                                    <div className="flex space-x-2">
                                        <span className="flex items-center text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded capitalize">
                                            {CATEGORY_ICONS[workout.category] && <span className="mr-1">{CATEGORY_ICONS[workout.category]}</span>}
                                            {workout.category}
                                        </span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded capitalize ${DIFFICULTY_COLORS[workout.difficulty]}`}>
                                            {workout.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-6 flex-1">
                                {workout.description}
                            </div>

                            <div className="bg-danger-50 rounded-xl p-4 mb-4 flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-semibold text-danger-700 uppercase tracking-wide">Est. Burn</div>
                                    <div className="font-bold text-danger-900 text-lg">~{Math.round(((workout.estimated_calories_per_hour || (workout.calories_burned / workout.duration_minutes) * 60) / 60) * (workout.standard_duration_minutes || workout.duration_minutes))} kcal</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-semibold text-danger-700 uppercase tracking-wide">Duration</div>
                                    <div className="font-bold text-danger-900 text-lg">{workout.standard_duration_minutes} min</div>
                                </div>
                            </div>

                            {todayLog?.is_completed ? (
                                <div className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 font-medium flex items-center justify-center cursor-not-allowed">
                                    <CheckCircle className="h-5 w-5 mr-2" /> Day Completed
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAttach(workout.id, workout.standard_duration_minutes)}
                                    className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center transition-colors ${isAttached(workout.id)
                                        ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                                        : 'bg-danger-100 text-danger-700 hover:bg-danger-600 hover:text-white'
                                        }`}
                                    disabled={isAttached(workout.id)}
                                >
                                    {isAttached(workout.id) ? (
                                        <><CheckCircle className="h-5 w-5 mr-2" /> Logged Today</>
                                    ) : (
                                        <><Play className="h-5 w-5 mr-2" /> Start Workout</>
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
