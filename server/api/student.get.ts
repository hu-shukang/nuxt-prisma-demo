import { getValidatedQuery } from 'h3';
import z from 'zod';

export const querySchema = z.object({
  name: z.string().optional().describe('学生姓名'),
  address: z.string().optional().describe('学生地址'),
  pageSize: z.coerce.number().int().min(5).default(10).describe('每页数量'),
  page: z.coerce.number().int().min(1).default(1).describe('页码'),
});

export const responseSchema = z.array(
  z.object({
    id: z.string().uuid().describe('学生 ID'),
    name: z.string().min(1).max(100).describe('学生姓名'),
    address: z.string().min(10).max(100).describe('学生地址'),
    createdAt: z.string().date().describe('创建时间'),
    updatedAt: z.string().date().describe('更新时间'),
  }),
);

defineOpenAPI({
  tags: ['学生'],
  path: '/api/student',
  method: 'get',
  operationId: 'student-query',
  summary: '查询学生',
  description: '查询学生列表',
  querySchema: querySchema,
  responseSchema: responseSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, querySchema.parse);
  console.log(params);
  return [
    {
      id: '123',
      name: '张三',
      address: '北京市朝阳区',
      createdAt: '2021-01-01T00:00:00Z',
      updatedAt: '2021-01-01T00:00:00Z',
    },
    {
      id: '456',
      name: '李四',
      address: '上海市浦东新区',
      createdAt: '2021-01-01T00:00:00Z',
      updatedAt: '2021-01-01T00:00:00Z',
    },
  ];
});
