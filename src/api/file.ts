import http from "@/http";

export const deleteMany = (data: any) => {
  return http({
    url: "/api/file/delete",
    method: "POST",
    data,
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
export const getPageList = (data: any) => {
  return http<any, any>({
    url: "/api/file/page_list",
    method: "GET",
    data,
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
