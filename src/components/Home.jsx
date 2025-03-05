/* Home.js */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [link, setLink] = useState("")
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // const { latitude, longitude } = position.coords;
            setLocation({ lat: 22.758940, lng: 75.891418 });
        });
    };

    const generateLink = () => {
        const link = `${window.location.origin}/findme?latitude=${location.lat}&longitude=${location.lng}`;
        setLink(link)
    };

    return (
        <div style={{width:"100%", textAlign:"center"}}>
            <h1>Home Page</h1>
            <button onClick={getLocation}>Get Location</button>
            <button onClick={generateLink} disabled={!location.lat}>Generate Link</button>
            <p>{link}</p>
        </div>
    );
};

export default Home;