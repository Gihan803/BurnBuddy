import { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

export default function AdminWorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', category: 'cardio', duration_minutes: '',
        calories_burned: '', difficulty: 'beginner', image_url: ''
    });

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/workouts');
            setWorkouts(res.data.data);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout(workout);
        setFormData({
            name: workout.name || '',
            description: workout.description || '',
            category: workout.category || 'cardio',
            duration_minutes: workout.duration_minutes || '',
            calories_burned: workout.calories_burned || '',
            difficulty: workout.difficulty || 'beginner',
            image_url: workout.image_url || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (workoutId) => {
        if (!window.confirm('Are you sure you want to delete this workout?')) return;
        try {
            await api.delete(`/workouts/${workoutId}`);
            fetchWorkouts();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to delete workout');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clean up empty strings to avoid Laravel 500 validation errors
            const payload = { ...formData };
            if (payload.image_url === '') payload.image_url = null;

            if (editingWorkout) {
                await api.put(`/workouts/${editingWorkout.id}`, payload);
            } else {
                await api.post('/workouts', payload);
            }
            setShowForm(false);
            setEditingWorkout(null);
            fetchWorkouts();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to save workout');
        }
    };

    const cancelEdit = () => {
        setShowForm(false);
        setEditingWorkout(null);
        setFormData({
            name: '', description: '', category: 'cardio', duration_minutes: '',
            calories_burned: '', difficulty: 'beginner', image_url: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Workouts</h1>
                    <p className="text-sm text-gray-500">Add, edit, or delete workout plans.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => { cancelEdit(); setShowForm(true); }}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center"
                    >
                        <PlusCircle className="h-5 w-5 mr-2" /> Add Workout
                    </button>
                )}
            </div>

            {showForm ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold mb-4">{editingWorkout ? 'Edit Workout' : 'New Workout'}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="cardio">Cardio</option>
                                <option value="strength">Strength</option>
                                <option value="flexibility">Flexibility</option>
                                <option value="hiit">HIIT</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows="3"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                            <input type="number" required min="1" value={formData.duration_minutes} onChange={e => setFormData({ ...formData, duration_minutes: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
                            <input type="number" required min="0" value={formData.calories_burned} onChange={e => setFormData({ ...formData, calories_burned: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                            <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={cancelEdit} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Save Workout
                        </button>
                    </div>
                </form>
            ) : loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full"></div></div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {/* Mobile View: Stacked Cards */}
                    <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                        {workouts.map((workout) => (
                            <div key={workout.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-900">{workout.name}</div>
                                        <div className="text-sm text-gray-500 capitalize">{workout.category} &bull; {workout.difficulty}</div>
                                    </div>
                                    <div className="text-sm font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                                        {workout.duration_minutes} min
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 line-clamp-2">{workout.description || 'No description provided.'}</div>
                                <div className="flex justify-end space-x-4 pt-3 border-t">
                                    <button onClick={() => handleEdit(workout)} className="text-primary-600 hover:text-primary-900 flex items-center text-sm font-medium">
                                        <Edit className="h-4 w-4 mr-1" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(workout.id)} className="text-danger-600 hover:text-danger-900 flex items-center text-sm font-medium">
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {workouts.map((workout) => (
                                    <tr key={workout.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workout.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{workout.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workout.duration_minutes} min</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{workout.difficulty}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(workout)} className="text-primary-600 hover:text-primary-900 mr-4">
                                                <Edit className="h-5 w-5 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(workout.id)} className="text-danger-600 hover:text-danger-900">
                                                <Trash2 className="h-5 w-5 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
