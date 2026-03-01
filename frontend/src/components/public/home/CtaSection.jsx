import { Link } from 'react-router-dom';

export default function CtaSection() {
    return (
        <section className="relative py-24 bg-primary-400 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-600 to-transparent opacity-90"></div>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Ready to transform your life?
                </h2>
                <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                    Join 50,000+ users who are already crushing their fitness goals with BurnBuddy.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/register" className="px-10 py-5 text-lg font-bold rounded-full text-primary-700 bg-white shadow-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all">
                        Get Started for Free
                    </Link>
                    <span className="text-primary-200 text-sm font-medium">No credit card required.</span>
                </div>
            </div>
        </section>
    );
}
