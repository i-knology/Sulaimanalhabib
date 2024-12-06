import ApiOptions, { initialState } from "@/assets/reducers/apiOptions";
import CommitteesForm from "@/components/committeesConcils/CommitteesForm";
import CommitteesTable from "@/components/committeesConcils/CommitteesTable";
import DisplayCards from "@/components/committeesConcils/DisplayCards";
import StatusPanel from "@/components/committeesConcils/StatusPanel";
import FormBtn from "@/components/ui/FormBtn";
import TopBar from "@/components/ui/TopBar";
import useResultModal from "@/hooks/useModal";
import { createCommittee, getAllCommittees } from "@/services/committees";
import errorException from "@/utils/errorException";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Drawer } from "antd";
import { AxiosError } from "axios";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";

export default function CommitteesCouncilsPage() {
  const { t } = useTranslation();
  const { committeeId } = useParams();

  const [displayItems, setDisplayItems] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [errors, setErrors] = useState<
    [{ [key: string]: string }] | string | null
  >(null);

  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  const globalModal = useResultModal();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["Committees", filterOptions, searchKey],
    queryFn: () => getAllCommittees({ ...filterOptions, Title: searchKey }),
  });

  const totalCount = data?.data?.totalCount;

  const mutation = useMutation({
    mutationFn: createCommittee,
    onSuccess: () => handleSuccess(),
    onError: (error: AxiosError) => handleError(error),
  });

  // Handlers
  const openDrawer = () => setIsOpenDrawer(true);
  const closeDrawer = () => setIsOpenDrawer(false);
  const handleDisplayItems = () => setDisplayItems(!displayItems);
  const handleSearch = (value: string) => setSearchKey(value);

  // Success and error handling
  const handleSuccess = () => {
    closeDrawer();
    setErrors(null);
    refetch();
    globalModal.success({
      title: t("createdSuccessfully"),
      subtitle: "",
    });
  };

  const handleError = (error: AxiosError) => {
    const messages = errorException(error);
    setErrors(messages);
  };

  if (committeeId) {
    return <Outlet />;
  }

  return (
    <div className="p-2 space-y-4">
      <TopBar
        search={handleSearch}
        text={t("addNewCommittee")}
        openDrawer={openDrawer}
        displayItems={handleDisplayItems}
      />

      <StatusPanel totalCount={totalCount} />

      {displayItems ? (
        <DisplayCards
          loading={isFetching}
          dispatch={dispatch}
          totalCount={totalCount}
          committees={data?.data?.items}
        />
      ) : (
        <CommitteesTable
          isFetching={isFetching}
          totalCount={totalCount}
          dispatch={dispatch}
          data={data?.data?.items}
        />
      )}

      <Drawer
        onClose={closeDrawer}
        open={isOpenDrawer}
        placement="left"
        title={t("addNewCommittee")}
        size="large"
        footer={
          <FormBtn
            form="committee-form"
            loading={mutation.isPending}
            text={t("addNewCommittee")}
          />
        }
      >
        <CommitteesForm
          action={(values) => mutation.mutate(values)}
          errors={errors}
        />
      </Drawer>
    </div>
  );
}
