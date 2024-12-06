import { Divider, List } from "antd";
import Skeleton from "react-loading-skeleton";
import Card from "../ui/Card";
import StatusLoader from "../ui/StatusLoader";

export default function CardLoading() {
  return (
    <div>
      <Card>
        <div className="flex gap-2 items-center">
          <StatusLoader />
          <StatusLoader />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton circle={true} width={35} height={35} />
          <Skeleton width={70} height={20} />
          <span className="flex-1"></span>
        </div>
        <Skeleton count={3} height={20} />

        <Divider className="my-4 border-gray-100" />

        <List>
          <List.Item className="gap-3 !justify-start !p-0">
            <Skeleton circle={true} width={35} height={35} />
            <Skeleton width={100} height={20} />
          </List.Item>
          <List.Item className="gap-3 !justify-start !p-0 mt-4">
            <Skeleton circle={true} width={35} height={35} />
            <Skeleton width={100} height={20} />
          </List.Item>
        </List>
      </Card>
    </div>
  );
}
