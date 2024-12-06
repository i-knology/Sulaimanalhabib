import React from "react";
import { Modal, Result } from "antd";

interface ResultModalProps {
  status: "success" | "error" | "info" | "warning" | undefined;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  close: () => void;
  closable?: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({
  status,
  title,
  subtitle,
  content,
  close,
  closable = true,
}) => {
  const isVisible = Boolean(status);
  const resultProps = {
    status,
    title,
    subTitle: subtitle,
    icon:
      status === "success" ? (
        <img src={"/illustrations/success.png"} alt="Success Icon" />
      ) : undefined,
  };

  return (
    <Modal
      open={isVisible}
      footer={null}
      centered
      className="modalResult"
      onCancel={closable ? close : undefined}
      closeIcon={closable}
      style={{ zIndex: 9999999999999 }}
    >
      <Result className="flex flex-col items-center"  {...resultProps}>{content}</Result>
    </Modal>
  );
};

export default ResultModal;
