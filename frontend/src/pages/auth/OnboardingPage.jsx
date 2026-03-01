import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, User, Ruler, Weight, Target, CheckCircle2 } from 'lucide-react';
import api from '../../lib/axios';

const ACTIVITY_LEVELS = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { id: 'lightly_active', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { id: 'moderately_active', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { id: 'very_active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { id: 'extra_active', label: 'Extra Active', desc: 'Very hard exercise/physical job' },
];

function Step1Basics({ formData, setFormData, onNext }) {
    return (
        <form onSubmit={onNext} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <User className="mr-2 h-6 w-6 text-primary-500" /> Basics
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biological Gender</label>
                <div className="grid grid-cols-2 gap-4">
                    {['male', 'female'].map(g => (
                        <button
                            key={g} type="button"
                            onClick={() => setFormData({ ...formData, gender: g })}
                            className={`py-3 px-4 border rounded-xl flex items-center justify-center font-medium capitalize transition-colors ${formData.gender === g ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age (13-120)</label>
                <input
                    type="number" required min="13" max="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
            </div>

            <button type="submit" className="w-full flex justify-center py-3 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 font-medium mt-8">
                Next <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </form>
    );
}

function Step2BodyMetrics({ formData, setFormData, onNext, onBack }) {
    return (
        <form onSubmit={onNext} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Ruler className="mr-2 h-6 w-6 text-primary-500" /> Body Metrics
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                    type="number" required min="100" max="250" step="0.1" placeholder="175.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={formData.height_cm} onChange={e => setFormData({ ...formData, height_cm: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg)</label>
                <input
                    type="number" required min="30" max="300" step="0.1" placeholder="75.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={formData.weight_kg} onChange={e => setFormData({ ...formData, weight_kg: e.target.value })}
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button type="button" onClick={onBack} className="w-1/3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">Back</button>
                <button type="submit" className="w-2/3 flex justify-center py-3 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 font-medium">
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

function Step3Goals({ formData, setFormData, onNext, onBack }) {
    return (
        <form onSubmit={onNext} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Target className="mr-2 h-6 w-6 text-primary-500" /> Your Goals
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Weight (kg)</label>
                <p className="text-xs text-gray-500 mb-3">Set a realistic weight target.</p>
                <input
                    type="number" required min="30" max="300" step="0.1" placeholder="65.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg font-semibold text-primary-900 bg-primary-50 border-primary-200"
                    value={formData.goal_weight_kg} onChange={e => setFormData({ ...formData, goal_weight_kg: e.target.value })}
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button type="button" onClick={onBack} className="w-1/3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">Back</button>
                <button type="submit" className="w-2/3 flex justify-center py-3 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 font-medium">
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </form>
    );
}

function Step4ActivityLevel({ formData, setFormData, onSubmit, onBack, loading }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Activity className="mr-2 h-6 w-6 text-primary-500" /> Activity Level
            </h3>

            <div className="space-y-3">
                {ACTIVITY_LEVELS.map(level => (
                    <button
                        key={level.id}
                        onClick={() => setFormData({ ...formData, activity_level: level.id })}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${formData.activity_level === level.id
                            ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500'
                            : 'bg-white border-gray-200 hover:border-primary-300'
                            }`}
                    >
                        <div className="font-semibold text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.desc}</div>
                    </button>
                ))}
            </div>

            <div className="flex gap-4 pt-4">
                <button type="button" onClick={onBack} className="w-1/3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">Back</button>
                <button
                    onClick={onSubmit} disabled={loading}
                    className="w-2/3 flex justify-center py-3 border border-transparent rounded-lg text-white bg-success-600 hover:bg-success-700 font-medium disabled:opacity-70"
                >
                    {loading ? 'Calculating...' : 'Finish & Calculate'}
                </button>
            </div>
        </div>
    );
}

function Step5Results({ results, onComplete }) {
    if (!results) return null;
    return (
        <div className="text-center space-y-6 py-4">
            <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-success-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">Plan Generated!</h3>
            <p className="text-gray-500">We've calculated your exact metabolism.</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500 font-medium mb-1">Base Meta (BMR)</div>
                    <div className="text-2xl font-bold text-gray-900">{Math.round(results.bmr)} <span className="text-sm font-normal text-gray-500">kcal</span></div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500 font-medium mb-1">Daily Burn (TDEE)</div>
                    <div className="text-2xl font-bold text-gray-900">{Math.round(results.tdee)} <span className="text-sm font-normal text-gray-500">kcal</span></div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 rounded-2xl text-white mt-4 shadow-lg">
                <div className="text-primary-100 font-medium mb-2">
                    Your Daily Target for {results.goal_type === 'loss' ? 'Weight Loss' : results.goal_type === 'gain' ? 'Weight Gain' : 'Maintenance'}
                </div>
                <div className="text-5xl font-extrabold tracking-tight">
                    {results.daily_calorie_target} <span className="text-xl font-medium text-primary-200">kcal</span>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="w-full mt-8 flex justify-center py-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gray-900 hover:bg-gray-800"
            >
                Go to my Dashboard
            </button>
        </div>
    );
}

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height_cm: '',
        weight_kg: '',
        goal_weight_kg: '',
        activity_level: 'sedentary'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

    const handleNext = (e) => {
        if (e) e.preventDefault();
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.put('/profile', {
                age: parseInt(formData.age),
                gender: formData.gender,
                height_cm: parseFloat(formData.height_cm),
                weight_kg: parseFloat(formData.weight_kg),
                goal_weight_kg: parseFloat(formData.goal_weight_kg),
                activity_level: formData.activity_level,
            });
            setResults(response.data.metrics);
            setStep(5); // Completion step
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save profile.');
            if (err.response?.status === 422) {
                setError(Object.values(err.response.data.errors)[0][0]);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Personalize Your Plan
                </h2>
                {step < 5 && (
                    <div className="mt-4 flex justify-between items-center sm:px-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`flex-1 h-2 mx-1 rounded-full ${i <= step ? 'bg-primary-600' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">

                    {error && (
                        <div className="mb-6 bg-danger-50 border-l-4 border-danger-500 p-4 text-sm text-danger-700">
                            {error}
                        </div>
                    )}

                    {step === 1 && <Step1Basics formData={formData} setFormData={setFormData} onNext={handleNext} />}
                    {step === 2 && <Step2BodyMetrics formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
                    {step === 3 && <Step3Goals formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
                    {step === 4 && <Step4ActivityLevel formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBack={handleBack} loading={loading} />}
                    {step === 5 && <Step5Results results={results} onComplete={() => navigate('/dashboard')} />}

                </div>
            </div>
        </div>
    );
}
