import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface GuardProps {
  children: React.ReactNode;
  type: "Private" | "Public";
}

export default function Guard({ children, type }: GuardProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const token = cookies.get("token");
  // const userData = useMemo(() => {
  //   const data = JSON.parse(localStorage.getItem("user") ?? "");
  //   console.log(data);
  //   return token ? { ...user, token } : null;
  // }, [token]);

  // useEffect(() => {
  //   if (userData && userData.id && !user) {
  //     dispatch(handleLogin(userData));
  //   }
  // }, [dispatch, userData, user]);

  const isPrivate = type === "Private";

  if (isPrivate && !user?.id && !token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
