import { Organizations, init } from '@kinde/management-api-js';

export async function GET() {
  console.log('about to fetch orgs...');

  init();
  const organizations = await Organizations.getOrganizations();

  console.log('organizations >>> ', organizations);

  return Response.json(organizations);
}

// export const getOrganizationsFromKindeManagementAPI = async () => {
//   const organizations = await Organizations.getOrganizations();
//   return organizations;
// };
