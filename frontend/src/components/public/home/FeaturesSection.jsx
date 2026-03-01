import { Target, Activity, Utensils, CheckCircle2 } from 'lucide-react';

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Everything you need to <span className="text-primary-600">succeed</span>
                    </h2>
                    <p className="text-xl text-slate-600">
                        Built securely on science-backed metabolism calculations, designed to fit effortlessly into your daily routine.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Feature 1: Smart Calorie Goals */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-xl mb-6 text-primary-600">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Calorie Goals</h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Stop guessing. We use the clinical Mifflin-St Jeor equation to instantly calculate your precise BMR and TDEE based on your unique body profile, adjusting automatically as you progress.
                            </p>
                            <ul className="space-y-3">
                                {['Dynamic Macro Adjustments', 'Weekly Re-calibration', 'Clinical Accuracy'].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <CheckCircle2 className="h-5 w-5 text-primary-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-3xl transform rotate-3 scale-105" />
                            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                                {/* Fake UI: Calorie Ring */}
                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="12" fill="none" />
                                            <circle cx="50" cy="50" r="40" className="stroke-primary-500" strokeWidth="12" fill="none" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-sm font-medium text-slate-500">Remaining</span>
                                            <span className="text-3xl font-bold text-slate-900">1,240</span>
                                            <span className="text-xs font-medium text-slate-400 mt-1">kcal</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full mt-8 px-4 text-sm font-medium">
                                        <div className="flex flex-col"><span className="text-slate-500">Carbs</span><span className="text-slate-900">140g</span></div>
                                        <div className="flex flex-col"><span className="text-slate-500">Protein</span><span className="text-slate-900">120g</span></div>
                                        <div className="flex flex-col"><span className="text-slate-500">Fat</span><span className="text-slate-900">55g</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Meal Catalog */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-emerald-50 rounded-3xl transform -rotate-3 scale-105" />
                            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4">
                                {/* Fake UI: Meal List */}
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-slate-900">Lunch Log</h4>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+ 450 kcal</span>
                                </div>
                                {[
                                    { name: "Grilled Chicken Breast", qty: "6 oz", cal: "280" },
                                    { name: "Quinoa Bowl", qty: "1 cup", cal: "220" },
                                    { name: "Steamed Broccoli", qty: "1 cup", cal: "55" }
                                ].map((food, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                                <Utensils className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 text-sm">{food.name}</p>
                                                <p className="text-xs text-slate-500">{food.qty}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">{food.cal}</span>
                                    </div>
                                ))}
                                <button className="w-full mt-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-emerald-300 hover:text-emerald-600 transition-colors text-sm">
                                    + Add Food
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
                                <Utensils className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Meal Logging</h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Access our curated database of meals. Log your breakfast, lunch, dinner, and snacks with a single tap, and let us do the heavy macro lifting.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Workout Tracking */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-xl mb-6 text-blue-600">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Intelligent Workout Tracking</h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                From high-intensity intervals to restorative yoga, log your activities securely. BurnBuddy automatically recalculates your daily net calories so you never undereat on active days.
                            </p>
                        </div>
                        <div className="order-1 md:order-2 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-3xl transform rotate-3 scale-105" />
                            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-6 overflow-hidden">
                                {/* Fake UI: Activity Chart overlay */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-slate-900 text-lg">Weekly Activity</span>
                                        <span className="text-blue-600 font-bold text-sm">1,850 kcal burned</span>
                                    </div>
                                    <div className="h-32 flex items-end justify-between gap-2">
                                        {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                                            <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group cursor-pointer hover:bg-blue-200 transition-all" style={{ height: `${h}%` }}>
                                                {/* highlight today */}
                                                {i === 4 && <div className="absolute inset-0 bg-blue-500 rounded-t-sm" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs font-semibold text-slate-400">
                                        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
