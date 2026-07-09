import { useFetch } from "@Hooks/useFetch";

import type { UserType } from "./UserType";

type RegisterUserApiBody = Omit<UserType, "id">;

async function registerUserApi(body: RegisterUserApiBody) {
  return await useFetch<RegisterUserApiBody>({
    method: "post",
    route: "auth/register",
    body,
  });
}

interface UserLoginApiBody {
  email: string;
  password: string;
}

interface UserLoginApiReturn {
  data: {
    token: string;
    user: Omit<UserType, "cpf" | "phone">;
  };
}

async function userLoginApi(body: UserLoginApiBody) {
  return await useFetch<UserLoginApiBody, UserLoginApiReturn>({
    route: "auth/login",
    method: "post",
    body,
  });
}

export { registerUserApi, userLoginApi };
