import ConfirmModal from "@/components/ui/ConfirmModal";
import ResultModal from "@/components/ui/ResultModal";
import React, { createContext, useState, ReactNode } from "react";

interface ModalOptions {
  status?: "success" | "error" | "info" | "warning" | null;
  title: string | null;
  subtitle: string | null;
  content?: ReactNode;
  closable?: boolean;
}

interface ConfirmOptions {
  title: string | null;
  subtitle: string | null;
  onOk?: (() => void) | null;
  onCancel?: (() => void) | null;
}

interface ResultContextType {
  success: (options: ModalOptions & { timeout?: number }) => void;
  error: (
    title: string,
    subtitle: string,
    content?: ReactNode,
    timeout?: number
  ) => void;
  confirm: (options: { title: string; subtitle: string }) => Promise<boolean>;
}

const ResultContext = createContext<ResultContextType | null>(null);

interface ResultContextProviderProps {
  children: ReactNode;
}

export const ResultContextProvider: React.FC<ResultContextProviderProps> = ({
  children,
}) => {
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions>({
    title: null,
    subtitle: null,
    onOk: null,
    onCancel: null,
  });
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    status: null,
    title: null,
    subtitle: null,
    content: undefined,
    closable: true,
  });

  function success({
    title,
    subtitle,
    content = null,
    timeout = 3000,
    closable = true,
  }: ModalOptions & { timeout?: number }) {
    setModalOptions({
      status: "success",
      title,
      subtitle,
      content,
      closable,
    });
    setTimeout(() => {
      close();
    }, timeout);
  }

  function error(
    title: string,
    subtitle: string,
    content: ReactNode = null
    // timeout = 3000
  ) {
    setModalOptions({
      status: "error",
      title,
      subtitle,
      content,
    });
    // auto-close functionality
    // setTimeout(() => {
    //   close();
    // }, timeout);
  }

  function close() {
    setModalOptions({
      status: null,
      title: null,
      subtitle: null,
      content: null,
      closable: true,
    });
  }

  async function confirm({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }): Promise<boolean> {
    return new Promise((res, rej) => {
      setConfirmOptions({
        title,
        subtitle,
        onOk: () => {
          res(true);
          setConfirmOptions({
            title: null,
            subtitle: null,
            onOk: null,
            onCancel: null,
          });
        },
        onCancel: () => {
          rej(false);
          setConfirmOptions({
            title: null,
            subtitle: null,
            onOk: null,
            onCancel: null,
          });
        },
      });
    });
  }

  return (
    <ResultContext.Provider value={{ success, error, confirm }}>
      {children}
      <ResultModal
        status={modalOptions.status || undefined}
        title={modalOptions.title || ""}
        subtitle={modalOptions.subtitle || ""}
        content={modalOptions.content}
        close={close}
        closable={modalOptions.closable}
      />
      <ConfirmModal
        onOk={confirmOptions.onOk || undefined}
        onCancel={confirmOptions.onCancel || undefined}
        title={confirmOptions.title || ""}
        subtitle={confirmOptions.subtitle || ""}
      />
    </ResultContext.Provider>
  );
};

export default ResultContext;
