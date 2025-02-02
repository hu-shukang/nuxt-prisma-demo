import { getValidatedRouterParams } from 'h3';
import z from 'zod';

export const pathParamsSchema = z.object({
  id: z.string().uuid().describe('学生 ID'),
});

export const responseSchema = z.object({
  message: z.string(),
});

defineOpenAPI({
  tags: ['学生'],
  path: '/api/student/{id}',
  method: 'delete',
  operationId: 'student-delete',
  summary: '删除学生',
  pathParamsSchema: pathParamsSchema,
  responseSchema: responseSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, pathParamsSchema.parse);
  console.log(params);
  return {
    message: 'success',
  };
});
