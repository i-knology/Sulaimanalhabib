import { getMembers } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Drawer, Form, Image, List, Radio, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormBtn from "../ui/FormBtn";
import SearchBox from "../ui/SearchBox";

export default function MembersForm({ onMemberClick, isOpen, onClose }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [search, setSearch] = useState<string | undefined>();
  const { data: members = [], isFetching } = useQuery({
    queryKey: ["members", search],
    queryFn: async () => {
      const response = await getMembers({
        PageIndex: 1,
        PageSize: 8,
        Name: search,
      });
      return response?.data;
    },
  });

  function handleFinish(values) {
    onMemberClick(values.userId);
    setSearch(undefined);
    onClose();
    form.resetFields(["userId"]);
  }

  return (
    <Drawer
      title={t("missionResponsibility")}
      open={isOpen}
      onClose={() => {
        setSearch(undefined);
        form.resetFields(["userId"]);
        onClose(false);
      }}
      placement="left"
      footer={
        <div className="w-full">
          <FormBtn
            form="select-mission-responsibility"
            text={t("save")}
            loading={false}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <SearchBox
          placeholder={t("missionResponsibility")}
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={search}
        />
        <Form
          id="select-mission-responsibility"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            name="userId"
            className="mb-0 w-full"
            required
          >
            <Radio.Group className="w-full">
              <List
                className="rounded-lg border border-gray-200 px-3 !w-full"
                dataSource={members}
                loading={isFetching}
                renderItem={(item: any) => {
                  return (
                    <List.Item className="border-t border-t-gray-200 first:border-t-0 cursor-pointer py-3">
                      <Radio value={item.id}>
                        <div className="flex items-center gap-3 w-full">
                          <Image
                            src={item?.profilePicture}
                            alt={item?.fullName}
                            fallback="/profile.png"
                            sizes="small"
                            width={40}
                            height={40}
                            className="w-full rounded-full object-fill"
                            preview={false}
                          />
                          <div className="flex-1">
                            <Typography className="font-medium">{item.name}</Typography>
                            <Typography.Paragraph className="!mb-0">
                              {item.email}
                            </Typography.Paragraph>
                          </div>
                        </div>
                      </Radio>
                    </List.Item>
                  );
                }}
              />
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
