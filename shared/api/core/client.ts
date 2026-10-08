import notfetch from "@astralis-os/notfetch";
import { API_BASE_URL } from "@/shared/api/core/config";
import { registerRequestInterceptor } from "@/shared/api/core/interceptors/request";
import { registerResponseInterceptor } from "@/shared/api/core/interceptors/response";

export const api = notfetch.create({ baseURL: API_BASE_URL });

registerRequestInterceptor(api);

const { refreshAccessToken } = registerResponseInterceptor(api);

export { refreshAccessToken };
