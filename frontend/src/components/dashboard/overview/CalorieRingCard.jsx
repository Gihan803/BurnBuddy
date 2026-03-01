import { Target, Flame } from 'lucide-react';

function UtensilsIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
}

export default function CalorieRingCard({ log, profile }) {
    const targetCal = profile.daily_calorie_target;
    const netCal = log.net_calories;
    const calPercent = Math.min(100, Math.max(0, (log.calories_consumed / targetCal) * 100));
    const calDiff = targetCal - netCal;
    const isOver = calDiff < 0;

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-1 mb-6 sm:mb-0">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Net Calories</h2>
                <p className="text-sm text-gray-500 mb-6 max-w-sm">
                    Eat up to your target! Your workouts increase your allowable calories.
                </p>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="text-xs font-medium text-gray-500 flex items-center mb-1 uppercase tracking-wider"><Target className="w-3 h-3 mr-1" /> Target</div>
                        <div className="text-xl font-bold text-gray-900">{targetCal}</div>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-500 flex items-center mb-1 text-primary-600 uppercase tracking-wider"><UtensilsIcon className="w-3 h-3 mr-1" /> Eaten</div>
                        <div className="text-xl font-bold text-gray-900">{log.calories_consumed}</div>
                    </div>
                    <div>
                        <div className="text-xs font-medium text-gray-500 flex items-center mb-1 text-danger-500 uppercase tracking-wider"><Flame className="w-3 h-3 mr-1" /> Burned</div>
                        <div className="text-xl font-bold text-gray-900">{log.calories_burned}</div>
                    </div>
                </div>
            </div>

            <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-full shadow-inner border border-gray-100 p-2">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="2.5" />
                    <path strokeDasharray={`${calPercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={isOver ? "#ef4444" : "#22c55e"} strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className={`text-2xl font-black ${isOver ? 'text-danger-600' : 'text-success-600'}`}>
                        {Math.abs(calDiff)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {isOver ? 'Over' : 'Left'}
                    </span>
                </div>
            </div>
        </div>
    );
}
