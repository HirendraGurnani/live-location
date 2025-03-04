// /* FindMe.js */
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const FindMe = () => {
//     const [searchParams] = useSearchParams();
//     const latitude = parseFloat(searchParams.get("latitude"));
//     const longitude = parseFloat(searchParams.get("longitude"));
//     const [userLocation, setUserLocation] = useState(null);

//     useEffect(() => {
//         navigator.geolocation.watchPosition((position) => {
//             setUserLocation({
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             });
//         });
//     }, []);

//     useEffect(() => {
//         const map = new window.google.maps.Map(document.getElementById("map"), {
//             center: { lat: latitude, lng: longitude },
//             zoom: 15,
//         });

//         new window.google.maps.Marker({
//             position: { lat: latitude, lng: longitude },
//             map: map,
//         });

//         if (userLocation) {
//             new window.google.maps.Marker({
//                 position: userLocation,
//                 map: map,
//                 icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             });
//             map.panTo(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
//         }
//     }, [latitude, longitude, userLocation]);

//     return <div id="map" style={{ height: "100vh", width: "100%" }} />;
// };

// export default FindMe;