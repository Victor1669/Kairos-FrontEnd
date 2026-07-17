import { fetchApi } from "@Utils/fetchApi";

import type { ReviewType } from "./ReviewType";

interface PostReviewApiBody {
  stars: number;
  description: string;
}

export async function postReviewApi(
  productId: number,
  body: PostReviewApiBody,
) {
  return fetchApi<PostReviewApiBody>({
    method: "post",
    route: `review/${productId}`,
    body,
  });
}

export async function reviewsApi(productId: number) {
  return fetchApi<object, ReviewType[]>({
    method: "get",
    route: `review/${productId}`,
  });
}
