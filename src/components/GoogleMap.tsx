import { Autocomplete, MarkerF } from "@react-google-maps/api";
import { Button, Input } from "antd";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { LuLocateFixed, LuSearch } from "react-icons/lu";
import GoogleMapWithCurrentLocation from "./ui/Map";

export default function GoogleMap() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 37.7749, lng: -122.4194 });
  const [_locationName, _setLocationName] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>(currentLocation);
  const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const handlePlaceChanged = () => {
    if (autocomplete.current) {
      const place = autocomplete.current.getPlace();
      console.log(place);

      if (!place.geometry || !place.geometry.location) {
        console.error("No geometry found for the selected place.");
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
    }
  };

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  return (
    <GoogleMapWithCurrentLocation center={location}>
      <div className="p-3 relative">
        <Autocomplete
          onLoad={(autocompleteInstance) => {
            autocomplete.current = autocompleteInstance;
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{
            types: ["geocode"],
            componentRestrictions: { country: "sa" },
          }}
        >
          <Input
            prefix={
              <LuSearch
                size={20}
                className="text-gray-600"
              />
            }
            placeholder={t("findLocationOnMap")}
          />
        </Autocomplete>
      </div>

      <MarkerF
        position={location}
        icon={{
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            `<svg width="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green">
               <path d="M12 2C8.1 2 5 5.1 5 9c0 3.3 5 10.2 6.6 12.5.2.3.5.5.8.5s.6-.2.8-.5C14 19.2 19 12.3 19 9c0-3.9-3.1-7-7-7zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
             </svg>`,
          )}`,
        }}
        options={{
          clickable: true,
        }}
        draggable
        onDragEnd={(e) => {
          setLocation({
            lat: e.latLng?.lat() as number,
            lng: e.latLng?.lng() as number,
          });
        }}
      />

      <Button
        type="default"
        icon={<LuLocateFixed size={20} />}
        size="small"
        className="text-sm rounded-full px-3 mx-3"
        onClick={getCurrentLocation}
      >
        {t("currentLocation")}
      </Button>
    </GoogleMapWithCurrentLocation>
  );
}
