import { fetchApi } from "@Utils/fetchApi";

import type { AddressFields } from "@Address/AddressValidation";

export async function registerAddressApi(body: AddressFields) {
  return fetchApi({
    method: "post",
    route: `addresses/`,
    body,
  });
}
