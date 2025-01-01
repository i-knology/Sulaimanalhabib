import { Image, List, Typography } from "antd";

export default function CourseAttendeeList({ users, onAttendeeClick }) {
  return (
    <List
      dataSource={users}
      renderItem={(item: any) => (
        <List.Item
          key={item.userId}
          className="first:pt-0 last:pb-0"
          onClick={onAttendeeClick}
        >
          <div className="flex gap-3 items-center">
            <Image
              width={35}
              height={35}
              className="rounded-full object-cover"
              preview={false}
              src={item.avatar}
              fallback="/profile.png"
            />
            <div>
              <Typography.Paragraph className="font-semibold text-sm !mb-0">
                {item.username}
              </Typography.Paragraph>
              <Typography.Paragraph className="!mb-0">{item.email}</Typography.Paragraph>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}
