import Request from "./modules";
import type { RequestConfig } from "@/http/modules";

const request = new Request({
  baseURL: "",
  timeout: 1000 * 120,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: RequestConfig) => {
      config.customStartTime = new Date().getTime(); // 记录请求时间
      return config;
    },
    requestInterceptorsCatch: (error) => {
      // message.error(`${error || '接口状态异常，请重试或联系管理员！'} [REQ]`)
      console.error("requestInterceptorsCatch failed:" + error);
      return error;
    },

    // 响应拦截器
    responseInterceptors: (result: any) => {
      // const {
      //   config: { customSuccessCode = ["200"], customStartTime },
      //   headers,
      // } = result;
      //
      // if (headers?.code === undefined) {
      //   message.error(`The response status code is missing. [RES]`);
      //   console.error(
      //     `responseInterceptors failed: The response status code is missing`,
      //   );
      // }

      // let data = result.data;
      // if (data?.code === undefined) {
      //   data = {
      //     code: headers.code,
      //     msg: Base64Decrypt(headers.msg),
      //     data: result.data,
      //   };
      // }
      // const { code, msg } = data;
      // if (code == 402) {
      //   check402(msg);
      // } else if (code == 410) {
      //   check410();
      // } else if (!customSuccessCode.includes(code)) {
      //   message.error(`${msg} ${code ? "[" + code + "]" : ""} `);
      //   console.error(`responseInterceptors failed: ${code} / ${msg}`);
      // }
      return result;
    },
    responseInterceptorsCatch: (error) => {
      return error;
    },
  },
});

export interface IResponse<T> {
  code: number;
  msg: string;
  data?: T;
}
interface IRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T;
}
/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {IRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const _Request = <D, T>(config: IRequestConfig<D, T>): Promise<any> => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<IResponse<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

// 取消全部请求

export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default _Request;
