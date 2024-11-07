import EnvModule from './env';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppStore } from '../../redux/store';

namespace AxiosModule {
  let store: AppStore;
  export namespace Enums {
    export enum StatusCode {
      CLIENT_ERROR_BAD_REQUEST = 400,
      CLIENT_ERROR_CONFLICT = 409,
      CLIENT_ERROR_EXPECTATION_FAILED = 417,
      CLIENT_ERROR_FAILED_DEPENDENCY = 424,
      CLIENT_ERROR_FORBIDDEN = 403,
      CLIENT_ERROR_GONE = 410,
      CLIENT_ERROR_I_M_A_TEAPOT = 418,
      CLIENT_ERROR_LENGTH_REQUIRED = 411,
      CLIENT_ERROR_LOCKED = 423,
      CLIENT_ERROR_LOGIN_TIMEOUT = 440,
      CLIENT_ERROR_METHOD_NOT_ALLOWED = 405,
      CLIENT_ERROR_MISDIRECTED_REQUEST = 421,
      CLIENT_ERROR_NOT_ACCEPTABLE = 406,
      CLIENT_ERROR_NOT_FOUND = 404,
      CLIENT_ERROR_PAYLOAD_TOO_LARGE = 413,
      CLIENT_ERROR_PAYMENT_REQUIRED = 402,
      CLIENT_ERROR_PRECONDITION_FAILED = 412,
      CLIENT_ERROR_PRECONDITION_REQUIRED = 428,
      CLIENT_ERROR_PROXY_AUTH_REQUIRED = 407,
      CLIENT_ERROR_RANGE_NOT_SATISFIABLE = 416,
      CLIENT_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
      CLIENT_ERROR_REQUEST_TIMEOUT = 408,
      CLIENT_ERROR_RETRY_WITH = 449,
      CLIENT_ERROR_TOO_MANY_REQUESTS = 429,
      CLIENT_ERROR_UNAUTHORIZED = 401,
      CLIENT_ERROR_UNAVAILABLE_FOR_LEGAL_REASONS = 451,
      CLIENT_ERROR_UNPROCESSABLE_ENTITY = 422,
      CLIENT_ERROR_UNSUPPORTED_MEDIA_TYPE = 415,
      CLIENT_ERROR_UPGRADE_REQUIRED = 426,
      CLIENT_ERROR_URI_TOO_LONG = 414,
      INFO_CONTINUE = 100,
      INFO_PROCESSING = 102,
      INFO_SWITCHING_PROTOCOLS = 101,
      REDIRECT_FOUND = 302,
      REDIRECT_MOVED_PERMANENTLY = 301,
      REDIRECT_MULTIPLE_CHOICES = 300,
      REDIRECT_NOT_MODIFIED = 304,
      REDIRECT_PERMANENT = 308,
      REDIRECT_SEE_OTHER = 303,
      REDIRECT_SWITCH_PROXY = 306,
      REDIRECT_TEMP = 307,
      REDIRECT_USE_PROXY = 305,
      SERVER_ERROR_BAD_GATEWAY = 502,
      SERVER_ERROR_BANDWIDTH_LIMIT_EXCEEDED = 509,
      SERVER_ERROR_GATEWAY_TIMEOUT = 504,
      SERVER_ERROR_HTTP_VERSION_NOT_SUPPORTED = 505,
      SERVER_ERROR_INSUFFICIENT_STORAGE = 507,
      SERVER_ERROR_INTERNAL = 500,
      SERVER_ERROR_LOOP_DETECTED = 508,
      SERVER_ERROR_NETWORK_AUTH_REQUIRED = 511,
      SERVER_ERROR_NOT_EXTENDED = 510,
      SERVER_ERROR_NOT_IMPLEMENTED = 501,
      SERVER_ERROR_SERVICE_UNAVAILABLE = 503,
      SERVER_ERROR_VARIANT_ALSO_NEGOTIATES = 506,
      SUCCESS_ACCEPTED = 202,
      SUCCESS_ALREADY_REPORTED = 208,
      SUCCESS_CREATED = 201,
      SUCCESS_IM_USED = 229,
      SUCCESS_MULTI_STATUS = 207,
      SUCCESS_NO_CONTENT = 204,
      SUCCESS_NON_AUTHORITATIVE_INFO = 203,
      SUCCESS_OK = 200,
      SUCCESS_PARTIAL_CONTENT = 206,
      SUCCESS_RESET_CONTENT = 205,
    }
    export enum PollingTime {
      NORMAL = 30 * 1000, // This is the average polling time and it refetches every 30 seconds
      SHIPMENT_PROPOSALS = 50 * 60 * 10000, // This is shipment proposals polling time and it refetches every 5 minutes
    }
  }

  export namespace Types {
    export interface IUnifiedResponse<T> {
      statusCode: number;
      message: string;
      _metadata: {
        language: string;
        timestamp: number;
        timezone: string;
        path: string;
        version: string;
        repoVersion: string;
      };
      data: T;
    }
  }

  export namespace Utils {
    export const injectStore = (injectedStore: AppStore) => {
      store = injectedStore;
    };

    export const _axios: AxiosInstance = axios.create({
      //application host
      baseURL: EnvModule.MAIN_API,
      timeout: 30000,
    });

    export type AxiosBaseQuery = BaseQueryFn<{
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      extraOptions?: {
        alternativeContextUrl?: string;
      };
    }>;
    type contxtUrl = { contextUrl: string };

    // axios custom base query
    export const AxiosBaseQuery =
      (
        { contextUrl }: contxtUrl = { contextUrl: '' } // set undefined baseUrl to ''
      ): AxiosBaseQuery =>
      async ({ url, method, data, params, headers, extraOptions }) => {
        try {
          // base query at a core level
          const res = await _axios({
            url:
              (extraOptions?.alternativeContextUrl
                ? extraOptions.alternativeContextUrl
                : contextUrl) + url,
            method,
            data,
            params,
            headers,
          });
          return { data: res.data };
        } catch (error) {
          // can catch and log errors here
          const err = error as AxiosError;
          return {
            error: {
              status: err.response?.status,
              data:
                err.response?.data || 'Unknown error. please contact support',
            },
          };
        }
      };

    // inject data into request headers
    _axios.interceptors.request.use(
      (config) => {
        config.headers['Accept'] = 'application/json';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    _axios.interceptors.response.use(
      (response) => response,
      async (originalReqErr) => {
        // can catch and log errors here
        return Promise.reject(originalReqErr);
      }
    );
  }
}

export default AxiosModule;
