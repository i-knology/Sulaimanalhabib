import { Button, Form, Input, Steps } from "antd";
import { RcFile } from "antd/es/upload";
import { Upload } from "antd/lib";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import StepWizard from "react-step-wizard";
import TaskStatus from "../tasks/TaskStatus";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const removeDot = () => {
  return <span style={{ display: "none" }} />;
};

export const transformAgendaData = (data: InputObject): OutputItem[] => {
  const result: OutputItem[] = [];
  // const meetingId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  Object.keys(data).forEach((key) => {
    const match = key.match(/(title|description)-(\d+)/);

    if (match) {
      const [, fieldType, index] = match;
      const itemIndex = Number(index);
      if (!result[itemIndex]) {
        result[itemIndex] = {
          title: "",
          description: "",
          // meetingId,
          files: [],
        };
      }

      if (fieldType === "title") {
        result[itemIndex].title = data[key];
      } else if (fieldType === "description") {
        result[itemIndex].description = data[key];
      }
    }

    // Match files key
    if (key.startsWith("files-")) {
      const index = Number(key.split("-")[1]);
      const filesData: InputFile = data[key];

      // Ensure an entry exists for this index
      if (!result[index]) {
        result[index] = {
          title: "",
          description: "",
          // meetingId,
          files: [],
        };
      }

      // Extract file names
      result[index].files = filesData?.fileList.map((file) => file.name);
    }
  });

  return result;
};
export interface MeetingFormValues {
  Title: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  meetingDate: string;
  IsOnline: boolean;
  IsWithTime: boolean;
  IsAlreadyApproved: boolean;
  MeetingAttendeesPerson: any[];
  MeetingAttendeesExternal?: string[];
  IsInternal: boolean;
  PriorityTypeId: number;
}
interface InputFile {
  file: {
    name: string;
  };
  fileList: Array<{
    name: string;
  }>;
}
interface InputObject {
  [key: string]: any;
}
interface OutputItem {
  title: string;
  description: string;
  meetingId?: string;
  files: string[];
}
export interface Meeting {
  Title: string;
  Description: string;
  StartDate: string;
  ready?: boolean;
  EndDate: string;
  IsInternal: boolean;
  MeetingTypeLookupId: {
    label: string;
    value: number;
    key: number;
  };
  priorityTypeId: number;
  MeetingTypeId: number;
  Meet_Place: string;
  IsOnline: boolean;
  Agendas: Agenda[];
  MeetingAttendeesPerson: MeetingAttendee[];
  CommitteeId?: string;
}
interface Agenda {
  title: string;
  description: string;
  files: string[];
}
interface MeetingAttendee {
  userId: string;
  attendeTypeId: number;
  Title: string;
}

