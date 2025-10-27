// import React, { useState } from 'react';
// import { Droplets, Zap, Waves, Activity, Sparkles, TrendingUp, CheckCircle2, AlertCircle, RefreshCw, Download, BarChart3, Microscope, FlaskConical } from 'lucide-react';

// const PlasmoniAIAgent = () => {
//   const [formData, setFormData] = useState({
//     pH: '7',
//     ES: '2000',
//     TDS: '1000',
//     Turbidity: '50',
//     OandG: '20',
//     CO2: '40',
//     Ni: '1',
//     Zn: '1',
//     Cu: '0.5',
//     CrVI: '0.1',
//     Fe: '2',
//     Temp: '25',
//     Flow: '1'
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const inputFields = [
//     { name: 'pH', label: 'pH', unit: '', group: 'basic' },
//     { name: 'ES', label: 'ES', unit: 'μS/cm', group: 'basic' },
//     { name: 'TDS', label: 'TDS', unit: 'ppm', group: 'basic' },
//     { name: 'Turbidity', label: 'Turbidity', unit: 'NTU', group: 'basic' },
//     { name: 'OandG', label: 'O&G', unit: 'mg/L', group: 'basic' },
//     { name: 'CO2', label: 'CO₂', unit: 'mg/L', group: 'basic' },
//     { name: 'Ni', label: 'Ni', unit: 'mg/L', group: 'metals' },
//     { name: 'Zn', label: 'Zn', unit: 'mg/L', group: 'metals' },
//     { name: 'Cu', label: 'Cu', unit: 'mg/L', group: 'metals' },
//     { name: 'CrVI', label: 'Cr(VI)', unit: 'mg/L', group: 'metals' },
//     { name: 'Fe', label: 'Fe', unit: 'mg/L', group: 'metals' },
//     { name: 'Temp', label: 'Temperature', unit: '°C', group: 'operational' },
//     { name: 'Flow', label: 'Flow', unit: 'L/min', group: 'operational' }
//   ];

//   const handleInputChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setError(null);
//   };

//   const handleAnalyze = async () => {
//     if (!formData.pH || !formData.ES || !formData.TDS) {
//       setError('Please fill in at least pH, ES, and TDS values');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:4000/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(
//           Object.fromEntries(
//             Object.entries(formData).map(([k, v]) => [k, parseFloat(v) || 0])
//           )
//         )
//       });

//       const data = await response.json();

//       if (data.ok) {
//         setResult(data);
//       } else {
//         setError(data.error || 'Analysis failed');
//       }
//     } catch (err) {
//       setError('Failed to connect to analysis server. Please ensure the backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       pH: '', ES: '', TDS: '', Turbidity: '', OandG: '', CO2: '',
//       Ni: '', Zn: '', Cu: '', CrVI: '', Fe: '', Temp: '', Flow: ''
//     });
//     setResult(null);
//     setError(null);
//   };

//   const getConfidenceColor = (confidence) => {
//     if (confidence >= 90) return 'bg-emerald-500';
//     if (confidence >= 70) return 'bg-blue-500';
//     if (confidence >= 50) return 'bg-amber-500';
//     return 'bg-orange-500';
//   };

//   const getConfidenceLabel = (confidence) => {
//     if (confidence >= 90) return 'Excellent';
//     if (confidence >= 70) return 'High';
//     if (confidence >= 50) return 'Moderate';
//     return 'Low';
//   };

//   const basicFields = inputFields.filter(f => f.group === 'basic');
//   const metalFields = inputFields.filter(f => f.group === 'metals');
//   const operationalFields = inputFields.filter(f => f.group === 'operational');

//   if (result) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">PlasmoniAI Analysis</h1>
//                 <p className="text-sm text-gray-600">Advanced Water Treatment Design System</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setResult(null)}
//               className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold text-gray-700 shadow-sm"
//             >
//               <RefreshCw className="w-4 h-4" />
//               New Analysis
//             </button>
//           </div>

//           {/* Confidence Banner */}
//           <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className={`${getConfidenceColor(result.confidence)} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
//                   <CheckCircle2 className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
//                   <p className="text-gray-600">Match Type: <span className="font-semibold text-blue-600">{result.matchType.replace('_', ' ').toUpperCase()}</span></p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-4xl font-bold text-gray-900">{result.confidence}%</div>
//                 <div className={`text-sm font-semibold ${getConfidenceColor(result.confidence).replace('bg-', 'text-')}`}>
//                   {getConfidenceLabel(result.confidence)} Confidence
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Design & Performance */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Optimal Design Parameters */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                     <Microscope className="w-5 h-5 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Optimal Design Parameters</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   {Object.entries(result.design).map(([key, value]) => (
//                     <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
//                       <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
//                       <p className="text-lg font-bold text-gray-900">{value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Performance Metrics */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
//                     <TrendingUp className="w-5 h-5 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Expected Performance</h3>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4">
//                   {Object.entries(result.performance).map(([key, value]) => {
//                     const isHighPerformance = typeof value === 'number' && value > 70;
//                     return (
//                       <div key={key} className={`rounded-xl p-4 border-2 ${isHighPerformance ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'}`}>
//                         {isHighPerformance && (
//                           <div className="flex items-center justify-end mb-1">
//                             <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Excellent</span>
//                           </div>
//                         )}
//                         <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
//                         <p className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toFixed(1) : value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* AI Analysis */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-green-100 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
//                     <BarChart3 className="w-5 h-5 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">AI Analysis & Insights</h3>
//                 </div>
//                 <div className="space-y-4">
//                   {Object.entries(result.analysis).map(([key, value]) => (
//                     <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
//                       <h4 className="text-sm font-bold text-gray-900 mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
//                       <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Image & References */}
//             <div className="space-y-6">
//               {/* Sample Image */}
//               {result.image && (
//                 <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Sample Image</h3>
//                   <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden border-2 border-blue-200">
//                     <img
//                       src={`http://localhost:4000${result.image}`}
//                       alt="Sample"
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><p class="text-sm text-gray-600 font-medium">No image available</p></div></div>';
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Reference Samples */}
//               {result.nearestSamples && result.nearestSamples.length > 0 && (
//                 <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-100 p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
//                       <Activity className="w-5 h-5 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-900">Reference Samples</h3>
//                   </div>
//                   <div className="space-y-3">
//                     {result.nearestSamples.map((sample, idx) => (
//                       <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="font-bold text-gray-900">{sample.sample}</span>
//                           <span className={`text-sm font-bold px-3 py-1 rounded-full ${getConfidenceColor(sample.similarity)} text-white`}>
//                             {sample.similarity}%
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-600">Similar experimental data point</p>
//                         <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
//                           <div className="bg-white/50 rounded px-2 py-1">
//                             <span className="text-gray-600">pH:</span> <span className="font-semibold text-gray-900">{sample.input.pH}</span>
//                           </div>
//                           <div className="bg-white/50 rounded px-2 py-1">
//                             <span className="text-gray-600">TDS:</span> <span className="font-semibold text-gray-900">{sample.input.TDS}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Input Parameters Summary */}
//               <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Input Parameters</h3>
//                 <div className="space-y-2">
//                   {Object.entries(result.inputData).map(([key, value]) => (
//                     <div key={key} className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600 font-medium">{key}:</span>
//                       <span className="font-bold text-gray-900">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
//               <Sparkles className="w-4 h-4" />
//               Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-3">
//             <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
//               <Sparkles className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               PlasmoniAI
//             </h1>
//           </div>
//           <p className="text-xl text-gray-700 font-semibold mb-1">Plasmonic Ophiolite Intelligence System</p>
//           <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
//             <Sparkles className="w-4 h-4" />
//             Advanced AI-Powered Water Treatment Design
//           </p>
//         </div>

