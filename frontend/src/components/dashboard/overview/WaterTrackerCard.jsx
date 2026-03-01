import { Droplets } from 'lucide-react';

export default function WaterTrackerCard({ log, updateWater }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Hydration</h2>
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                        <Droplets className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-4xl font-black text-gray-900 mb-1">
                    {log.water_ml} <span className="text-lg font-medium text-gray-400 font-sans">ml</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Daily goal: 2500ml</p>
            </div>

            <div className="flex space-x-2 mt-6">
                <button disabled={log.is_completed} onClick={() => updateWater(-250)} className="flex-1 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold flex justify-center items-center transition-colors disabled:opacity-50">
                    -250
                </button>
                <button disabled={log.is_completed} onClick={() => updateWater(+250)} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex justify-center items-center transition-colors shadow-sm shadow-blue-200 disabled:opacity-50">
                    +250
                </button>
            </div>
        </div>
    );
}
