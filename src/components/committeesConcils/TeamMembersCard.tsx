import { Image } from "antd";
import { useTranslation } from "react-i18next";

export interface Member {
  id?: string;
  userInfo: {
    id: string;
    name: string;
    profilePictureUrl: string;
  };
  typeLookupInfo: {
    nameAr: string;
    nameEn: string;
  };
}


export default function TeamMemberCard({ member }) {
  const { i18n } = useTranslation();

  return (
    <div className="my-1 ">
      <div className="flex items-center justify-between ">
        <div className="w-full">
          <div className="flex items-center w-full">
            <Image
              width={50}
              src={member?.userInfo?.profilePictureUrl}
              className=" rounded-full cursor-pointer"
              alt=""
            />

            <div className="mx-2 w-full flex flex-col">
              <span>{member?.userInfo?.name}</span>
              <span className="text-primary">
                {i18n.language == "ar"
                  ? member?.typeLookupInfo?.nameAr
                  : member?.typeLookupInfo?.nameEn}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-semiGray w-full mt-2" />
    </div>
  );
}
