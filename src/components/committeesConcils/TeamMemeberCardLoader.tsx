import { Button } from "antd";
import Skeleton from "react-loading-skeleton";
import IconLoader from "../ui/IconLoader";

export default function TeamMemeberCardLoader() {
  return (
    <div className="my-1 ">
      <div className="flex items-center justify-between ">
        <div className="w-full">
          <div className="flex items-center w-full">
            <IconLoader />

            <div className="mx-2 w-full flex flex-col">
              <span>
                <Skeleton width={50} />
              </span>
              <span className="text-primary">
                <Skeleton width={50} />
              </span>
            </div>
          </div>
        </div>
        <Button loading={true} className="bg-red-50 text-red-700"></Button>
      </div>
      <div className="h-[1px] bg-semiGray w-full mt-2" />
    </div>
  );
}
