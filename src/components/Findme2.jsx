import React, { useState, useEffect } from "react";
import {
  //   LoadScript,
  Polyline,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const FindMe = () => {
  let [dest, setDesti] = useState({ latitude: null, longitude: null });

  let [param] = useSearchParams();
  useEffect(() => {
    // console.log("**************",param.get("latitude"))
    // console.log("**************",param.get("longitude"))
    setDesti({
      latitude: parseFloat(param.get("latitude")),
      longitude: parseFloat(param.get("longitude")),
    });
  }, []);
  const [originP, setOriginP] = useState({ lat: null, lng: null });
  const [route, setRoute] = useState(null);
  const [polylinePath, setPolylinePath] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const latitude = parseFloat(searchParams.get("latitude"));
  const longitude = parseFloat(searchParams.get("longitude"));
  //   const [map, setMap] = useState()
  // console.log(location.pathname);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCk0htx320UYoMkyh-UiGkUY2c4jrNvsZg",
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  //   console.log(center);

  //   const [map, setMap] = useState(null);

  //   const [position, setPosition] = useState(null);

    useEffect(() => {
      if (!isLoaded) return;
      const fetchLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
console.log(position);

            setOriginP({ lat: position?.coords?.latitude, lng: position?.coords?.longitude });
            },
            (error) => console.error("Error fetching location:", error),
            { enableHighAccuracy: true }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      };

      fetchLocation(); // Initial call
      const interval = setInterval(fetchLocation, 3000); // Update every 5 seconds

      return () => clearInterval(interval);
    }, [isLoaded]);

  //   console.log(origin);

  //   useEffect(() => {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  // setPosition({
  //   lat: latitude,
  //   lng: longitude,
  // });
  //   });
  // }
  //   }, []);

  //   const onLoad = (mapInstance) => {
  //     setMap(mapInstance);
  //   };

  useEffect(() => {
    if (!isLoaded || !origin) return;
    const fetchRoute = async () => {
      try {
        const response = await axios.post(
          "https://routes.googleapis.com/directions/v2:computeRoutes",
          {
            origin: {
              location: {
                latLng: { latitude: originP.lat, longitude: originP.lng },
              },
            },
            destination: {
              location: {
                latLng: { latitude: dest.latitude, longitude: dest.longitude },
              },
            },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            computeAlternativeRoutes: false,
            routeModifiers: {
              avoidTolls: false,
              avoidHighways: false,
              avoidFerries: false,
            },
            languageCode: "en-US",
            units: "IMPERIAL",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": "AIzaSyCk0htx320UYoMkyh-UiGkUY2c4jrNvsZg",
              "X-Goog-FieldMask": "*",
            },
          }
        );

        const routeData = response.data.routes[0];
        setRoute(routeData);

        if (routeData) {
          const decodedPolyline = decodePolyline(
            routeData.polyline.encodedPolyline
          );
          setPolylinePath(decodedPolyline);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [isLoaded, originP]);

  // Function to decode the encoded polyline into an array of lat/lng points
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };
  //   const onLoad = (mapInstance) => {

  //     setMap(mapInstance);

  //   }
  if (!isLoaded) return <p>Loading map...</p>;
  return (
    // <LoadScript
    //   googleMapsApiKey="AIzaSyCk0htx320UYoMkyh-UiGkUY2c4jrNvsZg"
    //   libraries={["places"]}
    // >
    //   <GoogleMap
    //     mapContainerStyle={{ width: "100%", height: "400px" }}
    //     zoom={10}
    //     center={position || { lat: 37.783333, lng: -122.416667 }}
    //     onLoad={onLoad}
    //   >
    //     {position && <Marker position={position} />}
    //   </GoogleMap>
    // </LoadScript>
    <div
      className="google-container"
      style={{ width: "500px", height: "50vh" }}
    >
      {/* <h1>{dest.latitude}</h1>
        <h1>{dest.longitude}</h1> */}
      <GoogleMap
        mapContainerStyle={{ width: "375px", height: "100vh" }}
        center={center}
        zoom={13}
        // onLoad={onLoad}
      >
        {/* Start and End Markers */}
        {route && (
          <>
            <Marker
              position={{ lat: originP.lat, lng: originP.lng }}
              label="Start"
            />
            {/* {position && <Marker position={position} label="End" />} */}
            <Marker
              position={{ lat: dest.latitude, lng: dest.longitude }}
              label="End"
            />
          </>
        )}

        {/* Route Polyline */}
        {polylinePath.length > 0 && (
          <Polyline
            path={polylinePath}
            options={{
              strokeColor: "#ff0000",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default FindMe;

// <LoadScript googleMapsApiKey="AIzaSyCk0htx320UYoMkyh-UiGkUY2c4jrNvsZg">
// </LoadScript>
