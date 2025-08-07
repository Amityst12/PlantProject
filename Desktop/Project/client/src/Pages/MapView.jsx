import React, { useState, useEffect } from "react";
import { Droplets, Thermometer, AlertTriangle, MapPin, RadioTower, RefreshCw, Map } from "lucide-react";




// דאטה דמי - אפשר להחליף ב-API אמיתי בהמשך
const dummyMaps = [
  {
    id: "map1",
    name: "מפה ראשית",
    image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
];
const dummySensors = [
  { id: 1, name: "חיישן 1", type: "moisture", location_x: 30, location_y: 40 },
  { id: 2, name: "חיישן 2", type: "temperature", location_x: 65, location_y: 25 },
];
const dummyPlants = [
  { sensor_id: 1, watering_threshold: 30 },
];
const dummyMeasurements = [
  { sensor_id: 1, value: 28, unit: "%", timestamp: Date.now() },
  { sensor_id: 2, value: 21, unit: "°C", timestamp: Date.now() },
];

export default function MapView() {
  const [maps] = useState(dummyMaps);
  const [selectedMapId, setSelectedMapId] = useState(dummyMaps[0].id);
  const [sensors] = useState(dummySensors);
  const [plants] = useState(dummyPlants);
  const [measurements] = useState(dummyMeasurements);
  const [loading, setLoading] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  // פונקציות עזר
  const getLatestMeasurementForSensor = (sensorId) =>
    measurements.find((m) => m.sensor_id === sensorId);

  const getPlantForSensor = (sensorId) =>
    plants.find((p) => p.sensor_id === sensorId);

  const getSensorStatus = (sensor) => {
    const measurement = getLatestMeasurementForSensor(sensor.id);
    const plant = getPlantForSensor(sensor.id);
    if (!measurement) return "offline";
    if (sensor.type === "moisture" && plant) {
      return measurement.value < plant.watering_threshold ? "critical" : "good";
    }
    return "good";
  };

  const getSensorIcon = (sensor) => {
    const status = getSensorStatus(sensor);
    const baseClasses = "w-6 h-6 p-1.5 rounded-full border-2";
    switch (status) {
      case "critical":
        return sensor.type === "moisture" ? (
          <div className={`${baseClasses} bg-red-500 border-red-600 text-white`}>
            <Droplets className="w-full h-full" />
          </div>
        ) : (
          <div className={`${baseClasses} bg-orange-500 border-orange-600 text-white`}>
            <Thermometer className="w-full h-full" />
          </div>
        );
      case "good":
        return sensor.type === "moisture" ? (
          <div className={`${baseClasses} bg-blue-500 border-blue-600 text-white`}>
            <Droplets className="w-full h-full" />
          </div>
        ) : (
          <div className={`${baseClasses} bg-green-500 border-green-600 text-white`}>
            <Thermometer className="w-full h-full" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-gray-400 border-gray-500 text-white`}>
            <AlertTriangle className="w-full h-full" />
          </div>
        );
    }
  };

  const selectedMap = maps.find((m) => m.id === selectedMapId);

  return (
    <div className="p-4 lg:p-8 space-y-6" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">מפת קמפוס</h1>
          <p className="text-gray-600 mt-1">צפייה במיקום החיישנים ובמצב הצמחים</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedMapId}
            onChange={(e) => setSelectedMapId(e.target.value)}
            className="w-48 border border-gray-300 rounded px-2 py-1"
          >
            {maps.map((map) => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-1 bg-white border border-emerald-300 text-emerald-700 px-3 py-2 rounded shadow hover:bg-emerald-50"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 ml-1" />
            רענן
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-96 lg:h-[600px] rounded-xl">
            <div className="flex items-center gap-2 p-6">
              <Map className="w-5 h-5 text-emerald-600" />
              <span className="text-xl font-bold">{selectedMap?.name || "מפת קמפוס"}</span>
            </div>
            <div className="p-6 h-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  טוען...
                </div>
              ) : selectedMap ? (
                <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                  {selectedMap.image_url ? (
                    <img
                      src={selectedMap.image_url}
                      alt={selectedMap.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">מפה: {selectedMap.name}</p>
                      <p className="text-gray-500 text-sm mt-2">תמונת מפה לא זמינה</p>
                    </div>
                  )}

                  {/* סימון החיישנים על המפה */}
                  {sensors.map((sensor) => {
                    const measurement = getLatestMeasurementForSensor(sensor.id);
                    return (
                      <div
                        key={sensor.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          left: `${sensor.location_x}%`,
                          top: `${sensor.location_y}%`,
                        }}
                        onClick={() => setSelectedSensor(sensor)}
                      >
                        {getSensorIcon(sensor)}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {sensor.name}
                          {measurement && (
                            <div>
                              {measurement.value}
                              {measurement.unit}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">לא נמצאו מפות</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* מקרא */}
          <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-2 text-lg p-4">
              <Droplets className="w-5 h-5 text-blue-600" />
              מקרא
            </div>
            <div className="space-y-3 px-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">זקוק השקיה דחופה</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm">לחות תקינה</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">טמפרטורה תקינה</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span className="text-sm">לא מחובר</span>
              </div>
            </div>
          </div>

          {/* פרטי חיישן נבחר */}
          {selectedSensor && (
            <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-2 text-lg p-4">
                <RadioTower className="w-5 h-5 text-emerald-600" />
                פרטי חיישן
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedSensor.name}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedSensor.type === "moisture" ? "חיישן לחות קרקע" : "חיישן טמפרטורה"}
                  </p>
                </div>
                {(() => {
                  const measurement = getLatestMeasurementForSensor(selectedSensor.id);
                  const plant = getPlantForSensor(selectedSensor.id);
                  return measurement ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">מדידה אחרונה:</span>
                        <span className="font-bold text-lg">
                          {measurement.value}
                          {measurement.unit}
                        </span>
                      </div>
                      {plant && selectedSensor.type === "moisture" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">סף השקיה:</span>
                            <span className="text-sm">{plant.watering_threshold}%</span>
                          </div>
                          <div className={`w-full justify-center rounded py-1 px-2 text-center text-white ${measurement.value < plant.watering_threshold ? "bg-red-500" : "bg-green-500"}`}>
                            {measurement.value < plant.watering_threshold ? "זקוק השקיה" : "מצב תקין"}
                          </div>
                          {measurement.value < plant.watering_threshold && (
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 flex items-center justify-center gap-1">
                              <Droplets className="w-4 h-4 ml-2" />
                              השקיה ידנית
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">אין נתוני מדידה</p>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
