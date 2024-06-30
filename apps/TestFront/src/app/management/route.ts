import { init } from '@kinde/management-api-js';

export async function GET() {
  init();

  console.log('Kinde Management Setup OK!');
  return Response.json({ message: 'Kinde Management Setup OK!' });
}
