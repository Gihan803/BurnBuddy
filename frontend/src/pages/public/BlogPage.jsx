import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import api from '../../lib/axios';
import { format } from 'date-fns';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blog');
                setPosts(response.data.data); // Sanctum default pagination structure
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">The BurnBuddy Health Blog</h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500">
                        Expert advice, nutrition tips, and fitness strategies to fuel your weight loss journey.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center text-gray-500">No blog posts found. Check back soon!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                                        </div>
                                        {post.author && (
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-1" />
                                                {post.author.name}
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-100 text-sm font-semibold text-primary-600 flex items-center group-hover:text-primary-700 cursor-pointer">
                                        Read article <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
