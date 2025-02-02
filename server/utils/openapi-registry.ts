import z from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export type OpenAPIEndpoint = {
  /** 接口标签 */
  tags: string[];
  /** 接口路径，如 '/api/users' */
  path: string;
  /** 请求方法，如 'get' 或 'post' */
  method: string;
  /** 接口操作ID */
  operationId?: string;
  /** 接口描述 */
  summary?: string;
  /** 接口详细描述 */
  description?: string;
  /** query string parameter */
  querySchema?: z.ZodObject<any, any>;
  /** path parameter */
  pathParamsSchema?: z.ZodObject<any, any>;
  /** request body */
  bodySchema?: z.ZodObject<any, any>;
  /** response body */
  responseSchema?: z.ZodType<any, any>;
};

// 内部存储接口注册信息
const registry: OpenAPIEndpoint[] = [];

/**
 * 注册一个 OpenAPI 接口
 * @param data OpenAPI 接口数据
 */
export function defineOpenAPI(data: OpenAPIEndpoint) {
  registry.push(data);
}

/**
 * 获取已注册的接口数据
 */
export function getOpenAPIRegistry() {
  return registry;
}
