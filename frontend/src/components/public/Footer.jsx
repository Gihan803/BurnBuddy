import { Link } from 'react-router-dom';
import { Flame, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Flame className="h-6 w-6 text-primary-600" />
                            <span className="text-lg font-bold text-gray-900">BurnBuddy</span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-6">
                            Your intelligent companion for weight loss, meal planning, and fitness tracking.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link to="/#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</Link></li>
                            <li><Link to="/#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</Link></li>
                            <li><Link to="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Health Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Status</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} BurnBuddy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
