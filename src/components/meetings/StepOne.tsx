import { getMeetingsPriority } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Button, Checkbox, DatePicker, Form, Input, Select, Steps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { SiGooglemeet } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";
import FormTimePicker from "../ui/FormTimePicker";
import { removeDot } from "./MeetingForm";
import MeetingStepName from "./StepName";

interface StepOneProps {
  isExternalMmebers: (value: boolean) => void;
  nextStep: () => void;
  formDataCollector: (values: any) => void;
}

const StepOne: React.FC<StepOneProps> = ({
  isExternalMmebers,
  nextStep,
  formDataCollector,
}) => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [isInternal, setIsInternal] = useState(false);
  const [date, setDate] = useState<Dayjs | undefined>(undefined);
  const [isCurrent, setIsCurrent] = useState(false);

  const meetingTypesItems = useMemo(
    () => [
      { label: t("statuses:internal"), value: true },
      { label: t("statuses:external"), value: false },
    ],
    [t]
  );

  const { data, isFetching } = useQuery({
    queryKey: ["meetingsPriority", isInternal],
    queryFn: () => getMeetingsPriority({ IsInternal: isInternal }),
    retry: 3,
  });

  const priorityItems = useMemo(
    () =>
      data?.data?.items?.map((item) => ({
        label:
          i18n.language === "ar" ? item?.name : item?.nameEn || t("unknown"),
        value: item?.id || 0,
      })) || [],
    [data, i18n.language, t]
  );

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      StartDate: dayjs(values.StartDate).utc(),
      EndDate: dayjs(
        `${dayjs(date).format("YYYY-MM-DD")}T${dayjs(values.EndDate).format(
          "HH:mm:ss"
        )}`
      ).utc(),
      MeetingTypeId: values.MeetingTypeId?.value,
      IsInternal: isInternal,
      priorityTypeId: isCurrent ? 1 : 3,
      ready: false,
    };

    formDataCollector(formattedValues);
    nextStep?.();
  };

  const handleMeetingTypeChange = (item: any) => {
    form.resetFields(["PriorityTypeId"]);
    setIsInternal(item.value);
    isExternalMmebers(item.value);
  };

  const toggleIsCurrent = () => setIsCurrent((prev) => !prev);

  const renderSelectOptions = (options: any[], isLoading: boolean) =>
    isLoading
      ? [
          {
            label: (
              <div className="p-0">
                <Skeleton count={1} height={20} />
              </div>
            ),
            value: "",
            disabled: true,
          },
        ]
      : options;

  return (
    <>
      <MeetingStepName
        icon={<SiGooglemeet color="gray" size={24} />}
        status="meetingDetails"
        text="enterMeetingDetails"
      />
      <div className="mt-4 h-full">
        <Steps
          responsive={false}
          current={1}
          progressDot={removeDot}
          items={Array(5).fill({ title: "" })}
        />
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="overflow-hidden"
        >
          <Form.Item
            rules={[{ required: true, message: t("validation:requiredField") }]}
            name="Title"
            label={t("meetingTitle")}
            className="mb-2"
          >
            <Input variant="filled" />
          </Form.Item>

          <Form.Item
            name="Description"
            rules={[{ required: true, message: t("validation:requiredField") }]}
            label={t("meetingDescription")}
            className="mb-2"
          >
            <Input.TextArea variant="filled" />
          </Form.Item>

          <Form.Item name="StartDate" label={t("meetingDate")} className="mb-2">
            <DatePicker
              onChange={setDate}
              variant="filled"
              className="w-full"
              suffixIcon={<SlCalender size={20} />}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            <Form.Item name="StartDate" label={t("fromHour")} className="m-0">
              <FormTimePicker variant="filled" className="w-full" />
            </Form.Item>
            <Form.Item name="EndDate" label={t("toHour")} className="m-0">
              <FormTimePicker variant="filled" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item label={t("meetingType")} className="font-semibold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                rules={[
                  { required: true, message: t("validation:requiredField") },
                ]}
                name="IsInternal"
                className="mb-2"
              >
                <Select
                  labelInValue
                  options={meetingTypesItems}
                  suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                  onChange={handleMeetingTypeChange}
                  variant="filled"
                />
              </Form.Item>

              <Form.Item
                rules={[
                  { required: true, message: t("validation:requiredField") },
                ]}
                name="MeetingTypeId"
                className="mb-2"
              >
                <Select
                  labelInValue
                  options={renderSelectOptions(priorityItems, isFetching)}
                  suffixIcon={<FaChevronDown color="#88CB60" size={20} />}
                  variant="filled"
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            name="priorityTypeId"
            label={t("meetingPriorityEvaluation")}
            className="mb-2"
          >
            <Checkbox
              className="hidden"
              value={isCurrent}
              checked={isCurrent}
            />
            <button
              onClick={toggleIsCurrent}
              type="button"
              className={`w-full py-2 text-base rounded-lg ${
                isCurrent
                  ? "border-[1px] border-secondary bg-content text-black"
                  : "border-[1px] border-semiGray bg-semiGray text-content"
              }`}
            >
              {t("now")}
            </button>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
          >
            {t("next")}
            {i18n.language === "ar" ? (
              <GrLinkPrevious size={20} />
            ) : (
              <GrLinkNext size={20} />
            )}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default StepOne;
