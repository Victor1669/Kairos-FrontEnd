import { fetchApi } from "@Utils/fetchApi";

import type { CompleteUserType } from "./UserType";

type RegisterUserApiBody = Omit<CompleteUserType, "id" | "role">;

async function registerUserApi(body: RegisterUserApiBody) {
  return await fetchApi<RegisterUserApiBody>({
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
    user: Omit<CompleteUserType, "cpf" | "phone">;
  };
}

async function userLoginApi(body: UserLoginApiBody) {
  return await fetchApi<UserLoginApiBody, UserLoginApiReturn>({
    route: "auth/login",
    method: "post",
    body,
  });
}

export { registerUserApi, userLoginApi };
