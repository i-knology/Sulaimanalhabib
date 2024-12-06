import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import IconLoader from "../ui/IconLoader";
import StatusLoader from "../ui/StatusLoader";

export default function ProjectDataLoader() {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg bg-white p-4 min-h-full">
      <div className="">
        <div className="flex justify-between items-center gap-10">
          <div>
            <label className="flex gap-2 items-center !mb-0 text-base ">
              <IconLoader />

              <Skeleton width={100} />
            </label>
          </div>
          <div>
            <StatusLoader />
          </div>
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          <Skeleton count={3} />
        </Typography.Paragraph>
        <Divider className="my-4 border-semiGray" />

        <List>
          <List.Item className="gap-3 !justify-start !p-0">
            <IconLoader />

            <div className="flex flex-col gap-1">
              <Typography className="text-content">
                {t("departmentName")}
              </Typography>
              <Typography>
                <Skeleton width={100} />
              </Typography>
            </div>
          </List.Item>

          <div className="grid grid-cols-2 my-3">
            <div className="!p-0 flex gap-2">
              <IconLoader />
              <div className="flex flex-col gap-1">
                <Typography className="text-content">
                  {t("startsAt")}
                </Typography>
                <Typography>
                  <Skeleton width={80} />
                </Typography>
              </div>
            </div>
            <div className="!p-0 flex gap-2">
              <IconLoader />
              <div className="flex flex-col gap-1">
                <Typography className="text-content">{t("endsAt")}</Typography>
                <Typography>
                  <Skeleton width={80} />
                </Typography>
              </div>
            </div>
          </div>
        </List>
      </div>
    </div>
  );
}
