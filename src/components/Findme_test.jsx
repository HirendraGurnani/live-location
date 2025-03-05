import { useLocation } from "react-router-dom";

const FindMe = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    return (
        <div>
            <h1>Find Me</h1>
            {latitude && longitude ? (
                <p>Coordinates: {latitude}, {longitude}</p>
            ) : (
                <p>No coordinates provided.</p>
            )}
        </div>
    );
};

export default FindMe;
