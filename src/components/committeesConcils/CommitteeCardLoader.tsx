import { Divider, Typography } from "antd";
import Skeleton from "react-loading-skeleton";
import Card from "../ui/Card";
import IconLoader from "../ui/IconLoader";
import StatusLoader from "../ui/StatusLoader";

export default function CommitteeCardLoader() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <IconLoader />
        <Typography.Paragraph
          ellipsis={{
            rows: 1,
          }}
          className="!mb-0 text-base"
        >
          <Skeleton width={100} />
        </Typography.Paragraph>
        <span className="flex-1"></span>
        <StatusLoader />
      </div>
      <Typography.Paragraph className="mt-2 text-content">
        <Skeleton count={1} />
      </Typography.Paragraph>
      <Divider className="my-2 border-gray-100" />

      <div className="flex items-center w-full">
        <IconLoader />

        <div className="mx-2 w-full flex flex-col">
          <span className="text-primary my-1">
            <Skeleton width={80} />
          </span>
          <span>
            <Skeleton width={100} />
          </span>
        </div>
      </div>

      <Divider className="my-2 border-gray-100" />
      <div className="grid grid-cols-2">
        <div className="flex gap-2 items-center">
          <IconLoader />
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </div>

        <div className="flex gap-2 items-center">
          <IconLoader />
          <Typography>
            <Skeleton width={100} />
          </Typography>
        </div>
      </div>
    </Card>
  );
}
