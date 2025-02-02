import { readValidatedBody } from 'h3';
import z from 'zod';

export const pathParamsSchema = z.object({
  id: z.string().uuid().describe('学生 ID'),
});

export const bodySchema = z.object({
  name: z.string().min(1).max(100).describe('学生姓名'),
  address: z.string().min(10).max(100).describe('学生地址'),
});

export const responseSchema = z.object({
  message: z.string(),
});

defineOpenAPI({
  tags: ['学生'],
  path: '/api/student/{id}',
  method: 'put',
  operationId: 'student-update',
  summary: '更新学生信息',
  pathParamsSchema: pathParamsSchema,
  bodySchema: bodySchema,
  responseSchema: responseSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, pathParamsSchema.parse);
  const body = await readValidatedBody(event, bodySchema.parse);
  console.log(params, body);
  return {
    message: 'success',
  };
});
