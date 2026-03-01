import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import heroImage from '../../../assets/hero-image.png';

export default function HeroSection() {
    return (
        <section className="relative bg-white pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-primary-50 to-white opacity-50" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                            Your journey to a <br />
                            <span className="text-primary-600">Healthier You</span> <br />
                            starts here.
                        </h1>
                        <p className="max-w-xl text-xl text-slate-600 mb-12 leading-relaxed">
                            BurnBuddy takes the guesswork out of weight loss. We calculate your ideal macros, plan your meals, and track your workouts—all in one intelligent platform.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-10">
                            <Link to="/register" className="px-8 py-4 w-full sm:w-auto text-lg font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all focus-ring text-center">
                                Start Your Journey
                            </Link>
                            <Link to="#features" className="px-8 py-4 w-full sm:w-auto text-lg font-medium rounded-full text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all focus-ring text-center">
                                See How It Works
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={heroImage}
                                alt="BurnBuddy App Dashboard"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700" />
                    </div>
                </div>
            </div>
        </section>
    );
}
