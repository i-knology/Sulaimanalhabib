import { Divider, List, Typography } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../ui/Card";
import StatusLoader from "../ui/StatusLoader";

export default function CardLoader() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Skeleton circle={true} width={35} height={35} />

        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="!mb-0 text-base"
        >
          <Skeleton width={100} />
        </Typography.Paragraph>
        <span className="flex-1"></span>

        <StatusLoader/>

      </div>
      <Typography.Paragraph className="mt-3 text-content">
        <Skeleton count={3} />
      </Typography.Paragraph>
      <Divider className="my-4 border-gray-100" />
      <List>
        <List.Item className="gap-3 !justify-start !p-0">
          <Skeleton circle={true} width={35} height={35} />

          <Typography>{<Skeleton width={80} />}</Typography>
        </List.Item>
        <List.Item className="gap-3 !justify-start !p-0 mt-4">
          <Skeleton circle={true} width={35} height={35} />

          <Typography>
            <Skeleton width={120} />
          </Typography>
        </List.Item>
      </List>
    </Card>
  );
}
