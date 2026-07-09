import { api } from "../Config/axiosConfig";

type UseFetchProps<TBody> = {
  method: "get" | "post" | "delete" | "put";
  route: string;
  body?: TBody;
};

type MessageResponse = { message: string };

type UseFetchResponse<TResponse> = {
  status: number;
  data: TResponse & MessageResponse;
};

export async function useFetch<TBody = object, TResponse = MessageResponse>({
  method,
  route,
  body,
}: UseFetchProps<TBody>): Promise<UseFetchResponse<TResponse>> {
  try {
    let res;

    if (method === "get" || method === "delete") {
      res = await api[method](`/${route}`);
    } else {
      res = await api[method](`/${route}`, body);
    }

    return {
      status: res.status,
      data: res.data,
    };
  } catch (err: any) {
    const status = err.response?.status || 500;
    const errObj = err?.response?.data;
    const errMessage =
      errObj?.message || errObj?.error || err.message || errObj;

    return {
      status,
      data: errMessage,
    };
  }
}
