import z from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export interface OpenAPIEndpoint {
  tags: string[]; // 接口标签
  path: string; // 接口路径，如 '/api/users'
  method: string; // 请求方法，如 'get' 或 'post'
  operationId?: string; // 可选的操作ID
  summary?: string; // 接口描述
  querySchema?: z.ZodObject<any, any>;
  pathParamsSchema?: z.ZodObject<any, any>;
  bodySchema?: z.ZodObject<any, any>;
  responseSchema?: z.ZodType<any, any>;
}

// 内部存储接口注册信息
const registry: OpenAPIEndpoint[] = [];

/**
 * 注册一个 API 的 OpenAPI 信息
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
