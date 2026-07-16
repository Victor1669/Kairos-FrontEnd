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
    refreshToken: string;
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

interface RefreshTokenApiBody {
  refreshToken: string;
}

interface RefreshTokenApiReturn extends RefreshTokenApiBody {
  accessToken: string;
}

async function refreshTokenApi(body: RefreshTokenApiBody) {
  return await fetchApi<RefreshTokenApiBody, RefreshTokenApiReturn>({
    route: "auth/refresh",
    method: "post",
    body,
  });
}

export { registerUserApi, userLoginApi, refreshTokenApi };
