import { useState } from 'react';
import { Activity, Target, Scale, Info, RefreshCw, X } from 'lucide-react';
import api from '../../../lib/axios';

export default function MetabolicProfileCard({ profile, onProfileUpdated }) {
    const [showRecalculate, setShowRecalculate] = useState(false);
    const [showBmrInfo, setShowBmrInfo] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [editWeight, setEditWeight] = useState(profile.weight_kg);
    const [editActivity, setEditActivity] = useState(profile.activity_level);

    const activityLabels = {
        'sedentary': 'Sedentary',
        'lightly_active': 'Lightly Active',
        'moderately_active': 'Moderately Active',
        'very_active': 'Very Active',
        'extra_active': 'Extra Active'
    };

    const handleRecalculate = async (e) => {
        e.preventDefault();
        try {
            setIsUpdatingProfile(true);
            await api.put('/profile', {
                age: profile.age,
                gender: profile.gender,
                height_cm: profile.height_cm,
                weight_kg: editWeight,
                activity_level: editActivity,
                goal_weight_kg: profile.goal_weight_kg
            });
            setShowRecalculate(false);
            onProfileUpdated(); // Refresh parent state
        } catch (e) {
            console.error("Profile Update Error:", e);
            alert("Failed to update profile. Please check your inputs.");
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -mr-20 -mt-20"></div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <Activity className="w-6 h-6 text-primary-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Your Metabolic Profile</h2>
                            <p className="text-gray-400 text-sm">Calculated based on your body metrics and activity.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">BMR</p>
                            <div className="text-2xl font-black">{Math.round(profile.bmr)} <span className="text-sm font-normal text-gray-400">kcal</span></div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">TDEE</p>
                            <div className="text-2xl font-black">{Math.round(profile.tdee)} <span className="text-sm font-normal text-gray-400">kcal</span></div>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Weight</p>
                            <div className="text-2xl font-black flex items-center">
                                {profile.weight_kg} <span className="text-sm font-normal text-gray-400 ml-1">kg</span>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Activity</p>
                            <div className="text-sm font-bold bg-white/10 px-2 py-1 rounded-lg inline-block">{activityLabels[profile.activity_level]}</div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setShowBmrInfo(!showBmrInfo)}
                        className="flex-1 md:flex-none flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all font-bold text-sm"
                    >
                        <Info className="w-4 h-4 mr-2" />
                        {showBmrInfo ? 'Hide Details' : 'How it works'}
                    </button>
                    <button
                        onClick={() => setShowRecalculate(true)}
                        className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl transition-all font-bold text-sm shadow-lg shadow-primary-900/20"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Recalculate
                    </button>
                </div>
            </div>

            {/* Explanation Details */}
            {showBmrInfo && (
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="space-y-2">
                        <h4 className="font-bold text-primary-400 flex items-center"><Scale className="w-4 h-4 mr-2" /> Basal Metabolic Rate (BMR)</h4>
                        <p className="text-gray-400 leading-relaxed">
                            This is the number of calories your body burns just to stay alive at rest. We use the <strong>Mifflin-St Jeor</strong> formula, the most accurate standard in nutrition science.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-success-400 flex items-center"><Activity className="w-4 h-4 mr-2" /> Total Daily Expenditure (TDEE)</h4>
                        <p className="text-gray-400 leading-relaxed">
                            Your TDEE is your BMR multiplied by your physical activity level. It represents the total calories you burn in a typical day including normal movement.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-orange-400 flex items-center"><Target className="w-4 h-4 mr-2" /> Your Daily Target</h4>
                        <p className="text-gray-400 leading-relaxed">
                            We subtract <strong>500 kcal</strong> from your TDEE to create a safe, sustainable deficit for weight loss, ensuring you lose body fat while maintaining muscle.
                        </p>
                    </div>
                </div>
            )}

            {/* Recalculate Modal */}
            {showRecalculate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white text-gray-900">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Update Metrics</h3>
                                <p className="text-sm text-gray-500 font-normal">Recalculate your BMR and TDEE.</p>
                            </div>
                            <button
                                onClick={() => setShowRecalculate(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleRecalculate} className="p-6 space-y-6 text-gray-900 bg-white">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Weight (kg)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        required
                                        value={editWeight}
                                        onChange={(e) => setEditWeight(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none font-bold"
                                        placeholder="e.g. 75.5"
                                    />
                                    <Scale className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Activity Level</label>
                                <select
                                    value={editActivity}
                                    onChange={(e) => setEditActivity(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none font-bold appearance-none bg-[right_1rem_center] bg-no-repeat"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.25rem' }}
                                >
                                    <option value="sedentary">Sedentary (Office job)</option>
                                    <option value="lightly_active">Lightly Active (1-2 days/week)</option>
                                    <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                                    <option value="very_active">Very Active (6-7 days/week)</option>
                                    <option value="extra_active">Extra Active (Athlete/Physical Job)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdatingProfile}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center hover:bg-gray-800 transition-all disabled:opacity-50 shadow-lg shadow-gray-200"
                            >
                                {isUpdatingProfile ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Saving...
                                    </div>
                                ) : 'Save & Recalculate'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
