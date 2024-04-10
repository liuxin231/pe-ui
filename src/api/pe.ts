import http from "@/http";

export const upload = (data: any) => {
  return http({
    url: "/api/pe/upload",
    method: "POST",
    data,
    headers: { "Content-Type": "multipart/form-data" },
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
export const update_file_byte = (data: any) => {
  return http({
    url: "/api/pe/update_file_byte",
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
export const analysis = (fileId: string) => {
  return http({
    url: "/api/pe/analysis/" + fileId,
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

export const get_upload_file_info = () => {
  return http({
    url: "/api/pe/get_upload_file_info",
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

export const init_upload_file = () => {
  return http({
    url: "/api/pe/init_upload_file",
    method: "POST",
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
