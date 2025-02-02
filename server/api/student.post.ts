import { readValidatedBody } from 'h3';
import z from 'zod';

export const bodySchema = z.object({
  name: z.string().min(1).max(100).describe('学生姓名'),
  address: z.string().min(10).max(100).describe('学生地址'),
});

export const responseSchema = z.object({
  message: z.string(),
});

defineOpenAPI({
  tags: ['学生'],
  path: '/api/student',
  method: 'post',
  operationId: 'student-add',
  summary: '添加学生',
  bodySchema: bodySchema,
  responseSchema: responseSchema,
});

export default defineEventHandler(async (event) => {
  const params = await readValidatedBody(event, bodySchema.parse);
  console.log(params);
  return {
    message: 'success',
  };
});
