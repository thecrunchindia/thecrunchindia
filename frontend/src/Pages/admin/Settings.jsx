import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Globe, Layout, Map, Share2, CircleHelp, AlertCircle, RefreshCcw } from 'lucide-react';
import { 
  SettingsWebData, 
  SettingsTimeMap, 
  SettingsSocial ,
  SettingsSkeleton,
  SettingsFAQ
} from '../../features/admin/settings';

const Settings = () => {
  const { 
    settings, isLoading, handleChange, error, fetchSettings, handleNestedChange, saveSettings,
    searchQuery, setSearchQuery, searchResults, showDropdown, setShowDropdown, 
    handleMapClick, getCurrentLocation, isLocating 
  } = useOutletContext();

  const [activeTab, setActiveTab] = useState('webdata');

  if (isLoading) return (<SettingsSkeleton />);

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertCircle className="text-red-500" size={30}  />
      </div>
      <h2 className="text-sm md:text-xl font-black text-gray-900 mb-6 italic uppercase">{error}</h2>
      <button 
        onClick={() => fetchSettings()} 
        className="cursor-pointer flex items-center gap-2 bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-sm hover:bg-[#f9a602] hover:text-black transition-all shadow-lg"
      >
        <RefreshCcw size={18} /> Try Again
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white px-2 pt-4 sm:px-2 sm:pt-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 px-2 sm:px-0">
        <h1 className="text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight flex items-center gap-3">
          <Globe className="text-[#f9a602]" size={36} /> WEB<span className="text-[#f9a602]">SETTINGS.</span>
        </h1>
      </div>

      {/* Tabs Container - Icons only on mobile, with labels on desktop */}
      <div className="flex items-center w-full mb-8">
        <div className="flex items-center justify-between sm:justify-start gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 w-full sm:w-fit">
          {[
            { id: 'webdata', label: 'Web Data', icon: Layout, color: 'text-blue-500' },
            { id: 'timemap', label: 'Time & Map', icon: Map, color: 'text-orange-500' },
            { id: 'social', label: 'Social Media', icon: Share2, color: 'text-pink-500' },
            { id: 'FAQ', label: 'FAQ', icon: CircleHelp, color: 'text-red-500' },
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              title={tab.label}
              className={`cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all flex-1 sm:flex-none ${
                activeTab === tab.id 
                ? 'bg-white shadow-xl ring-1 ring-gray-300/50 text-gray-900 ' 
                : 'text-gray-800 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              <tab.icon 
                size={18} 
                className={activeTab === tab.id ? tab.color : 'text-gray-800'} 
              />
              {/* Desktop-ൽ മാത്രം ടെക്സ്റ്റ് കാണിക്കും, മൊബൈലിൽ മറച്ചു വെക്കും */}
              <span className="hidden sm:inline whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-4 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-300">
        {activeTab === 'webdata' && (
          <SettingsWebData 
            settings={settings} 
            handleChange={handleChange} 
            handleNestedChange={handleNestedChange} 
            onSave={saveSettings} 
          />
        )}
        
        {activeTab === 'timemap' && (
          <SettingsTimeMap 
            settings={settings} 
            handleChange={handleChange} 
            onSave={saveSettings}
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            searchResults={searchResults} 
            showDropdown={showDropdown} 
            setShowDropdown={setShowDropdown} 
            handleMapClick={handleMapClick}
            getCurrentLocation={getCurrentLocation} 
            isLocating={isLocating}
          />
        )}

        {activeTab === 'social' && (
          <SettingsSocial 
            settings={settings} 
            handleNestedChange={handleNestedChange} 
            onSave={saveSettings} 
          />
        )}

        {activeTab === 'FAQ' && <SettingsFAQ />}
      </div>
    </div>
  );
};

export default Settings;