import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { handleLogin } from "@/redux/slices/loginSlice";

const cookies = new Cookies();

interface GuardProps {
  children: React.ReactNode;
  type: "Private" | "Public";
}

export default function Guard({ children, type }: GuardProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const token = cookies.get("token");
  const userData = useMemo(() => {
    const data = cookies.get("user");
    return token ? { ...data, token } : null;
  }, [token]);

  useEffect(() => {
    if (userData && userData.id && !user) {
      dispatch(handleLogin(userData));
    }
  }, [dispatch, userData, user]);

  const isPrivate = type === "Private";

  if (isPrivate && !user?.id && !token) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
