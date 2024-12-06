import { Button, Form, Input } from "antd";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { FcAddDatabase } from "react-icons/fc";
import { MdDragIndicator } from "react-icons/md";

export default function LogisticItemForm() {
  const { t } = useTranslation();

  const [arr, setArr] = useState([0]);
  const [arrayLength, setArrayLength] = useState([]);
  const mode :string = "create";

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedItems = Array.from(arrayLength);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);
    setArrayLength(updatedItems);
  };

  const handleAddNewReason = () => {
    setArr((prevArr) => [...prevArr, prevArr.length]);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-container"
              style={{ overflow: "auto", maxHeight: "650px" }}
            >
              {(mode === "update" ? arrayLength : arr).map((id, index) => (
                <Draggable key={id} draggableId={`input-${id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-2"
                      style={{
                        cursor: "move",
                        userSelect: "none",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div
                        id="info-part"
                        className="flex items-center bg-gray-50 justify-end rounded-xl grow relative my-1"
                      >
                        <div className="absolute start-3">
                          <MdDragIndicator size={24} />
                        </div>
                        <div className="flex w-[95%] m-0 p-0">
                          <Form.Item
                            className="w-[50%] p-0 m-0 ms-2"
                            name={`nameAr-${id}`}
                            rules={[
                              { required: true, message: t("requiredField") },
                            ]}
                          >
                            <Input placeholder={`${t("itemInAr")}...`} />
                          </Form.Item>
                          <Form.Item
                            className="w-[50%] p-0 m-0 ms-2"
                            name={`nameEn-${id}`}
                            rules={[
                              { required: true, message: t("requiredField") },
                            ]}
                          >
                            <Input placeholder={`${t("itemInEn")}...`} />
                          </Form.Item>
                          <Form.Item
                            initialValue={id}
                            className="hidden p-0 m-0 ms-2"
                            name={`orderId-${id}`}
                          >
                            <Input placeholder={`${t("orderId")}...`} />
                          </Form.Item>
                          {((mode === "update" && arrayLength.length > 1) ||
                            (mode === "create" && arr.length > 1)) && (
                            <button
                              className="hover:bg-red-300 text-red-700 text-lg ms-1 border-none rounded-e-xl duration-300 cursor-pointer px-3"
                              onClick={() => {
                                setArr((prevArr) =>
                                  prevArr.filter((el) => el !== id)
                                );
                              }}
                            >
                              x
                            </button>
                          )}
                          {mode === "update" && (
                            <Form.Item
                              className="hidden p-0 m-0 ms-2"
                              name={`id-${id}`}
                            >
                              <Input placeholder={`${t("itemInEn")}...`} />
                            </Form.Item>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {mode === "create" && (
                <Button
                  onClick={handleAddNewReason}
                  className="w-full font-bold bg-[#fbfcff] rounded-2xl my-1"
                >
                  <FcAddDatabase size={20} />
                  {t("addNewItem")}
                </Button>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
