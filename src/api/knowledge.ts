import http from "@/http";

export const getPageList = (data: any) => {
  return http<any, any>({
    url: "/api/knowledge/page_list",
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

export const save = (data: any) => {
  return http({
    url: "/api/knowledge/save",
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

export const deleteMany = (data: any) => {
  return http({
    url: "/api/knowledge/delete",
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
