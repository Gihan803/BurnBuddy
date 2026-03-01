import { Link } from 'react-router-dom';
import { Flame, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 glass-panel">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Flame className="h-8 w-8 text-primary-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                                BurnBuddy
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/#features" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Features</Link>
                        <Link to="/#pricing" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Pricing</Link>
                        <Link to="/blog" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Blog</Link>
                        <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>

                        <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Log in</Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-sm hover:shadow-md transition-all focus-ring"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-500 hover:text-gray-900 p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <Link to="/#features" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Features</Link>
                        <Link to="/#pricing" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Pricing</Link>
                        <Link to="/blog" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Blog</Link>
                        <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Contact</Link>
                        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                            <Link to="/login" className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Log in
                            </Link>
                            <Link to="/register" className="flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
