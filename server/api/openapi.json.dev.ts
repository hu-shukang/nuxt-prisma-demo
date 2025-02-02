// server/api/openapi.json.ts
import { defineEventHandler } from 'h3';
import { ZodOptional } from 'zod';
import { createSchema } from 'zod-openapi';

export default defineEventHandler(() => {
  const endpoints = getOpenAPIRegistry();
  const paths: Record<string, any> = {};

  endpoints.forEach((ep) => {
    // 如果该路径还未初始化，则先初始化
    if (!paths[ep.path]) {
      paths[ep.path] = {};
    }
    const method = ep.method.toLowerCase();

    // 构造查询参数
    const queryParameters = ep.querySchema
      ? Object.entries(ep.querySchema.shape).map(([name, schema]) => {
          return {
            name,
            in: 'query',
            required: !(schema instanceof ZodOptional),
            ...createSchema(schema as any),
          };
        })
      : [];

    // 生成 path 参数，按照 OpenAPI 规范，path 参数必须为必填项
    const pathParameters = ep.pathParamsSchema
      ? Object.entries(ep.pathParamsSchema.shape).map(([name, schema]) => {
          return {
            name,
            in: 'path',
            required: true,
            ...createSchema(schema as any),
          };
        })
      : [];

    const parameters = [...pathParameters, ...queryParameters];

    // 构造请求体（如果存在）
    const requestBody = ep.bodySchema
      ? {
          content: {
            'application/json': createSchema(ep.bodySchema),
          },
        }
      : undefined;

    // 构造响应体
    const responses = ep.responseSchema
      ? {
          200: {
            description: '成功响应',
            content: {
              'application/json': createSchema(ep.responseSchema),
            },
          },
        }
      : {
          200: { description: '成功响应' },
        };

    paths[ep.path][method] = {
      tags: ep.tags,
      operationId: ep.operationId || `${method}_${ep.path}`,
      summary: ep.summary,
      description: ep.description,
      parameters,
      ...(requestBody ? { requestBody } : {}),
      responses,
    };
  });

  const openApiDoc = {
    openapi: '3.0.0',
    info: {
      title: 'My API test',
      version: '1.0.0',
      description: 'This is a test API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: '学生',
        description: '学生相关操作',
      },
    ],
    paths,
  };

  return openApiDoc;
});
