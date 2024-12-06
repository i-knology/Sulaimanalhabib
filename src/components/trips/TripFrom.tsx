import { Button, Form, Input, Radio, Select, Steps } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import { GrAttachment, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdfLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import StepWizard from "react-step-wizard";
import MemberRadio from "../members/MemberRadio";
import { FileInput } from "../projects/ProjectForm";
import FormTimePicker from "../ui/FormTimePicker";
import TripCreationCases from "./TripCreationCases";

interface StepPropTypes {
  nextStep?: () => void;
  formDataCollector: (data) => void;
  previousStep?: () => void;
}
const removeDot = () => {
  return <span style={{ display: "none" }} />;
};

function StepOne({ nextStep, formDataCollector }: StepPropTypes) {
  const { t, i18n } = useTranslation();

  return (
    <div className="overflow-hidden">
      <TripCreationCases
        icon={
          <FaRegFileAlt
            color="gray"
            size={24}
          />
        }
        status="tripDetails"
        text="enterTripDetails"
      />
      <div className="my-4 h-full">
        <Steps
          current={1}
          progressDot={removeDot}
          items={[{ title: "" }, { title: "" }, { title: "" }, { title: "" }, { title: "" }]}
        />
        <Form
          onFinish={(values) => {
            formDataCollector(values);
            if (nextStep) {
              nextStep();
            }
          }}
          className="space-y-4 my-2 h-[100%] flex flex-col justify-between"
          layout="vertical"
        >
          <Form.Item
            className="mb-0"
            name="tripTitle"
            label={t("tripTitle")}
          >
            <Input
              variant="filled"
              className="mb-2"
              placeholder={t("tripTitle") + "..."}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            className="mb-0"
            name="aboutTrip"
            label={t("aboutTrip")}
          >
            <Input.TextArea
              variant="filled"
              className="mb-2"
              placeholder={t("aboutTrip") + "..."}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-0 p-0">
            <Form.Item
              className="mb-3"
              label={t("tripStartDate")}
              rules={[{ required: true, message: t("validation:requiredField") }]}
            >
              <FormTimePicker
                className="w-full"
                variant="filled"
                placeholder={t("tripStartDate") + "..."}
                suffixIcon={<SlCalender size={20} />}
              />
            </Form.Item>

            <Form.Item
              className="mb-3"
              label={t("tripStartTime")}
              rules={[{ required: true, message: t("validation:requiredField") }]}
            >
              <FormTimePicker
                className="w-full"
                variant="filled"
                placeholder={t("tripStartTime") + "..."}
                suffixIcon={<SlCalender size={20} />}
              />
            </Form.Item>

            <Form.Item
              className="mb-0"
              label={t("tripEndDate")}
              rules={[{ required: true, message: t("validation:requiredField") }]}
            >
              <FormTimePicker
                className="w-full"
                variant="filled"
                placeholder={t("tripEndDate") + "..."}
                suffixIcon={<SlCalender size={20} />}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={t("tripStartPoint")}
            className="mb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-0 p-3 bg-gray-100 rounded-lg">
              <Form.Item
                label={t("startingPoint")}
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Select
                  className="w-full"
                  placeholder={t("selectCountry")}
                  suffixIcon={<IoIosArrowDown size={20} />}
                />
              </Form.Item>

              <Form.Item
                label={t("city")}
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Select
                  className="w-full"
                  placeholder={t("selectCountry")}
                  suffixIcon={<IoIosArrowDown size={20} />}
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={t("tripStartPoint")}
            className="mb-0"
          >
            <div className="bg-gray-100 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-0 p-3 ">
                <Form.Item
                  className="mb-0"
                  label={t("country")}
                  rules={[{ required: true, message: t("validation:requiredField") }]}
                >
                  <Select
                    className="w-full"
                    placeholder={t("selectCountry")}
                    suffixIcon={<IoIosArrowDown size={20} />}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-0"
                  label={t("city")}
                  rules={[{ required: true, message: t("validation:requiredField") }]}
                >
                  <Select
                    className="w-full"
                    placeholder={t("selectCity")}
                    suffixIcon={<IoIosArrowDown size={20} />}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-0"
                  label={t("accommodation")}
                  rules={[{ required: true, message: t("validation:requiredField") }]}
                >
                  <Input
                    type="number"
                    className="w-full"
                    placeholder={t("accommodation")}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-end">
                <p className="mx-4 text-primary border-b-[1px] border-primary cursor-pointer">
                  {"+ " + t("addAnotherArrivalPoint")}
                </p>
              </div>
            </div>
          </Form.Item>

          <Button
            className="w-full mt-[100%] bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
            type="primary"
            htmlType="submit"
          >
            {t("next")}
            {i18n.language == "ar" ? <GrLinkPrevious size={20} /> : <GrLinkNext size={20} />}
          </Button>
        </Form>
      </div>
    </div>
  );
}

function StepTwo({ nextStep, formDataCollector, previousStep }) {
  const { t, i18n } = useTranslation();
  const [handleSearch, setHandleSearch] = useState(false);

  return (
    <div className="overflow-hidden">
      <TripCreationCases
        icon={
          <HiOutlineUsers
            color="gray"
            size={24}
          />
        }
        status="tripTeam"
        text="selectTripTeam"
      />
      <div className="my-4">
        <Steps
          current={2}
          progressDot={() => <span style={{ display: "none" }} />}
          items={[{ title: "" }, { title: "" }, { title: "" }, { title: "" }, { title: "" }]}
        />
        <Form
          onFinish={(values) => {
            formDataCollector(values);
            if (nextStep) {
              nextStep();
            }
          }}
          className="space-y-4 my-2 flex flex-col justify-between"
          layout="vertical"
        >
          <div>
            <Form.Item
              className="mb-0"
              name="username"
              label={t("username")}
            >
              <Select
                open={false}
                onClick={() => setHandleSearch(true)}
                placeholder={t("username") + "..."}
                style={{ width: "100%" }}
                suffixIcon={<IoIosArrowDown size={20} />}
              />
            </Form.Item>

            {handleSearch && (
              <div className="p-2 rounded-lg border-gray-100 border-solid border-[1px]">
                <Input
                  className="mb-2"
                  placeholder={t("search") + "..."}
                  style={{ width: "100%" }}
                  suffix={<CiSearch size={20} />}
                />
                <Radio.Group>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <MemberRadio key={index} />
                  ))}
                </Radio.Group>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              className="w-full border-none text-black"
              onClick={previousStep}
            >
              {i18n.language === "ar" ? (
                <GrLinkNext
                  color="black"
                  size={20}
                />
              ) : (
                <GrLinkPrevious
                  color="black"
                  size={20}
                />
              )}
              {t("previous")}
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("next")}
              {i18n.language === "ar" ? <GrLinkPrevious size={20} /> : <GrLinkNext size={20} />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function StepThree({ formDataCollector, previousStep, nextStep }: StepPropTypes) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <TripCreationCases
        icon={
          <HiOutlineUsers
            color="gray"
            size={24}
          />
        }
        status="logisticsItems"
        text="enterLogisticsItems"
      />
      <div className="my-4 h-full">
        <Steps
          current={3}
          progressDot={removeDot}
          items={[{ title: "" }, { title: "" }, { title: "" }, { title: "" }, { title: "" }]}
        />
        <Form
          onFinish={(values) => {
            formDataCollector(values);
            if (nextStep) {
              nextStep();
            }
          }}
          className="space-y-4 my-2 h-[100%] flex flex-col justify-between"
          layout="vertical"
        >
          <Form.Item rules={[{ required: true, message: t("validation:requiredField") }]}>
            <Select
              variant="filled"
              className="w-full"
              placeholder={t("selectTasks")}
              suffixIcon={<IoIosArrowDown size={20} />}
            />
          </Form.Item>

          <Form.Item
            className="mb-0"
            name="notes"
            label={
              <span>
                {t("notes")} <span className="text-content mx-1">{t("optional")}</span>
              </span>
            }
          >
            <Input.TextArea
              variant="filled"
              className="mb-2"
              placeholder={t("enterNotesHere")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div className="flex gap-4">
            <Button
              className="w-full border-none text-black"
              onClick={previousStep}
            >
              {i18n.language === "ar" ? (
                <GrLinkNext
                  color="black"
                  size={20}
                />
              ) : (
                <GrLinkPrevious
                  color="black"
                  size={20}
                />
              )}
              {t("previous")}
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("next")}
              {i18n.language === "ar" ? <GrLinkPrevious size={20} /> : <GrLinkNext size={20} />}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
function StepFour({ formDataCollector, previousStep }: StepPropTypes) {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <TripCreationCases
        icon={
          <GrAttachment
            color="gray"
            size={24}
          />
        }
        status="taskAttachments"
        text="uploadFiles"
      />
      <div className="my-4 h-full">
        <Steps
          current={4}
          progressDot={removeDot}
          items={[{ title: "" }, { title: "" }, { title: "" }, { title: "" }, { title: "" }]}
        />
        <Form
          onFinish={(values) => {
            formDataCollector(values);
          }}
          className="space-y-4 my-2 h-[100%] flex flex-col justify-between"
          layout="vertical"
        >
          <Form.Item
            className="hidden"
            label={t("addAttachments")}
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <FileInput ref={fileInputRef} />
          </Form.Item>

          <Form.Item
            label={t("addAttachments")}
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <Button
              variant="filled"
              className="border-dashed border-secondary border-2 py-10 w-full bg-gray-100 text-black"
              onClick={handleButtonClick} // Open the file input
            >
              <AiOutlineCloudUpload size={28} />
              <span className="text-gray-400">{t("dragAndDropFiles")}</span>
              <span className="text-black">{t("uploadAttachments")}</span>
            </Button>
          </Form.Item>

          <div className="p-2 bg-white rounded-lg mb-3 border-[1px] my-2 border-solid border-gray-200 ">
            <div className="flex items-center px-1 justify-between">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className="bg-red-50 text-red-700"
                    onClick={() => {
                      console.log("Delete");
                    }}
                  >
                    <PiFilePdfLight size={30} />
                  </div>

                  <div className="mx-2 w-full flex flex-col">
                    <span>{"اسم الملف"}</span>
                    <span className="text-gray-300">{"15 MB"}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="text"
                className="bg-gray-100 text-content"
                onClick={() => {
                  console.log("Delete");
                }}
              >
                <HiOutlineDownload size={20} />
              </Button>
            </div>
          </div>

          <div className="p-2 bg-white rounded-lg mb-3 border-[1px] my-2 border-solid border-gray-200 ">
            <div className="flex items-center px-1 justify-between">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className="bg-red-50 text-red-700"
                    onClick={() => {
                      console.log("Delete");
                    }}
                  >
                    <PiFilePdfLight size={30} />
                  </div>

                  <div className="mx-2 w-full flex flex-col">
                    <span>{"اسم الملف"}</span>
                    <span className="text-gray-300">{"15 MB"}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="text"
                className="bg-gray-100 text-content"
                onClick={() => {
                  console.log("Delete");
                }}
              >
                <HiOutlineDownload size={20} />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className="w-full border-none text-black"
              onClick={previousStep}
            >
              {i18n.language === "ar" ? (
                <GrLinkNext
                  color="black"
                  size={20}
                />
              ) : (
                <GrLinkPrevious
                  color="black"
                  size={20}
                />
              )}
              {t("previous")}
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("createTask")}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

function TripFrom() {
  const [, setFormData] = useState({});

  const formDataCollector = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="Wizard">
      <StepWizard>
        <StepOne
          nextStep={() => console.log("Proceed to next step")}
          formDataCollector={formDataCollector}
        />

        <StepTwo
          previousStep={() => true}
          nextStep={() => {}}
          formDataCollector={formDataCollector}
        />
        <StepThree
          nextStep={() => {}}
          previousStep={() => true}
          formDataCollector={formDataCollector}
        />
        <StepFour
          previousStep={() => true}
          formDataCollector={formDataCollector}
        />
      </StepWizard>
    </div>
  );
}

export default TripFrom;
