import { Divider, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { HiOutlineUserGroup } from "react-icons/hi2";
import DisplayIcon from "../ui/DisplayIcon";
import HrDivider from "../ui/HrDivider";
import CommitteeStatus from "./CommitteeStatus";

export default function DataAboutCommittee({ data }) {
  const { i18n } = useTranslation();
  return (
    <div className="rounded-lg bg-white p-4 ">
      <div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <label className="flex gap-2 items-center !mb-0 text-base ">
              <DisplayIcon bgColor="#22baed">
                <HiOutlineUserGroup size={24} color="#22baed" />
              </DisplayIcon>

              {data?.title}
            </label>
          </div>
          <div>
            <CommitteeStatus committee={data} />
          </div>
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          {data?.description}
        </Typography.Paragraph>
        <Divider className="my-2 border-semiGray" />

        <div className="flex items-center justify-between ">
          <div className="w-full">
            <div>
              <span className="text-primary">
                {i18n.language == "ar"
                  ? data?.members?.filter((member) => member?.typeId == 1)?.[0]
                      ?.typeLookupInfo?.nameAr
                  : data?.members?.filter((member) => member?.typeId == 1)?.[0]
                      ?.typeLookupInfo?.nameEn}
              </span>
              <div className="flex items-center w-full my-2 gap-2">
                <Image
                  width={50}
                  src={
                    data?.members?.filter((member) => member?.typeId == 1)?.[0]
                      ?.userInfo?.profilePictureUrl
                  }
                  className=" rounded-full cursor-pointer"
                  alt=""
                />
                <p>
                  {
                    data?.members?.filter((member) => member?.typeId == 1)?.[0]
                      ?.userInfo?.name
                  }
                </p>
              </div>
            </div>
            <div className="my-2">
              <HrDivider />
            </div>
            <div>
              <span className="text-primary">
                {i18n.language == "ar"
                  ? data?.members?.filter((member) => member?.typeId == 2)?.[0]
                      ?.typeLookupInfo?.nameAr
                  : data?.members?.filter((member) => member?.typeId == 2)?.[0]
                      ?.typeLookupInfo?.nameEn}
              </span>
              <div className="flex items-center w-full my-2 gap-2">
                <Image
                  width={50}
                  src={
                    data?.members?.filter((member) => member?.typeId == 2)?.[0]
                      ?.userInfo?.profilePictureUrl
                  }
                  className=" rounded-full cursor-pointer"
                  alt=""
                />
                <p>
                  {
                    data?.members?.filter((member) => member?.typeId == 2)?.[0]
                      ?.userInfo?.name
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
