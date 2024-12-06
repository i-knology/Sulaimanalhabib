import instance from "../utils/instance";

export interface loginParameter {
  // fcmToken: string;
  password: string;
  loginName: string;
}

async function login(data: loginParameter) {
  const result = await instance
    .post("Users/Login", data)
    .then((res) => res?.data);
  return result;
}

export { login };
