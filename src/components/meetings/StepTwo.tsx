import { getLocations } from "@/services/meetings";
import { Autocomplete, MarkerF } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select, Steps, Switch } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { LuLocateFixed, LuSearch } from "react-icons/lu";
import { TfiLocationPin } from "react-icons/tfi";
import TaskStatus from "../tasks/TaskStatus";
import GoogleMapWithCurrentLocation from "../ui/Map";

function StepTwo({ nextStep, formDataCollector, previousStep }) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [isBrowser, setIsBrowser] = useState<string>("");
  const [selectFromMap, setSelectFromMap] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const toggleButton = (type: string) =>
    setSelectedButtons((prev) =>
      prev.includes(type) ? prev.filter((btn) => btn !== type) : [...prev, type],
    );

  const handleVirtualMeeting = (value: number) =>
    setSelectedButton((prev) => (prev === value ? null : value));
  const closeModal = () => setOpen(false);

  const { data: locations, isFetching: isLocationLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const locationsItems = useMemo(
    () =>
      locations?.data?.items?.map((item) => ({
        label: i18n.language === "ar" ? item?.name : item?.nameEn,
        value: item?.id,
      })) ?? [],
    [locations, i18n.language],
  );

  const getButtonClass = (condition: boolean) =>
    `w-full bg-semiGray rounded-lg py-2 text-base ${
      condition
        ? "border-solid border-secondary border-[1px] bg-white text-black"
        : "border-solid border-semiGray border-[1px] text-content"
    }`;

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 37.7749, lng: -122.4194 });
  const [locationName, setLocationName] = useState<string>("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
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

  const getLocationName = (lat: number | undefined, lng: number | undefined) => {
    if (!lat || !lng) {
      return 0;
    }
    const geocoder = new google.maps.Geocoder();

    // Create a LatLng object
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        // Extract address components
        const addressComponents = results[0].address_components;

        // Filter for the specific address components
        const streetNumber = addressComponents.find((component) =>
          component.types.includes("street_number"),
        )?.long_name;
        const streetName = addressComponents.find((component) =>
          component.types.includes("route"),
        )?.long_name;
        const neighborhood = addressComponents.find((component) =>
          component.types.includes("neighborhood"),
        )?.long_name;
        const city = addressComponents.find((component) =>
          component.types.includes("locality"),
        )?.long_name;
        const state = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1"),
        )?.long_name;
        const country = addressComponents.find((component) =>
          component.types.includes("country"),
        )?.long_name;

        const detailedAddress = [
          streetNumber ? streetNumber : "",
          streetName ? streetName : "",
          neighborhood ? neighborhood : "",
          city ? city : "",
          state ? state : "",
          country ? country : "",
        ]
          .filter(Boolean)
          .join(", ");
        setLocationName(detailedAddress);
      } else {
        setLocationName("Location not found");
      }
    });
  };

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
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

  const handleFinish = (values: any) => {
    values.IsOnline = selectedButtons.includes("virtualMeeting");
    values.Meet_Place = values.Meet_Place?.label;
    if (location) {
      values.Meet_Place = locationName;
    }

    formDataCollector(values);
    if (nextStep) nextStep();
  };

  return (
    <>
      <TaskStatus
        icon={
          <FaMagnifyingGlassLocation
            color="gray"
            size={24}
          />
        }
        status="meetingLocation"
        text="enterMeetingLocation"
      />
      <div className="my-4">
        <Steps
          responsive={false}
          current={2}
          progressDot={() => <span style={{ display: "none" }} />}
          items={Array(5).fill({ title: "" })}
        />
        <Form
          form={form}
          onFinish={handleFinish}
          className="space-y-4 my-2"
          layout="vertical"
        >
          {/* Meeting Type Section */}
          <Form.Item className="mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <button
                onClick={() => toggleButton("inPerson")}
                type="button"
                className={getButtonClass(selectedButtons.includes("inPerson"))}
              >
                {t("inPerson")}
              </button>
              <button
                onClick={() => toggleButton("virtualMeeting")}
                type="button"
                className={getButtonClass(selectedButtons.includes("virtualMeeting"))}
              >
                {t("virtualMeeting")}
              </button>
            </div>
          </Form.Item>

          {/* In-Person Meeting Section */}
          {selectedButtons.includes("inPerson") && (
            <div className="mt-2 w-full">
              <div className="flex items-center justify-between">
                <label
                  className="font-semibold"
                  htmlFor="Meet_Place"
                >
                  {t("meetingLocationInPerson")}
                </label>

                <p className="flex items-center gap-2">
                  <span>{t("locationFromMap")}</span>
                  <Switch
                    defaultChecked
                    onChange={(value) => {
                      setSelectFromMap(value);
                    }}
                  />
                </p>
              </div>

              <Form.Item
                name="Meet_Place"
                noStyle
              >
                {selectFromMap ? (
                  <div className="flex items-center">
                    <Input
                      className="w-full mt-2"
                      placeholder={t("locationFromMap")}
                      variant="filled"
                      readOnly
                      value={locationName}
                      onClick={() => {
                        setOpen(true);
                      }}
                      suffix={
                        <span
                          onClick={() => {
                            setOpen(true);
                          }}
                          className="text-secondary cursor-pointer"
                        >
                          <TfiLocationPin size={24} />
                        </span>
                      }
                    />
                  </div>
                ) : (
                  <Select
                    className="w-full mt-2"
                    placeholder={t("virtualLocations")}
                    labelInValue
                    suffixIcon={
                      <FaChevronDown
                        color="#88CB60"
                        size={20}
                      />
                    }
                    variant="filled"
                    disabled={isLocationLoading}
                    options={locationsItems}
                  />
                )}
              </Form.Item>
            </div>
          )}

          {/* Virtual Meeting Section */}
          {selectedButtons.includes("virtualMeeting") && (
            <Form.Item
              className="mb-0"
              label={t("virtualMeeting")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                {[1, 2, 3].map((id) => (
                  <button
                    key={id}
                    onClick={() => handleVirtualMeeting(id)}
                    type="button"
                    className={getButtonClass(selectedButton === id)}
                  >
                    {t(["webex", "connectFrom", "other"][id - 1])}
                  </button>
                ))}
              </div>
            </Form.Item>
          )}

          {/* Virtual Meeting Details */}
          {selectedButton === 1 && (
            <Form.Item
              name="MeetingURL"
              className="mb-0"
              label={t("secureMeetingPlace")}
            >
              <Input
                placeholder="https://www.webex.com/meet"
                variant="filled"
              />
            </Form.Item>
          )}
          {selectedButton === 2 && (
            <Form.Item
              className="mb-0"
              label={t("secureMeetingPlace")}
            >
              <div className="grid gap-2">
                <button
                  onClick={() => setIsBrowser("contactPoints")}
                  type="button"
                  className={getButtonClass(isBrowser === "contactPoints")}
                >
                  {t("contactPoints")}
                </button>
                <button
                  onClick={() => setIsBrowser("browser")}
                  type="button"
                  className={getButtonClass(isBrowser === "browser")}
                >
                  {t("browser")}
                </button>
              </div>
              {isBrowser === "browser" && (
                <Form.Item
                  name="MeetingSecretUrl"
                  className="my-2"
                >
                  <Input
                    placeholder={t("meetingLink")}
                    variant="filled"
                  />
                </Form.Item>
              )}
              {(isBrowser === "browser" || isBrowser === "contactPoints") && (
                <>
                  <Form.Item
                    name="MeetingSecretNumber"
                    className="my-2"
                  >
                    <Input
                      placeholder={t("meetingNumber")}
                      variant="filled"
                    />
                  </Form.Item>
                  <Form.Item
                    name="MeetingSecretId"
                    className="mb-2"
                  >
                    <Input.Password
                      placeholder={t("cpassword")}
                      variant="filled"
                    />
                  </Form.Item>
                </>
              )}
            </Form.Item>
          )}
          {selectedButton === 3 && (
            <Form.Item
              name="MeetingURL"
              className="mb-0"
              label={t("secureMeetingPlace")}
            >
              <Input
                placeholder="https://meet.google.com/"
                variant="filled"
              />
            </Form.Item>
          )}

          <div className="flex gap-4">
            <Button
              className="w-full border-none text-black bg-gray-200"
              onClick={previousStep}
            >
              {i18n.language === "ar" ? <GrLinkNext size={20} /> : <GrLinkPrevious size={20} />}
              {t("previous")}
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("next")}
              {i18n.language === "ar" ? <GrLinkPrevious size={20} /> : <GrLinkNext size={20} />}
            </Button>
          </div>
        </Form>
      </div>

      {/* maps */}
      <Modal
        // closeIcon={""}
        footer={
          <div className="w-full p-3">
            <Button
              onClick={() => {
                if (location) getLocationName(location.lat, location.lng);
                closeModal();
              }}
              type="primary"
              className="w-full"
              icon={<LuLocateFixed size={20} />}
            >
              {t("saveLocation")}
            </Button>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        closeIcon={false}
      >
        <div className="h-[70vh] w-full overflow-hidden  p-0 m-0 rounded-lg">
          <GoogleMapWithCurrentLocation center={location}>
            <div className="p-3 relative">
              <Autocomplete
                onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
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
        </div>
      </Modal>
    </>
  );
}

export default StepTwo;