//         {/* Main Input Card */}
//         <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 p-8">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//               <Waves className="w-7 h-7 text-blue-600" />
//               Chemical & Operational Inputs
//             </h2>
//             <p className="text-gray-600">Adjust water quality parameters for AI analysis</p>
//           </div>

//           {error && (
//             <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//           )}

//           {/* Basic Parameters */}
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Droplets className="w-5 h-5 text-blue-600" />
//               Basic Water Quality
//             </h3>
//             <div className="grid grid-cols-3 gap-4">
//               {basicFields.map(field => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     {field.label}
//                     {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData[field.name]}
//                     onChange={(e) => handleInputChange(field.name, e.target.value)}
//                     className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 font-semibold"
//                     placeholder={field.label}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Heavy Metals */}
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <FlaskConical className="w-5 h-5 text-purple-600" />
//               Heavy Metals
//             </h3>
//             <div className="grid grid-cols-5 gap-4">
//               {metalFields.map(field => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     {field.label}
//                     {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData[field.name]}
//                     onChange={(e) => handleInputChange(field.name, e.target.value)}
//                     className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 font-semibold"
//                     placeholder={field.label}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Operational Parameters */}
//           <div className="mb-8">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Activity className="w-5 h-5 text-green-600" />
//               Operational Parameters
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {operationalFields.map(field => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     {field.label}
//                     {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData[field.name]}
//                     onChange={(e) => handleInputChange(field.name, e.target.value)}
//                     className="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 font-semibold"
//                     placeholder={field.label}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleReset}
//               className="px-8 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl hover:bg-gray-200 transition-all font-bold text-gray-700 shadow-sm"
//             >
//               Reset
//             </button>
//             <button
//               onClick={handleAnalyze}
//               disabled={loading}
//               className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-xl text-lg"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Analyzing...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-6 h-6" />
//                   Analyze Water Sample
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
//             <Sparkles className="w-4 h-4" />
//             Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlasmoniAIAgent;
import React, { useState } from 'react';
import { Droplets, Zap, Waves, Activity, Sparkles, TrendingUp, CheckCircle2, AlertCircle, RefreshCw, Download, BarChart3, Microscope, FlaskConical } from 'lucide-react';

const PlasmoniAIAgent = () => {
  const [formData, setFormData] = useState({
    pH: '7',
    ES: '2000',
    TDS: '1000',
    Turbidity: '50',
    OandG: '20',
    CO2: '40',
    Ni: '1',
    Zn: '1',
    Cu: '0.5',
    CrVI: '0.1',
    Fe: '2',
    Temp: '25',
    Flow: '1'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const inputFields = [
    { name: 'pH', label: 'pH', unit: '', group: 'basic' },
    { name: 'ES', label: 'ES', unit: 'μS/cm', group: 'basic' },
    { name: 'TDS', label: 'TDS', unit: 'ppm', group: 'basic' },
    { name: 'Turbidity', label: 'Turbidity', unit: 'NTU', group: 'basic' },
    { name: 'OandG', label: 'O&G', unit: 'mg/L', group: 'basic' },
    { name: 'CO2', label: 'CO₂', unit: 'mg/L', group: 'basic' },
    { name: 'Ni', label: 'Ni', unit: 'mg/L', group: 'metals' },
    { name: 'Zn', label: 'Zn', unit: 'mg/L', group: 'metals' },
    { name: 'Cu', label: 'Cu', unit: 'mg/L', group: 'metals' },
    { name: 'CrVI', label: 'Cr(VI)', unit: 'mg/L', group: 'metals' },
    { name: 'Fe', label: 'Fe', unit: 'mg/L', group: 'metals' },
    { name: 'Temp', label: 'Temperature', unit: '°C', group: 'operational' },
    { name: 'Flow', label: 'Flow', unit: 'L/min', group: 'operational' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!formData.pH || !formData.ES || !formData.TDS) {
      setError('Please fill in at least pH, ES, and TDS values');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [k, parseFloat(v) || 0])
          )
        )
      });

      const data = await response.json();

      if (data.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to analysis server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      pH: '', ES: '', TDS: '', Turbidity: '', OandG: '', CO2: '',
      Ni: '', Zn: '', Cu: '', CrVI: '', Fe: '', Temp: '', Flow: ''
    });
    setResult(null);
    setError(null);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'bg-emerald-500';
    if (confidence >= 70) return 'bg-blue-500';
    if (confidence >= 50) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 90) return 'Excellent';
    if (confidence >= 70) return 'High';
    if (confidence >= 50) return 'Moderate';
    return 'Low';
  };

  const basicFields = inputFields.filter(f => f.group === 'basic');
  const metalFields = inputFields.filter(f => f.group === 'metals');
  const operationalFields = inputFields.filter(f => f.group === 'operational');

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PlasmoniAI Analysis</h1>
                <p className="text-sm text-gray-600">Advanced Water Treatment Design System</p>
              </div>
            </div>
            <button
              onClick={() => setResult(null)}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 font-semibold text-gray-700 shadow-sm transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
          </div>

          {/* Confidence Banner */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 mb-6 animate-fadeIn animation-delay-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${getConfidenceColor(result.confidence)} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow`}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
                  <p className="text-gray-600">Match Type: <span className="font-semibold text-blue-600">{result.matchType.replace('_', ' ').toUpperCase()}</span></p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">{result.confidence}%</div>
                <div className={`text-sm font-semibold ${getConfidenceColor(result.confidence).replace('bg-', 'text-')}`}>
                  {getConfidenceLabel(result.confidence)} Confidence
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Design & Performance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Optimal Design Parameters */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 animate-fadeIn animation-delay-400 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Optimal Design Parameters</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(result.design).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                      <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-100 p-6 animate-fadeIn animation-delay-600 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Expected Performance</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(result.performance).map(([key, value]) => {
                    const isHighPerformance = typeof value === 'number' && value > 70;
                    return (
                      <div key={key} className={`rounded-xl p-4 border-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${isHighPerformance ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'}`}>
                        {isHighPerformance && (
                          <div className="flex items-center justify-end mb-1">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Excellent</span>
                          </div>
                        )}
                        <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toFixed(1) : value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-green-100 p-6 animate-fadeIn animation-delay-800 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">AI Analysis & Insights</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(result.analysis).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Image & References */}
            <div className="space-y-6">
              {/* Sample Image */}
              {result.image && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 animate-fadeIn animation-delay-400 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Sample Image</h3>
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden border-2 border-blue-200 shadow-inner">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${result.image}`}
                      alt="Sample"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="text-center"><div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3"><svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><p class="text-sm text-gray-600 font-medium">No image available</p></div></div>';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Reference Samples */}
              {result.nearestSamples && result.nearestSamples.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-amber-100 p-6 animate-fadeIn animation-delay-600 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Reference Samples</h3>
                  </div>
                  <div className="space-y-3">
                    {result.nearestSamples.map((sample, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900">{sample.sample}</span>
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${getConfidenceColor(sample.similarity)} text-white`}>
                            {sample.similarity}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">Similar experimental data point</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/50 rounded px-2 py-1">
                            <span className="text-gray-600">pH:</span> <span className="font-semibold text-gray-900">{sample.input.pH}</span>
                          </div>
                          <div className="bg-white/50 rounded px-2 py-1">
                            <span className="text-gray-600">TDS:</span> <span className="font-semibold text-gray-900">{sample.input.TDS}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Parameters Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 animate-fadeIn animation-delay-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Input Parameters</h3>
                <div className="space-y-2">
                  {Object.entries(result.inputData).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">{key}:</span>
                      <span className="font-bold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              PlasmoniAI
            </h1>
          </div>
          <p className="text-xl text-gray-700 font-semibold mb-1">Plasmonic Ophiolite Intelligence System</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Advanced AI-Powered Water Treatment Design
          </p>
        </div>

        {/* Main Input Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-blue-100 p-8 animate-fadeIn animation-delay-200 hover:shadow-3xl transition-all duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Waves className="w-7 h-7 text-blue-600" />
              Chemical & Operational Inputs
            </h2>
            <p className="text-gray-600">Adjust water quality parameters for AI analysis</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Basic Parameters */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              Basic Water Quality
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {basicFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-blue-100 hover:border-blue-300 hover:shadow-md"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Heavy Metals */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-purple-600" />
              Heavy Metals
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {metalFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-purple-100 hover:border-purple-300 hover:shadow-md"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Operational Parameters */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Operational Parameters
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {operationalFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-green-100 hover:border-green-300 hover:shadow-md"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-gray-700 shadow-sm"
            >
              Reset
            </button>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-xl text-lg animate-gradient-x"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Analyze Water Sample
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlasmoniAIAgent;

// Add this to your global CSS or Tailwind config
const styles = `
  @keyframes blob {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(20px, -50px) scale(1.1);
    }
    50% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    75% {
      transform: translate(50px, 50px) scale(1.05);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-800 {
    animation-delay: 0.8s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .animation-delay-6000 {
    animation-delay: 6s;
  }

  .shadow-3xl {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}