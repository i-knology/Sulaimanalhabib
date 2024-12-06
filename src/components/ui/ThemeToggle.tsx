import HeaderButton from "./HeaderButton";
import { ReactNode } from "react";
import { TiWeatherSunny } from "react-icons/ti";


export default function ThemeToggle() {
  const icon: ReactNode = <TiWeatherSunny className="text-2xl"/>;
  return (
    <HeaderButton
      icon={icon}
      onClick={() => {
        return true;
      }}
    />
  );
}
