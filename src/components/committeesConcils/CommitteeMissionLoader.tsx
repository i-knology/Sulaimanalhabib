import { Button, Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import CommentsLoader from "../ui/CommentsLoader";
import IconLoader from "../ui/IconLoader";
import TeamMemeberCardLoader from "./TeamMemeberCardLoader";

export default function CommitteeMissionLoader() {
  const { t } = useTranslation();
  return (
    <div className="min-h-full">
      <div className="border rounded-lg mb-4 p-2">
        <div className="p-0 border-none rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <IconLoader />
            <Skeleton width={60} />
          </div>
          <Skeleton count={1.5} />

          <Divider className="my-2 border-semiGray" />

          <div className="grid grid-cols-2">
            <div className="flex gap-2 items-center">
              <IconLoader />
              <Skeleton width={50} />
            </div>

            <div className="flex gap-2 items-center">
              <IconLoader />
              <Skeleton width={50} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <Typography.Text className="text-base">
            {t("taskTeam")}
          </Typography.Text>
          <div className="h-1 w-[10%] bg-primary bg-gradient-to-b from-primary/[0.92] to-secondary/[0.92] rounded-xl" />
        </div>

        <div className="my-2">
          {Array.from({ length: 1 })
            .fill(null)
            .map((_, idx) => {
              return <TeamMemeberCardLoader key={idx} />;
            })}
        </div>
      </div>

      <div className="bg-white my-4">
        <div className="flex gap-2 bg-semiGray p-1 rounded-lg">
          {["taskAttachments", "comments"].map((tab) => (
            <Button
              key={tab}
              disabled={true}
              className={`w-1/2 border-none ${
                true ? "text-black" : "bg-transparent"
              }`}
            >
              {t(tab)}
            </Button>
          ))}
        </div>
      </div>

      <CommentsLoader />
    </div>
  );
}
