import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import api from '../../lib/axios';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Have questions about BurnBuddy? We'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-5">
                        {/* Contact Info Sidebar */}
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white md:col-span-2">
                            <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
                            <p className="text-primary-100 mb-8">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <Mail className="h-6 w-6 text-primary-300 mr-4" />
                                    <span>support@burnbuddy.com</span>
                                </div>
                                <div className="flex items-center">
                                    <MessageSquare className="h-6 w-6 text-primary-300 mr-4" />
                                    <span>Help Center Live Chat</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-8 md:col-span-3">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-success-50 rounded-xl border border-success-200">
                                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
                                        <Send className="h-8 w-8 text-success-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-success-800 mb-2">Message Sent!</h3>
                                    <p className="text-success-600">Thanks for reaching out. We'll be in touch shortly.</p>
                                    <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-medium text-success-700 hover:text-success-800">
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text" required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email" required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                            value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea
                                            required rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                                            value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    {status === 'error' && <p className="text-danger-500 text-sm">Failed to send message. Please try again.</p>}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus-ring disabled:opacity-70 transition-colors"
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
