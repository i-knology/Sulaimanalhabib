import { useTranslation } from "react-i18next";
import MemberCard from "./MemberCard";
import PermissionsCard from "./PermissionsCard";

export default function MemberData({userData}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between h-full">
      <MemberCard userData={userData}/>

      <div>
        <div>
          <p className="font-semibold my-2">{t("userPermissions")}</p>
          <div className="w-6 h-2 bg-secondary"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
          {Array.from({ length: 5 })
            .fill(null)
            .map(() => (
              <PermissionsCard />
            ))}
        </div>
      </div>
    </div>
  );
}
