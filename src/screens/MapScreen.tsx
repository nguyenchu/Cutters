import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { BackHandler, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const MapScreen = () => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Lat: ', position.coords.latitude);
        console.log('Lng: ', position.coords.longitude);

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error: any) => console.error('Could not get location: ', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getLocation();
    console.log('Lat: ', latitude);
    console.log('Lng: ', longitude);
  }, []);

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

  return (

    <View style={styles.container}>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        googleMapId="3223b21e6635e866"
        initialRegion={{
          latitude: latitude ?? 50,
          longitude: longitude ?? 10,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
        // region={{latitude: latitude ?? 59.9,
        //   longitude: longitude ?? 10.7,
        //   latitudeDelta: 0.0,
        //   longitudeDelta: 0.0}}
        customMapStyle={mapStyle}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Makes it full-screen
  },
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