function StepFour({
  formDataCollector,
  previousStep,
  form,
  onSubmit,
  setAgendaList,
  agendaList,
  isLoading,
}) {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddAgenda = () => {
    setAgendaList([...agendaList, { title: "", description: "", files: [] }]);
  };

  const handleDeleteAgenda = (index: number) => {
    const newAgendaList = [...agendaList];
    newAgendaList.splice(index, 1);
    setAgendaList(newAgendaList);
  };

  const handleFileChange = (file: RcFile, index: number) => {
    const newAgendaList = [...agendaList];
    const updatedFiles = [...newAgendaList[index].files, file];
    newAgendaList[index].files = updatedFiles;
    setAgendaList(newAgendaList);
  };

  const onFinish = (values) => {
    const data = transformAgendaData(values);
    formDataCollector({ Agendas: data, ready: true });
    onSubmit();
  };

  return (
    <>
      <TaskStatus
        icon={<TfiAgenda color="gray" size={24} />}
        status="meetingAgenda"
        text="enterAgendaOrMore"
      />
      <div className="my-4 h-full">
        <Steps
          responsive={false}
          current={4}
          progressDot={removeDot}
          items={[
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
          ]}
        />
        <Form
          form={form}
          onFinish={onFinish}
          className="space-y-4 my-2 h-[100%] flex flex-col justify-between"
          layout="vertical"
          id={"create-meeting"}
        >
          {/* Multiple Agendas */}
          {agendaList.map((agenda, index) => (
            <div key={index} className="mb-4">
              <Form.Item name={`title-${index}`} className="mb-2">
                <div className="flex justify-between items-center gap-2">
                  <Input
                    placeholder={t("agendaTitle")}
                    variant="filled"
                    value={agenda.title}
                    onChange={(e) => {
                      const newAgendaList = [...agendaList];
                      newAgendaList[index].title = e.target.value;
                      setAgendaList(newAgendaList);
                    }}
                  />

                  <button
                    onClick={() => handleDeleteAgenda(index)}
                    className="mb-2 bg-red-100 text-red-400 hover:text-red-700 duration-500 p-1 mt-1 rounded-lg"
                  >
                    <MdDeleteForever size={28} />
                  </button>
                </div>
              </Form.Item>

              <Form.Item name={`description-${index}`} className="mb-2">
                <Input.TextArea
                  variant="filled"
                  placeholder={t("agendaDescription")}
                  value={agenda.description}
                  onChange={(e) => {
                    const newAgendaList = [...agendaList];
                    newAgendaList[index].description = e.target.value;
                    setAgendaList(newAgendaList);
                  }}
                />
              </Form.Item>

              <Form.Item name={`files-${index}`} className="w-full m-0">
                <Upload
                  customRequest={({ file, onSuccess }) => {
                    handleFileChange(file as RcFile, index);
                    onSuccess?.(null, file);
                  }}
                  showUploadList={false}
                  className="w-full"
                >
                  <Button
                    variant="filled"
                    className="border-dashed border-secondary border-2 py-6 w-full bg-gray-100 text-black"
                    onClick={handleButtonClick}
                  >
                    <AiOutlineCloudUpload size={28} />
                    <span className="text-content">
                      {t("dragAndDropFiles")}
                    </span>
                    <span className="text-black">{t("uploadAttachments")}</span>
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          ))}

          <Form.Item className="mb-2">
            <Button type="default" onClick={handleAddAgenda} className="w-full">
              {agendaList.length > 0 ? t("addAnotherAgenda") : t("addAgenda")}
            </Button>
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
              loading={isLoading}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
              form="create-meeting"
            >
              {t("addNewMeeting")}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default function MeetingForm({
  mutation,
  members = [],
}: {
  mutation: UseMutationResult<unknown, AxiosError, Meeting>;
  members?: { typeId: number; userInfo: { name: string; id: string } }[];
}) {
  const [formData, setFormData] = useState<Meeting | null>(null);
  const [agendaList, setAgendaList] = useState<
    { title: string; description: string; files: RcFile[] }[]
  >([]);
  const [_, setIsExternalMembers] = useState(true);
  const [form] = Form.useForm();

  const formDataCollector = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const onSubmit = () => {
    if (formData) {
      mutation.mutate(formData);
    }

    if (mutation?.isSuccess) {
      form.resetFields([
        "priorityTypeId",
        "MeetingTypeId",
        "IsInternal",
        "EndDate",
        "StartDate",
        "Description",
        "Title",
        "Meet_Place",
        "MeetingSecretUrl",
        "MeetingURL",
        "MeetingSecretId",
        "MeetingSecretNumber",
        "meetingOwner",
        "meetingWriter",
        "Secertary",
        "Minister",
        "administration",
      ]);
      setFormData(null);
      setAgendaList([]);
    }
  };

  return (
    <div className="Wizard">
      <StepWizard>
        <StepOne
          isExternalMmebers={(value: boolean) => setIsExternalMembers(value)}
          nextStep={() => console.log("Proceed to next step")}
          formDataCollector={formDataCollector}
        />
        <StepTwo
          previousStep={() => true}
          nextStep={() => {}}
          formDataCollector={formDataCollector}
        />
        <StepThree
          // isExternalMembers={isExternalMembers}
          previousStep={() => true}
          nextStep={() => {}}
          formDataCollector={formDataCollector}
          members={members}
        />
        <StepFour
          onSubmit={onSubmit}
          isLoading={mutation.isPending}
          agendaList={agendaList}
          setAgendaList={setAgendaList}
          form={form}
          previousStep={() => true}
          formDataCollector={formDataCollector}
        />
      </StepWizard>
    </div>
  );
}
