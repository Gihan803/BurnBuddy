import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import api from '../../lib/axios';

import CalorieRingCard from '../../components/dashboard/overview/CalorieRingCard';
import WaterTrackerCard from '../../components/dashboard/overview/WaterTrackerCard';
import MetabolicProfileCard from '../../components/dashboard/overview/MetabolicProfileCard';
import MealsCard from '../../components/dashboard/overview/MealsCard';
import WorkoutsCard from '../../components/dashboard/overview/WorkoutsCard';

export default function OverviewPage() {
    const [log, setLog] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchTodayLog = async () => {
        try {
            const userRes = await api.get('/user');
            setProfile(userRes.data.profile);

            const logRes = await api.get('/daily-logs/active');
            setLog(logRes.data.daily_log);
        } catch (e) {
            console.error("Overview Fetch Error:", e);
            setErrorMsg(e.response?.data?.message || e.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodayLog();
    }, []);

    const updateWater = async (increment) => {
        if (!log) return;
        const newValue = Math.max(0, (log.water_ml || 0) + increment);
        if (newValue === (log.water_ml || 0)) return;

        try {
            const res = await api.post('/daily-logs', {
                log_date: log.log_date,
                water_ml: newValue
            });
            setLog(res.data.daily_log);
        } catch (e) {
            console.error("Water Update Error:", e);
        }
    };

    const handleRemoveMeal = async (mealId) => {
        if (!log) return;
        try {
            const res = await api.delete(`/daily-logs/${log.id}/meals/${mealId}`);
            setLog(res.data.daily_log);
        } catch (e) {
            console.error("Meal Remove Error:", e);
        }
    };

    const handleRemoveWorkout = async (workoutId) => {
        if (!log) return;
        try {
            const res = await api.delete(`/daily-logs/${log.id}/workouts/${workoutId}`);
            setLog(res.data.daily_log);
        } catch (e) {
            console.error("Workout Remove Error:", e);
        }
    };

    const handleCompleteDay = async () => {
        if (!log || log.is_completed) return;
        try {
            await api.post(`/daily-logs/${log.id}/complete`);
            fetchTodayLog();
        } catch (e) {
            console.error("Complete Day Error:", e);
            alert("Failed to complete day.");
        }
    };

    if (loading) return <div className="text-center py-12">Loading overview...</div>;
    if (!log || !profile) return (
        <div className="text-center py-12 text-gray-500">
            Failed to load data.
            {errorMsg && <div className="text-danger-500 mt-2 font-mono text-sm">Error: {errorMsg}</div>}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">{new Date(log.log_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                {!log.is_completed && (
                    <button
                        onClick={handleCompleteDay}
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-800 transition-colors flex items-center"
                    >
                        <CheckCircle className="w-5 h-5 mr-2 text-success-400" />
                        Finish Day
                    </button>
                )}
            </div>

            {log.is_completed && (
                <div className="bg-success-50 border border-success-200 rounded-2xl p-6 flex items-start space-x-4">
                    <div className="bg-success-100 p-3 rounded-full hidden sm:block">
                        <CheckCircle className="w-8 h-8 text-success-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-success-900 mb-1">Day Completed! 🎉</h2>
                        <p className="text-success-700">You've successfully finalized your logs for today. Great job staying committed! Tomorrow is a fresh start.</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CalorieRingCard log={log} profile={profile} />
                <WaterTrackerCard log={log} updateWater={updateWater} />
            </div>

            <MetabolicProfileCard profile={profile} onProfileUpdated={fetchTodayLog} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MealsCard log={log} handleRemoveMeal={handleRemoveMeal} />
                <WorkoutsCard log={log} handleRemoveWorkout={handleRemoveWorkout} />
            </div>
        </div>
    );
}
