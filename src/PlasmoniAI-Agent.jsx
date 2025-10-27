import React, { useState } from 'react';
import { Droplets, Zap, Waves, Activity, Sparkles, TrendingUp, CheckCircle2, AlertCircle, RefreshCw, Download, BarChart3, Microscope, FlaskConical } from 'lucide-react';

const PlasmoniAIAgent = () => {
  const [formData, setFormData] = useState({
    pH: '5.2',
  ES: '4200',
  TDS: '2400',
  Turbidity: '90',
  OandG: '60',
  CO2: '75',
  Ni: '3',
  Zn: '2.5',
  Cu: '0.8',
  CrVI: '0.2',
  Fe: '3.5',
  Temp: '25',
  Flow: '0.5'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0 animate-fadeIn">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">PlasmoniAI Analysis</h1>
                <p className="text-xs sm:text-sm text-gray-600">Advanced Water Treatment Design System</p>
              </div>
            </div>
            <button
              onClick={() => setResult(null)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 font-semibold text-gray-700 shadow-sm transform hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4" />
              New Analysis
            </button>
          </div>

          {/* Confidence Banner */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-blue-100 p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeIn animation-delay-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`${getConfidenceColor(result.confidence)} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0`}>
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Analysis Complete</h2>
                  <p className="text-sm sm:text-base text-gray-600">Match Type: <span className="font-semibold text-blue-600">{result.matchType.replace('_', ' ').toUpperCase()}</span></p>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{result.confidence}%</div>
                <div className={`text-xs sm:text-sm font-semibold ${getConfidenceColor(result.confidence).replace('bg-', 'text-')}`}>
                  {getConfidenceLabel(result.confidence)} Confidence
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Design & Performance */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Optimal Design Parameters */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-blue-100 p-4 sm:p-6 animate-fadeIn animation-delay-400 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0">
                    <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Optimal Design Parameters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(result.design).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                      <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900 break-words">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-purple-100 p-4 sm:p-6 animate-fadeIn animation-delay-600 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Expected Performance</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {Object.entries(result.performance).map(([key, value]) => {
                    const isHighPerformance = typeof value === 'number' && value > 70;
                    return (
                      <div key={key} className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${isHighPerformance ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                        {isHighPerformance && (
                          <div className="flex items-center justify-end mb-1">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Excellent</span>
                          </div>
                        )}
                        <p className="text-xs font-semibold text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toFixed(1) : value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

{/* Matched Sample Visualization */}
{result.image && (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-indigo-100 p-4 sm:p-6 animate-fadeIn animation-delay-700 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Matched Sample Visualization</h3>
    </div>
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${result.image}`}
        alt="Matched Sample"
        className="w-full h-auto object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'data:image/svg+xml,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="18"%3EImage not available%3C/text%3E%3C/svg%3E';
        }}
      />
      {result.sample && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-bold text-sm sm:text-base">{result.sample}</p>
        </div>
      )}
    </div>
  </div>
)}

              {/* AI Analysis */}
              {result.aiAnalysis && (
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 text-white animate-fadeIn animation-delay-800 hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center animate-pulse-slow flex-shrink-0">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">AI Expert Analysis</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">{result.aiAnalysis}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Input Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6 animate-fadeIn animation-delay-600 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center shadow-lg animate-pulse-slow flex-shrink-0">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Input Parameters</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
                  {Object.entries(formData).map(([key, value]) => {
                    const field = inputFields.find(f => f.name === key);
                    return (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded transition-all duration-200">
                        <span className="text-xs sm:text-sm font-semibold text-gray-600">{field?.label || key}</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          {value} {field?.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Download Report Button */}
              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3 shadow-xl text-sm sm:text-base animate-fadeIn animation-delay-800">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Report
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 sm:mt-8 animate-fadeIn animation-delay-800">
            <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-slow flex-shrink-0">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PlasmoniAI Agent
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            AI-Powered Water Treatment Design System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3 animate-fadeIn shadow-lg">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 text-sm sm:text-base">Error</h4>
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border-2 border-blue-100 p-4 sm:p-6 md:p-8 animate-fadeIn animation-delay-200 hover:shadow-3xl transition-all duration-300">
          {/* Basic Parameters */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Basic Water Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {basicFields.map(field => (
                <div key={field.name}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-blue-100 hover:border-blue-300 hover:shadow-md text-sm sm:text-base"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Heavy Metals */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Heavy Metals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {metalFields.map(field => (
                <div key={field.name}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1 hidden sm:inline">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-50 border-2 border-purple-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-purple-100 hover:border-purple-300 hover:shadow-md text-sm sm:text-base"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Operational Parameters */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              Operational Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {operationalFields.map(field => (
                <div key={field.name}>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 font-semibold hover:bg-green-100 hover:border-green-300 hover:shadow-md text-sm sm:text-base"
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-gray-700 shadow-sm text-sm sm:text-base"
            >
              Reset
            </button>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 sm:gap-3 shadow-xl text-sm sm:text-base md:text-lg animate-gradient-x"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Analyze Water Sample
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 animate-fadeIn animation-delay-400">
          <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap px-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Powered by GPT-4 AI · Plasmonic Ophiolite Intelligence System</span>
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