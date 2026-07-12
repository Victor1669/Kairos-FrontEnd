import { api } from "../Config/axiosConfig";

type FetchApiUploadProps = {
  route: string;
  formData: FormData;
};

type MessageResponse = { message: string };

type FetchApiUploadResponse<TResponse> = {
  status: number;
  success: boolean;
  responseData: TResponse & MessageResponse;
};

export async function fetchApiUpload<TResponse = MessageResponse>({
  route,
  formData,
}: FetchApiUploadProps): Promise<FetchApiUploadResponse<TResponse>> {
  try {
    const res = await api.post(`/${route}`, formData);

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
