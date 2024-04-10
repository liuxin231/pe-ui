import http from "@/http";

export const encodeApi = (data: string) => {
  return http({
    url: "/api/tools/encode/" + data,
    method: "GET",
    interceptors: {
      requestInterceptors(res) {
        return res;
      },
      responseInterceptors(result) {
        return result;
      },
    },
  });
};
export const decodeApi = (data: string) => {
  return http({
    url: "/api/tools/decode/" + data,
    method: "GET",
    interceptors: {
      requestInterceptors(res) {
        return res;
      },
      responseInterceptors(result) {
        return result;
      },
    },
  });
};
