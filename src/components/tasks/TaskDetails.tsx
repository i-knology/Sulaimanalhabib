import { Checkbox } from "antd";
import AboutUser from "./AboutUser";
import TaskAttachments from "./TaskAttachments";
import TaskRange from "./TaskRange";

export default function TaskDetails() {
  return (
    <>
      <AboutUser />

      <TaskRange />

      <div className="my-4 text-content flex flex-col gap-2">
        <div>
          <Checkbox
            style={{ textDecoration: "line-through" }}
            className="text-content"
          >
            لوريم إيبسوم طريقة لكتابة النصوص في النشر
          </Checkbox>
        </div>
        <div>
          <Checkbox className="text-content">
            لوريم إيبسوم طريقة لكتابة النصوص في النشر
          </Checkbox>
        </div>
        <div>
          <Checkbox className="text-content">
            لوريم إيبسوم طريقة لكتابة النصوص في النشر
          </Checkbox>
        </div>
        <div>
          <Checkbox className="text-content">
            لوريم إيبسوم طريقة لكتابة النصوص في النشر
          </Checkbox>
        </div>
      </div>

      <TaskAttachments />
    </>
  );
}
