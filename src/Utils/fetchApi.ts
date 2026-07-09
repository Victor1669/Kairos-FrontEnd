import { api } from "../Config/axiosConfig";

type FetchApiProps<TBody> = {
  method: "get" | "post" | "delete" | "put";
  route: string;
  body?: TBody;
};

type MessageResponse = { message: string };

type FetchApiResponse<TResponse> = {
  status: number;
  success: boolean;
  responseData: TResponse & MessageResponse;
};

export async function fetchApi<TBody = object, TResponse = MessageResponse>({
  method,
  route,
  body,
}: FetchApiProps<TBody>): Promise<FetchApiResponse<TResponse>> {
  try {
    let res;

    if (method === "get" || method === "delete") {
      res = await api[method](`/${route}`);
    } else {
      res = await api[method](`/${route}`, body);
    }

    return {
      status: res.status,
      success: res.status < 300,
      responseData: res.data,
    };

    // eslint-disable-next-line
  } catch (err: any) {
    const status = err.response?.status || 500;
    const errObj = err?.response?.data;
    const errMessage =
      errObj?.message || errObj?.error || err.message || errObj;

    return {
      status,
      success: status < 300,
      responseData: errMessage,
    };
  }
}
