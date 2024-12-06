import { GoogleMap, GoogleMapProps, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const libraries: ("drawing" | "geometry" | "places" | "visualization")[] = [
  "drawing",
  "places",
  "geometry",
];

interface GoogleMapWithCurrentLocationProps extends GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
}

const GoogleMapWithCurrentLocation: React.FC<GoogleMapWithCurrentLocationProps> = ({
  center,
  onClick,
  ...props
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY as string,
    libraries,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      options={{
        disableDefaultUI: true,
      }}
      center={center}
      onClick={onClick}
      {...props}
    ></GoogleMap>
  );
};

export default GoogleMapWithCurrentLocation;
