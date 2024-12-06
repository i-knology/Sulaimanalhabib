import { Divider, Typography } from "antd";
import Skeleton from "react-loading-skeleton";
import HrDivider from "../ui/HrDivider";
import IconLoader from "../ui/IconLoader";
import StatusLoader from "../ui/StatusLoader";

export default function CommitteeDataLoader() {
  return (
    <div className="rounded-lg bg-white p-4 ">
      <div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <label className="flex gap-2 items-center !mb-0 text-base ">
              <IconLoader />

              <Skeleton width={80} />
            </label>
          </div>
          <div>
            <StatusLoader />
          </div>
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          <Skeleton count={2.5} />
        </Typography.Paragraph>
        <Divider className="my-2 border-semiGray" />

        <div className="flex items-center justify-between ">
          <div className="w-full">
            <div>
              <span className="text-primary">
                <Skeleton width={80} />
              </span>
              <div className="flex items-center w-full my-2 gap-2">
                <IconLoader />
                <p>
                  <Skeleton width={80} />
                </p>
              </div>
            </div>
            <div className="my-2">
              <HrDivider />
            </div>
            <div>
              <span className="text-primary">
                <Skeleton width={80} />
              </span>
              <div className="flex items-center w-full my-2 gap-2">
                <IconLoader />
                <p>
                  <Skeleton width={80} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
