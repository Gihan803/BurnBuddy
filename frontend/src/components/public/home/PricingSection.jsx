import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
                    <p className="text-gray-400">Start for free, upgrade when you need more power.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                        <h3 className="text-2xl font-semibold mb-2">Basic Plan</h3>
                        <div className="flex items-baseline mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$0</span>
                            <span className="text-gray-400 ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['BMR & TDEE Calculations', 'Basic Meal Logging', 'Standard Workout Tracking', 'Daily Overview Ring'].map(el => (
                                <li key={el} className="flex items-center text-gray-300">
                                    <CheckCircle2 className="h-5 w-5 text-primary-400 mr-3 shrink-0" />
                                    {el}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register" className="block w-full py-3 px-6 text-center rounded-xl font-medium bg-gray-700 hover:bg-gray-600 transition-colors">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-gradient-to-b from-primary-600 to-primary-900 p-8 rounded-3xl border border-primary-500 relative shadow-2xl shadow-primary-900/50 transform md:-translate-y-4">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-50"></div>
                        <div className="absolute top-0 right-6 transform -translate-y-1/2">
                            <span className="bg-gradient-to-r from-warning-400 to-warning-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-warning-500/30">
                                Most Popular
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
                        <div className="flex items-baseline mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$9</span>
                            <span className="text-primary-200 ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['Everything in Basic', 'Advanced Progress Analytics', 'Custom Meal Creation', 'Priority Support'].map(el => (
                                <li key={el} className="flex items-center text-primary-50 group">
                                    <div className="bg-primary-500/30 rounded-full p-1 mr-3 group-hover:bg-primary-500/50 transition-colors">
                                        <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                                    </div>
                                    {el}
                                </li>
                            ))}
                        </ul>
                        <Link to="/register" className="block w-full py-4 px-6 text-center rounded-xl font-bold bg-white text-primary-700 hover:bg-slate-50 shadow-xl shadow-white/10 hover:-translate-y-0.5 transition-all">
                            Upgrade to Pro
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
