import { useState, useEffect } from 'react';
import { Timer, MapPin, Lock, Unlock, Navigation2, Search, X, Loader2, Check } from 'lucide-react';
import EditableField from './EditableField';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ 
  iconUrl: markerIcon, 
  shadowUrl: markerShadow, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41] 
});
L.Marker.prototype.options.icon = DefaultIcon;

const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => { if (center[0] && center[1]) map.flyTo(center, 15); }, [center, map]);
  return null;
};

const MapController = ({ onMapClick, locked }) => {
  const map = useMap();
  useEffect(() => {
    const controls = ['dragging', 'touchZoom', 'doubleClickZoom', 'scrollWheelZoom', 'boxZoom', 'keyboard'];
    controls.forEach(c => (locked ? map[c].disable() : map[c].enable()));
  }, [locked, map]);

  useMapEvents({ click: (e) => { if (!locked) onMapClick(e.latlng.lat, e.latlng.lng); } });
  return null;
};

const SettingsTimeMap = ({ 
  settings, handleChange, onSave, searchQuery, setSearchQuery, 
  searchResults, showDropdown, setShowDropdown, handleMapClick,
  getCurrentLocation, isLocating
}) => {
  const [mapLocked, setMapLocked] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  
  const currentPos = [
    parseFloat(settings?.latitude) || 11.25, 
    parseFloat(settings?.longitude) || 75.78
  ];

  const onMapInteraction = async (lat, lng) => {
    await handleMapClick(lat, lng, false);
    setHasChanges(true);
  };

  const handleCurrentLocationAction = async () => {
    await getCurrentLocation();
    setHasChanges(true);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500 w-full overflow-hidden">
      
      {/* 1. Time Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-gray-50/50 p-4 md:p-6 rounded-[2rem] md:rounded-3xl border border-gray-100">
        <EditableField 
            icon={Timer} 
            label="Opening Time" 
            type="time"
            value={settings?.openingTime} 
            onChange={(v) => handleChange('openingTime', v)} 
            onSave={onSave} 
        />
        <EditableField 
            icon={Timer} 
            label="Closing Time" 
            type="time"
            value={settings?.closingTime} 
            onChange={(v) => handleChange('closingTime', v)} 
            onSave={onSave} 
        />
      </div>

      <div className="space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Store Location</label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 min-w-[280px] md:flex-initial">
              <div className={`flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full md:w-80 shadow-sm transition-all ${mapLocked ? 'opacity-50 cursor-not-allowed' : 'focus-within:ring-2 focus-within:ring-orange-200'}`}>
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  className="text-xs font-bold outline-none w-full disabled:bg-transparent" 
                  placeholder="Search address..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  disabled={mapLocked} 
                />
                {!mapLocked && searchQuery && <X size={16} className="cursor-pointer text-gray-400 ml-2" onClick={() => setSearchQuery("")} />}
              </div>
              
              {showDropdown && searchResults.length > 0 && !mapLocked && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-2 rounded-2xl shadow-2xl z-[2000] max-h-60 overflow-y-auto">
                  {searchResults.map((res, i) => (
                    <button key={i} onClick={() => { 
                      onMapInteraction(parseFloat(res.lat), parseFloat(res.lon)); 
                      setSearchQuery(res.display_name); 
                      setShowDropdown(false); 
                    }} className="w-full text-left p-4 text-[11px] font-bold border-b border-gray-50 hover:bg-orange-50">
                      {res.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={() => setMapLocked(!mapLocked)} className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all flex-1 md:flex-initial whitespace-nowrap ${mapLocked ? 'bg-gray-100 text-gray-600' : 'bg-[#f9a602] text-white shadow-lg'}`}>
              {mapLocked ? <><Lock size={14} /> UNLOCK</> : <><Unlock size={14} /> LOCK MAP</>}
            </button>
          </div>
        </div>

        {/* 2. Map Container */}
        <div className="relative h-[350px] md:h-[450px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-inner group">
          <MapContainer center={currentPos} zoom={15} zoomControl={false} attributionControl={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
            <ChangeMapView center={currentPos} />
            <MapController locked={mapLocked} onMapClick={onMapInteraction} />
            <Marker position={currentPos} />
            <Circle center={currentPos} radius={(parseFloat(settings?.deliveryRadius) || 0) * 1000} pathOptions={{ color: '#f9a602', fillOpacity: 0.1 }} />
          </MapContainer>

          {!mapLocked && (
            <button 
              onClick={handleCurrentLocationAction} 
              className="absolute bottom-6 right-6 z-[1000] bg-white p-3.5 rounded-2xl shadow-2xl border border-gray-100 text-[#f9a602] hover:scale-110 active:scale-95 transition-all"
            >
              {isLocating ? <Loader2 size={22} className="animate-spin" /> : <Navigation2 size={22} fill="currentColor" />}
            </button>
          )}
          
          {mapLocked && (
            <div className="absolute inset-0 z-[1001] bg-black/[0.02] pointer-events-none flex items-center justify-center">
               <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 border border-gray-100">
                  <Lock size={12} className="text-gray-400" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">View Only Mode</span>
               </div>
            </div>
          )}
        </div>

        {/* 3. Address & Radius Side-by-Side with Center Save Button */}
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address Field */}
                <div className="p-4 md:p-5 bg-white rounded-[2rem] md:rounded-3xl border border-gray-100 shadow-xl flex items-center gap-4">
                    <div className="p-3 bg-orange-50 rounded-2xl shrink-0"><MapPin className="text-[#f9a602]" size={22} /></div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-[#f9a602] uppercase tracking-widest mb-1">Selected Address</p>
                        <p className="text-sm font-bold text-gray-800 leading-snug break-words">{settings?.address || "No address set"}</p>
                    </div>
                </div>

                {/* Radius Field (Now on the right side on desktop) */}
                <div className={`p-4 md:p-5 rounded-[2rem] md:rounded-3xl border transition-all ${!mapLocked ? 'bg-white border-[#f9a602] shadow-lg ring-4 ring-[#f9a602]/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl transition-colors ${!mapLocked ? 'bg-orange-100 text-[#f9a602]' : 'bg-white text-gray-400'}`}>
                            <Navigation2 size={20} />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                                Service Radius (KM)
                            </label>
                            <input 
                                type="number"
                                min="0" 
                                disabled={mapLocked}
                                value={settings?.deliveryRadius || 0}
                                onWheel={(e) => e.target.blur()} 
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (val < 0) {
                                        handleChange('deliveryRadius', 0);
                                    } else {
                                        handleChange('deliveryRadius', e.target.value);
                                    }
                                    setHasChanges(true);
                                }}
                                className={`w-full bg-transparent text-sm font-bold outline-none transition-all ${
                                    mapLocked ? 'text-gray-400' : 'text-gray-800'
                                }`}
                                placeholder="Enter radius in KM"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button - Centered below both fields */}
            {(hasChanges || !mapLocked) && (
                <div className="flex justify-center pt-2">
                    <button 
                        onClick={async () => { 
                            await onSave(); 
                            setHasChanges(false); 
                            setMapLocked(true); 
                        }} 
                        className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto min-w-[300px] px-12 py-4 rounded-2xl text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300"
                    >
                        <Check size={16} strokeWidth={3} /> SAVE CHANGES
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SettingsTimeMap;