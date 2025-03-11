import React, { useState, useEffect } from "react";

const url = () => {
  let [pathname, setPathname] = useState("");
  let [senderLoc, setSenderLoc] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSenderLoc({ lat: latitude, lng: longitude });
    });
  });
  let generateUrl = () => {
    let getUrl = window.location.origin;
    console.log(`The full URL is: ${getUrl}`);
    setPathname(
      `${getUrl}/findme?latitude=${senderLoc.lat}&longitude=${senderLoc.lng}`
    );
  };

  return (
    <>
      <div className="container m-5">
        <button className="btn btn-info" onClick={generateUrl}>
          Generate URL
        </button>
        <div>{pathname}</div>
      </div>
    </>
  );
};
// lat 22.700439
// long 75.863411

export default url;
