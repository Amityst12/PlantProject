
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Map, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  Flower2,
  MapPin,
  RefreshCw,
  RadioTower
} from "lucide-react";

export default function MapView() {
  const [maps, setMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState("");
  const [sensors, setSensors] = useState([]);
  const [plants, setPlants] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    loadMapsAndData();
  }, []);

  useEffect(() => {
    if (selectedMapId) {
      loadSensorsForMap(selectedMapId);
    }
  }, [selectedMapId]);

  const loadMapsAndData = async () => {
    setLoading(true);
    try {
      const [mapsData, plantsData, measurementsData] = await Promise.all([
        base44.entities.Map.list(),
        base44.entities.Plant.list(),
        base44.entities.Measurement.list("-timestamp", 100)
      ]);
      
      setMaps(mapsData);
      setPlants(plantsData);
      setMeasurements(measurementsData);
      
      if (mapsData.length > 0) {
        setSelectedMapId(mapsData[0].id);
      }
    } catch (error) {
      console.error("Error loading maps data:", error);
    }
    setLoading(false);
  };

  const loadSensorsForMap = async (mapId) => {
    try {
      const sensorsData = await base44.entities.Sensor.filter({ map_id: mapId });
      setSensors(sensorsData);
    } catch (error) {
      console.error("Error loading sensors for map:", error);
    }
  };

  const getLatestMeasurementForSensor = (sensorId) => {
    return measurements.find(m => m.sensor_id === sensorId);
  };

  const getPlantForSensor = (sensorId) => {
    return plants.find(p => p.sensor_id === sensorId);
  };

  const getSensorStatus = (sensor) => {
    const measurement = getLatestMeasurementForSensor(sensor.id);
    const plant = getPlantForSensor(sensor.id);
    
    if (!measurement) return 'offline';
    if (sensor.type === 'moisture' && plant) {
      return measurement.value < plant.watering_threshold ? 'critical' : 'good';
    }
    return 'good';
  };

  const getSensorIcon = (sensor) => {
    const status = getSensorStatus(sensor);
    const baseClasses = "w-6 h-6 p-1.5 rounded-full border-2";
    
    switch(status) {
      case 'critical':
        return sensor.type === 'moisture' ? 
          <div className={`${baseClasses} bg-red-500 border-red-600 text-white`}>
            <Droplets className="w-full h-full" />
          </div> :
          <div className={`${baseClasses} bg-orange-500 border-orange-600 text-white`}>
            <Thermometer className="w-full h-full" />
          </div>;
      case 'good':
        return sensor.type === 'moisture' ?
          <div className={`${baseClasses} bg-blue-500 border-blue-600 text-white`}>
            <Droplets className="w-full h-full" />
          </div> :
          <div className={`${baseClasses} bg-green-500 border-green-600 text-white`}>
            <Thermometer className="w-full h-full" />
          </div>;
      default:
        return <div className={`${baseClasses} bg-gray-400 border-gray-500 text-white`}>
          <AlertTriangle className="w-full h-full" />
        </div>;
    }
  };

  const selectedMap = maps.find(m => m.id === selectedMapId);

  return (
    <div className="p-4 lg:p-8 space-y-6" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">מפת קמפוס</h1>
          <p className="text-gray-600 mt-1">צפייה במיקום החיישנים ובמצב הצמחים</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedMapId} onValueChange={setSelectedMapId}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="בחר מפה" />
            </SelectTrigger>
            <SelectContent>
              {maps.map((map) => (
                <SelectItem key={map.id} value={map.id}>
                  {map.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => loadMapsAndData()}>
            <RefreshCw className="w-4 h-4 ml-2" />
            רענן
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-96 lg:h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-emerald-600" />
                {selectedMap?.name || "מפת קמפוס"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-64 w-full" />
                  </div>
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
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">מפה: {selectedMap.name}</p>
                        <p className="text-gray-500 text-sm mt-2">תמונת מפה לא זמינה</p>
                      </div>
                    </div>
                  )}
                  
                  {sensors.map((sensor) => {
                    const measurement = getLatestMeasurementForSensor(sensor.id);
                    return (
                      <div
                        key={sensor.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          left: `${sensor.location_x || Math.random() * 80 + 10}%`,
                          top: `${sensor.location_y || Math.random() * 80 + 10}%`
                        }}
                        onClick={() => setSelectedSensor(sensor)}
                      >
                        {getSensorIcon(sensor)}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {sensor.name}
                          {measurement && (
                            <div>
                              {measurement.value}{measurement.unit}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">לא נמצאו מפות</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="w-5 h-5 text-blue-600" />
                מקרא
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
            </CardContent>
          </Card>

          {selectedSensor && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RadioTower className="w-5 h-5 text-emerald-600" />
                  פרטי חיישן
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedSensor.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedSensor.type === 'moisture' ? 'חיישן לחות קרקע' : 'חיישן טמפרטורה'}
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
                            {measurement.value}{measurement.unit}
                          </span>
                        </div>
                        {plant && selectedSensor.type === 'moisture' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">סף השקיה:</span>
                              <span className="text-sm">{plant.watering_threshold}%</span>
                            </div>
                            <Badge 
                              variant={measurement.value < plant.watering_threshold ? "destructive" : "default"}
                              className="w-full justify-center"
                            >
                              {measurement.value < plant.watering_threshold ? 'זקוק השקיה' : 'מצב תקין'}
                            </Badge>
                            {measurement.value < plant.watering_threshold && (
                              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                                <Droplets className="w-4 h-4 ml-2" />
                                השקיה ידנית
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">אין נתוני מדידה</p>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
