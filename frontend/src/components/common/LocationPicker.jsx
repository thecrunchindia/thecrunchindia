import React, { useEffect, useCallback } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Loader2, MapPin, Search, X } from "lucide-react";
import { useLocationPicker } from "../../hooks/useLocationPicker";

const ChangeMapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 15);
    }, [center, map]);
    return null;
};

const LocationMarker = ({ setPosition }) => {
    const map = useMap();
    useMapEvents({
        dragend() {
            const center = map.getCenter();
            setPosition({ lat: center.lat, lng: center.lng });
        },
    });
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] z-[999] pointer-events-none">
            <MapPin size={40} className="text-black/50 fill-primary  drop-shadow-lg" />
        </div>
    );
};

const LocationPicker = ({ initialPos, onConfirm, isLocating, getCurrentLocation }) => {
    const {
        position,
        details,
        searchResults,
        isSearching,
        updatePosition,
        handleSearch,
        setSearchResults
    } = useLocationPicker(initialPos);

    const [searchQuery, setSearchQuery] = React.useState("");

    useEffect(() => {
        updatePosition(position);
    }, [position, updatePosition]);

    const onSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const onSelectResult = (res) => {
        const newPos = { lat: parseFloat(res.lat), lng: parseFloat(res.lon) };
        updatePosition(newPos);
        setSearchResults([]);
        setSearchQuery("");
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Search Bar Overlay */}
            <div className="absolute top-4 left-4 right-4 z-[1001] space-y-2">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                        {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                    </div>
                    <input
                        type="text"
                        placeholder="Search for area, street name..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        className="w-full pl-12 pr-10 py-3.5 bg-white placeholder:text-gray-600 rounded-2xl shadow-xl border-none focus:ring-2 focus:ring-primary text-sm font-medium outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            <X size={18} className="text-gray-800" />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden max-h-60 overflow-y-auto">
                        {searchResults.map((res) => (
                            <button
                                key={res.place_id}
                                onClick={() => onSelectResult(res)}
                                className="w-full p-4 text-left hover:bg-gray-50 border-b last:border-none flex flex-col gap-0.5"
                            >
                                <span className="text-sm font-bold text-gray-800 truncate">{res.display_name.split(',')[0]}</span>
                                <span className="text-[10px] text-gray-500 truncate">{res.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Section */}
            <div className="relative flex-1">
                <MapContainer center={position} zoom={15} className="h-full w-full" zoomControl={false} attributionControl={false}>
                    <TileLayer
                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    />
                    <ChangeMapView center={position} />
                    <LocationMarker setPosition={(pos) => updatePosition(pos)} />
                </MapContainer>

                <button
                    type="button"
                    onClick={async () => {
                        const loc = await getCurrentLocation();
                        if (loc) updatePosition({ lat: loc.latitude, lng: loc.longitude });
                    }}
                    className="absolute bottom-6 right-6 z-[1000] p-3 bg-white rounded-full shadow-2xl border text-primary  active:scale-90 transition-transform"
                >
                    {isLocating ? <Loader2 className="animate-spin" size={20} /> : <Navigation size={20} className=" stroke-black stroke-[0.5] text-primary  fill-primary" />}
                </button>
            </div>

            {/* Confirmation Bottom Sheet */}
            <div className="p-6 space-y-4 bg-white border-t border-gray-800 rounded-t-[30px] -mt-6 z-[1001] shadow-2xl">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border shadow-xl">
                    <MapPin className="text-primary mt-1 shrink-0" size={18} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold  text-primary uppercase tracking-wide">Selected Location</span>
                        <p className="text-[11px] font-bold text-gray-700 leading-tight uppercase tracking-wide">
                            {details.address}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onConfirm({
                        lat: position.lat,
                        lng: position.lng,
                        address: details.address,
                        pincode: details.pincode
                    })}
                    className="cursor-pointer w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-transform"
                >
                    Confirm Location
                </button>
            </div>
        </div>
    );
};

export default LocationPicker;