import { getMembers, getSecertary } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select, Steps } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaUsers } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import TaskStatus from "../tasks/TaskStatus";

function StepThree({ nextStep, formDataCollector, previousStep ,members}) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  // Fetch data for different groups
  const { data: groups, isFetching: isFetchingGroups } = useQuery({
    queryKey: ["Groups"],
    queryFn: getSecertary,
  });

  const mapGroupMembers = (groupId) =>
    groups?.data?.items
      ?.find((group) => group.id === groupId)
      ?.members?.map((member) => ({
        label: member?.userInfo?.name,
        value: member?.userId,
      })) || [];

  const secertaries = mapGroupMembers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
  const management = mapGroupMembers("4ca85f64-5717-4562-b3fc-2c963f66afd5");
  const minister = mapGroupMembers("9a03004e-cc3f-47ac-ab8b-ae2b3efa8bb8");

  // Reusable hook for fetching filtered members
  const useMemberSearch = (queryKey) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data, refetch } = useQuery({
      queryKey: [queryKey],
      queryFn: () =>
        getMembers({ Name: searchTerm, PageSize: 12, PageIndex: 1 }),
    });

    return {
      options:
        data?.data?.map((member) => ({
          label: member.name,
          value: member.id,
        })) || [],
      onSearch: (value) => {
        setSearchTerm(value);
        refetch();
      },
      resetSearch: () => setSearchTerm(""),
    };
  };

  const ownerSearch = useMemberSearch("Owners");
  const writerSearch = useMemberSearch("Writers");

  const onFinish = (values) => {
    const allMembers: {
      userId: string;
      attendeTypeId: number;
      Title: string;
    }[] = [];

    const addMembers = (key, attendeTypeId) => {
      if (values[key]?.length) {
        values[key].forEach(({ value, label }) =>
          allMembers.push({ userId: value, attendeTypeId, Title: label })
        );
        delete values[key];
      }
    };

    // Collect members by their roles
    ["meetingWriter", "Minister"].forEach((key) =>
      values[key]?.value
        ? allMembers.push({
            userId: values[key].value,
            attendeTypeId: key === "meetingWriter" ? 2 : 1,
            Title: values[key].label,
          })
        : null
    );

    addMembers("administration", 1);
    addMembers("Secertary", 1);

    if (values.meetingOwner?.value) {
      allMembers.push({
        userId: values.meetingOwner.value,
        attendeTypeId: 3,
        Title: values.meetingOwner.label,
      });
      delete values.meetingOwner;
    }
    delete values.Minister;
    delete values.meetingWriter;
    values.MeetingAttendeesPerson = allMembers;
    formDataCollector(values);
    if (nextStep) nextStep();
  };

  console.log(members);
  
  //1	عضو
  //2	كاتب
  //3	طالب

  return (
    <>
      <TaskStatus
        icon={<FaUsers color="gray" size={24} />}
        status="meetingMembers"
        text="selectMeetingMembers"
      />
      <div className="my-4">
        <Steps
          className="w-5"
          responsive={false}
          current={3}
          progressDot={() => <span style={{ display: "none" }} />}
          items={Array(5).fill({ title: "" })}
        />

        <Form
          form={form}
          onFinish={onFinish}
          className="space-y-4 my-2"
          layout="vertical"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
              name="meetingOwner"
              label={t("meetingOwner")}
              className="mb-0"
            >
              <Select
                variant="filled"
                filterOption={false}
                suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                placeholder={`${t("meetingOwner")}...`}
                labelInValue
                showSearch
                onSearch={ownerSearch.onSearch}
                onChange={ownerSearch.resetSearch}
                options={ownerSearch.options}
              />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
              name="meetingWriter"
              label={t("meetingWriter")}
              className="mb-0"
            >
              <Select
                variant="filled"
                filterOption={false}
                suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                placeholder={`${t("meetingWriter")}...`}
                labelInValue
                showSearch
                onSearch={writerSearch.onSearch}
                onChange={writerSearch.resetSearch}
                options={writerSearch.options}
              />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
              name="Secertary"
              label={t("secretariat")}
              className="mb-0"
            >
              <Select
                variant="filled"
                mode="multiple"
                labelInValue
                suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                placeholder={`${t("secretariat")}...`}
                disabled={isFetchingGroups}
                options={secertaries}
              />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
              name="administration"
              label={t("administration")}
              className="mb-0"
            >
              <Select
                mode="multiple"
                variant="filled"
                labelInValue
                suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                placeholder={`${t("administration")}...`}
                disabled={isFetchingGroups}
                options={management}
              />
            </Form.Item>
          </div>

          <Form.Item
            rules={[{ required: true, message: t("validation:requiredField") }]}
            name="Minister"
            label={t("hisExcellencyTheMinister")}
            className="mb-0"
          >
            <Select
              variant="filled"
              labelInValue
              suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
              placeholder={`${t("hisExcellencyTheMinister")}...`}
              disabled={isFetchingGroups}
              options={minister}
            />
          </Form.Item>

          <div className="flex gap-4">
            <Button
              className="w-full border-none text-black bg-gray-200"
              onClick={previousStep}
            >
              {i18n.language === "ar" ? (
                <GrLinkNext color="black" size={20} />
              ) : (
                <GrLinkPrevious color="black" size={20} />
              )}
              {t("previous")}
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("next")}
              {i18n.language === "ar" ? (
                <GrLinkPrevious size={20} />
              ) : (
                <GrLinkNext size={20} />
              )}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default StepThree;
