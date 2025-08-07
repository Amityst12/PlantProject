
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  RadioTower as SensorsIcon, 
  Droplets, 
  Thermometer, 
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export default function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    loadSensorsData();
  }, []);

  const loadSensorsData = async () => {
    setLoading(true);
    try {
      const [sensorsData, measurementsData, plantsData] = await Promise.all([
        base44.entities.Sensor.list(),
        base44.entities.Measurement.list("-timestamp", 200),
        base44.entities.Plant.list()
      ]);
      
      setSensors(sensorsData);
      setMeasurements(measurementsData);
      setPlants(plantsData);
    } catch (error) {
      console.error("Error loading sensors data:", error);
    }
    setLoading(false);
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

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || sensor.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getSensorIcon = (type) => {
    return type === 'moisture' ? 
      <Droplets className="w-5 h-5 text-blue-600" /> :
      <Thermometer className="w-5 h-5 text-orange-600" />;
  };

  const getStatusBadge = (sensor) => {
    const status = getSensorStatus(sensor);
    switch(status) {
      case 'critical':
        return <Badge variant="destructive">זקוק השקיה</Badge>;
      case 'good':
        return <Badge variant="default" className="bg-green-100 text-green-800">תקין</Badge>;
      default:
        return <Badge variant="secondary">לא מחובר</Badge>;
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">חיישנים</h1>
          <p className="text-gray-600 mt-1">ניהול ומעקב אחר חיישני הקמפוס</p>
        </div>
        <Button variant="outline" onClick={loadSensorsData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
          רענן נתונים
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="חפש חיישנים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterType === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("all")}
          >
            הכל
          </Button>
          <Button 
            variant={filterType === "moisture" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("moisture")}
          >
            לחות
          </Button>
          <Button 
            variant={filterType === "temperature" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilterType("temperature")}
          >
            טמפרטורה
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredSensors.map((sensor) => {
          const measurement = getLatestMeasurementForSensor(sensor.id);
          const plant = getPlantForSensor(sensor.id);
          const status = getSensorStatus(sensor);

          return (
            <Card key={sensor.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSensorIcon(sensor.type)}
                    <CardTitle className="text-lg">{sensor.name}</CardTitle>
                  </div>
                  {getStatusBadge(sensor)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {sensor.type === 'moisture' ? 'לחות קרקע' : 'טמפרטורה'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {sensor.status === 'active' ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </div>

                  {measurement ? (
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${
                          status === 'critical' ? 'text-red-600' : 
                          status === 'good' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {measurement.value}{measurement.unit}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          עדכון: {format(new Date(measurement.timestamp), "HH:mm", { locale: he })}
                        </p>
                      </div>

                      {plant && sensor.type === 'moisture' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">צמח:</span>
                            <span className="font-medium">{plant.species}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">סף השקיה:</span>
                            <span>{plant.watering_threshold}%</span>
                          </div>
                          {measurement.value < plant.watering_threshold && (
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                              <Droplets className="w-4 h-4 ml-2" />
                              השקיה ידנית
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">אין נתוני מדידה</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSensors.length === 0 && !loading && (
        <div className="text-center py-12">
          <SensorsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">לא נמצאו חיישנים</h3>
          <p className="text-gray-500">נסה לשנות את הפילטרים או להוסיף חיישנים חדשים</p>
        </div>
      )}
    </div>
  );
}
