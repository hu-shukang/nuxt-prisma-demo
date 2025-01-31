import { getValidatedRouterParams } from 'h3';
import z from 'zod';

const paramSchema = z.object({
  id: z.string().uuid(),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramSchema.parse);
  console.log(params);
  return {
    message: 'Hello, world!',
  };
});
