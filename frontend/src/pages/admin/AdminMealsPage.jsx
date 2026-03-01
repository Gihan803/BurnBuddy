import { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

export default function AdminMealsPage() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingMeal, setEditingMeal] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', category: 'breakfast', calories: '',
        protein_g: '', carbs_g: '', fat_g: '', image_url: ''
    });

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            setLoading(true);
            const res = await api.get('/meals');
            setMeals(res.data.data);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (meal) => {
        setEditingMeal(meal);
        setFormData({
            name: meal.name || '',
            description: meal.description || '',
            category: meal.category || 'breakfast',
            calories: meal.calories || '',
            protein_g: meal.protein_g || '',
            carbs_g: meal.carbs_g || '',
            fat_g: meal.fat_g || '',
            image_url: meal.image_url || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (mealId) => {
        if (!window.confirm('Are you sure you want to delete this meal?')) return;
        try {
            await api.delete(`/meals/${mealId}`);
            fetchMeals();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to delete meal');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clean up empty strings for optional numeric fields to avoid Laravel 500 validation errors
            const payload = { ...formData };
            if (payload.protein_g === '') payload.protein_g = null;
            if (payload.carbs_g === '') payload.carbs_g = null;
            if (payload.fat_g === '') payload.fat_g = null;
            if (payload.image_url === '') payload.image_url = null;

            if (editingMeal) {
                await api.put(`/meals/${editingMeal.id}`, payload);
            } else {
                await api.post('/meals', payload);
            }
            setShowForm(false);
            setEditingMeal(null);
            fetchMeals();
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to save meal');
        }
    };

    const cancelEdit = () => {
        setShowForm(false);
        setEditingMeal(null);
        setFormData({
            name: '', description: '', category: 'breakfast', calories: '',
            protein_g: '', carbs_g: '', fat_g: '', image_url: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Meals</h1>
                    <p className="text-sm text-gray-500">Add, edit, or delete meal plans.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => { cancelEdit(); setShowForm(true); }}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center"
                    >
                        <PlusCircle className="h-5 w-5 mr-2" /> Add Meal
                    </button>
                )}
            </div>

            {showForm ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold mb-4">{editingMeal ? 'Edit Meal' : 'New Meal'}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snack">Snack</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows="3"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Calories</label>
                            <input type="number" required min="0" value={formData.calories} onChange={e => setFormData({ ...formData, calories: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                            <input type="number" min="0" step="0.1" value={formData.protein_g} onChange={e => setFormData({ ...formData, protein_g: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                            <input type="number" min="0" step="0.1" value={formData.carbs_g} onChange={e => setFormData({ ...formData, carbs_g: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                            <input type="number" min="0" step="0.1" value={formData.fat_g} onChange={e => setFormData({ ...formData, fat_g: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={cancelEdit} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Save Meal
                        </button>
                    </div>
                </form>
            ) : loading ? (
                <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full"></div></div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    {/* Mobile View: Stacked Cards */}
                    <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                        {meals.map((meal) => (
                            <div key={meal.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-900">{meal.name}</div>
                                        <div className="text-sm text-gray-500 capitalize">{meal.category}</div>
                                    </div>
                                    <div className="text-sm font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                                        {meal.calories} kcal
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 line-clamp-2">{meal.description || 'No description provided.'}</div>
                                <div className="flex justify-end space-x-4 pt-3 border-t">
                                    <button onClick={() => handleEdit(meal)} className="text-primary-600 hover:text-primary-900 flex items-center text-sm font-medium">
                                        <Edit className="h-4 w-4 mr-1" /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(meal.id)} className="text-danger-600 hover:text-danger-900 flex items-center text-sm font-medium">
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {meals.map((meal) => (
                                    <tr key={meal.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meal.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{meal.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meal.calories} kcal</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(meal)} className="text-primary-600 hover:text-primary-900 mr-4">
                                                <Edit className="h-5 w-5 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(meal.id)} className="text-danger-600 hover:text-danger-900">
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
