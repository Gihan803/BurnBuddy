import { Star } from 'lucide-react';

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-12">Real results from real people</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Sarah J.",
                            story: "BurnBuddy made counting macros effortless. The daily ring keeps me accountable.",
                            lost: "Lost 15 lbs",
                            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                        },
                        {
                            name: "Michael T.",
                            story: "Finally, a tracker that understands different workout intensities! Highly recommend.",
                            lost: "Lost 22 lbs",
                            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                        },
                        {
                            name: "Emma W.",
                            story: "The meal catalog is incredible. I never run out of healthy ideas now.",
                            lost: "Lost 18 lbs",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                        }
                    ].map((testimonial, idx) => (
                        <div key={idx} className="bg-slate-50 p-8 rounded-2xl relative text-left flex flex-col hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-warning-500 fill-current" />)}
                            </div>
                            <p className="text-slate-700 italic mb-8 grow">"{testimonial.story}"</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-slate-900">{testimonial.name}</span>
                                    <span className="text-sm font-medium text-success-600">{testimonial.lost}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
