import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import CancelIcon from "./CancelIcon";
import PlusIcon from "./PlusIcon";

export default function TaskInput({ form }) {
  const { t } = useTranslation();

  return (
    <div
      className="w-full space-y-4"
      dir="rtl"
    >
      <Form.List name="Messions">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <div
                  key={field.name}
                  className="relative"
                >
                  <Form.Item
                    {...field}
                    label={t("missionTitle")}
                    name={[field.name, "title"]}
                    rules={[{ required: true, message: t("validation:requiredField") }]}
                    initialValue={form.getFieldValue(["Messions", field.name, "title"])}
                    // data-task-id={field?.}
                  >
                    <div className="flex items-center gap-3">
                      <Input
                        className="!pe-10"
                        placeholder={t("missionTitle")}
                      />
                      {fields.length > 1 && (
                        <button
                          onClick={() => remove(field.key)}
                          className="text-gray-400 hover:text-gray-600 absolute left-5 top-1/2 translate-1/2"
                          style={{ transform: "translate(-50%,-50%)" }}
                          type="button"
                        >
                          <CancelIcon />
                        </button>
                      )}
                    </div>
                  </Form.Item>
                </div>
              ))}
              <div className="flex justify-end items-center space-x-2">
                <button
                  onClick={() => {
                    add({
                      title: undefined,
                    });
                  }}
                  className="flex gap-[8px] items-center"
                  type="button"
                >
                  <PlusIcon />
                  <p className="underline hover:no-underline font-medium text-labelColor">
                    {t("addNewMission")}
                  </p>
                </button>
              </div>
            </>
          );
        }}
      </Form.List>
    </div>
  );
}
