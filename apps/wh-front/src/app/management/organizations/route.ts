import { Organizations, init } from '@kinde/management-api-js';

export async function GET() {
  init();
  const organizations = await Organizations.getOrganizations();

  return Response.json(organizations);
}
