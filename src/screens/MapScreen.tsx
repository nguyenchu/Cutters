import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';


const MapScreen = () => {
  const [location, setLocation] = useState<Region | null>(null);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  useEffect(() => {
    requestLocation();
  });

  useEffect(() => {
    fetchSalons();
  });

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const requestLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => Alert.alert('Location Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
    );
  };

  const fetchSalons = async () => {
    try {
      const salonDummyData: Salon[] = [
        {
          id: 100,
          name: 'Cutters Triaden',
          address: 'Triaden Senter',
          coordinates: {
            latitude: 59.91902,
            longitude: 10.95295,
            // 59.91902102738273, 10.952950859493722
          },
        },
        {
          id: 101,
          name: 'Cutters Metro',
          address: 'Metro Senter',
          coordinates: {
            latitude: 59.92762,
            longitude: 10.95876,
            // 59.92762256530426, 10.958764738168265
            },
        },
      ];

      const response = await fetch('https://api.test.cutters.no/v2/salons');
      console.log('Response:', response);

      const data: Salon[] = await response.json();
      console.log('Data', data);

      const parsedSalons: Salon[] = data
      .filter((salon) => salon.coordinates)
      .map((salon) => ({
        id: salon.id,
        name: salon.name,
        address: salon.address,
        postalPlace: salon.postalPlace,
        coordinates: {
          latitude: Number(salon.coordinates.latitude),
          longitude: Number(salon.coordinates.longitude),
        },
      }));
      const allSalons = [...parsedSalons, ...salonDummyData];
      setSalons(allSalons);
      console.log('Salons:', salons);
    } catch (error) {
      console.error('Error fetching salons:', error);
    }
  };

  if (!location) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (

    <View style={styles.container}>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        googleMapId="7fbf2bf388db7d23"
        initialRegion={location}
        customMapStyle={mapStyle}
        zoomControlEnabled
        showsUserLocation>
            {salons.map((salon) => (
              <Marker
                key={salon.id}
                coordinate={salon.coordinates}
                title={salon.name}
                onPress={() => setSelectedSalon(salon)}
              />
            ))}
        </MapView>

      {selectedSalon && (
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{selectedSalon.name}</Text>
          <Text>{selectedSalon.address}, {selectedSalon.postalPlace}</Text>
        </View>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject, // Makes it full-screen
  },
  salonInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  salonName: { fontSize: 18, fontWeight: 'bold' },
});

const mapStyle = [
{
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#212121',
    },
  ],
},
{
  'elementType': 'labels.icon',
  'stylers': [
    {
      'visibility': 'off',
    },
  ],
},
{
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#757575',
    },
  ],
},
{
  'elementType': 'labels.text.stroke',
  'stylers': [
    {
      'color': '#212121',
    },
  ],
},
{
  'featureType': 'administrative',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#757575',
    },
  ],
},
{
  'featureType': 'administrative.country',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#9e9e9e',
    },
  ],
},
{
  'featureType': 'administrative.land_parcel',
  'stylers': [
    {
      'visibility': 'off',
    },
  ],
},
{
  'featureType': 'administrative.locality',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#bdbdbd',
    },
  ],
},
{
  'featureType': 'poi',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#757575',
    },
  ],
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#181818',
    },
  ],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#616161',
    },
  ],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels.text.stroke',
  'stylers': [
    {
      'color': '#1b1b1b',
    },
  ],
},
{
  'featureType': 'road',
  'elementType': 'geometry.fill',
  'stylers': [
    {
      'color': '#2c2c2c',
    },
  ],
},
{
  'featureType': 'road',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#8a8a8a',
    },
  ],
},
{
  'featureType': 'road.arterial',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#373737',
    },
  ],
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#3c3c3c',
    },
  ],
},
{
  'featureType': 'road.highway.controlled_access',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#4e4e4e',
    },
  ],
},
{
  'featureType': 'road.local',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#616161',
    },
  ],
},
{
  'featureType': 'transit',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#757575',
    },
  ],
},
{
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#000000',
    },
  ],
},
{
  'featureType': 'water',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#3d3d3d',
    },
  ],
},
];

export default MapScreen;
