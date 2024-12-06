import ApiOptions, { initialState } from "@/assets/reducers/apiOptions";
import AddMemberForm from "@/components/members/AddMemberForm";
import MemberData from "@/components/members/MemberData";
import MembersHeader from "@/components/members/MembersHeader";
import MembersTable, { User } from "@/components/members/MembersTable";
import UpdateUserDate from "@/components/members/UpdateUserDate";
import FormBtn from "@/components/ui/FormBtn";
import TopBar from "@/components/ui/TopBar";
import useResultModal from "@/hooks/useModal";
import { getUsers, suspendAccount, updateUserData } from "@/services/members";
import errorException from "@/utils/errorException";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer } from "antd";
import { AxiosError } from "axios";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { RiShutDownLine } from "react-icons/ri";

export default function Members() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<User>({
    name: "",
    userName: "",
    id: "",
    email: "",
    roles: [""],
    mobileNumber: "",
    profilePicture: "",
    isActive: true,
  });
  const [isOpenDrawer, setIsOpenDrawer] = useState("close");

  const closeDrawer = () => setIsOpenDrawer("close");
  const openUpdatePermissionsDrawer = () => setIsOpenDrawer("addMemberForm");
  const openMemberDataDrawer = (userData: User) => {
    setUserData(userData);

    setIsOpenDrawer("memberData");
  };
  const openUpdateMemberDataDrawer = (userData: User) => {
    setUserData(userData);
    setIsOpenDrawer("updateUserData");
  };

  // const [errors, setErrors] = useState<
  //   [{ [key: string]: string }] | string | null
  // >(null);
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const globalModal = useResultModal();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["members", filterOptions],
    queryFn: () => getUsers(filterOptions),
  });

  const success = () => {
    closeDrawer();
    refetch();
    globalModal.success({
      title: t("success"),
      subtitle: "",
    });
  };

  const error = (error: AxiosError) => {
    const messages: [{ [key: string]: string }] | string | null =
      errorException(error);
    console.log(messages);
  };

  const Mutation = useMutation({
    mutationFn: (values: { id: string; isActive: boolean }) =>
      suspendAccount(values),
    onSuccess: success,
    onError: error,
  });
  const updateUserDataMutation = useMutation({
    mutationFn: (values: User) => updateUserData(values),
    onSuccess: success,
    onError: error,
  });

  const onSubmit = () => {
    globalModal
      .confirm(
        userData?.isActive
          ? {
              subtitle: t("confirmSuspendAccountSubtitle"),
              title: t("confirmSuspendAccountTitle"),
            }
          : {
              subtitle: t("confirmNnSuspendAccountSubtitle"),
              title: t("confirmNnSuspendAccountTitle"),
            }
      )
      .then(() => {
        return Mutation.mutate({
          id: userData.id,
          isActive: !userData?.isActive,
        });
      });
  };

  return (
    <div className="p-2 space-y-4">
      <TopBar text={t("addNewUser")} openDrawer={openUpdatePermissionsDrawer} />

      <MembersHeader />

      <MembersTable
        actions={{
          edit: openUpdateMemberDataDrawer,
          view: openMemberDataDrawer,
          paginate: dispatch,
        }}
        loading={isFetching}
        data={data?.data}
      />

      <Drawer
        onClose={closeDrawer}
        open={
          isOpenDrawer == "addMemberForm" ||
          isOpenDrawer == "updateUserData" ||
          isOpenDrawer == "memberData"
        }
        placement="left"
        title={
          isOpenDrawer == "addMemberForm"
            ? t("addNewUser")
            : isOpenDrawer == "memberData"
            ? t("userData")
            : isOpenDrawer == "updateUserData"
            ? t("editUserPermissions")
            : null
        }
        size="large"
        footer={
          isOpenDrawer == "addMemberForm" ||
          isOpenDrawer == "updateUserData" ? (
            <FormBtn
              form={
                isOpenDrawer == "updateUserData"
                  ? "update-user-data"
                  : "add-user"
              }
              loading={false}
              text={t("save")}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  openUpdateMemberDataDrawer(userData);
                }}
                className="flex items-center w-full text-base"
              >
                <FiEdit size={24} />
                {t("edit")}
              </Button>
              <Button
                onClick={onSubmit}
                variant="filled"
                className={
                  "flex items-center w-full text-base " +
                  (userData?.isActive
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700")
                }
              >
                <RiShutDownLine size={24} />
                {userData?.isActive
                  ? t("suspendAccount")
                  : t("unsuspendAccount")}
              </Button>
            </div>
          )
        }
      >
        {isOpenDrawer == "addMemberForm" ? (
          <AddMemberForm />
        ) : isOpenDrawer == "updateUserData" ? (
          <UpdateUserDate
            action={(values) => {
              updateUserDataMutation.mutate(values);
            }}
            userData={userData}
          />
        ) : isOpenDrawer == "memberData" ? (
          <MemberData userData={userData} />
        ) : null}
      </Drawer>
    </div>
  );
}
