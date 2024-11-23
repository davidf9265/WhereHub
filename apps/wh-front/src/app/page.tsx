'use server';

import Home from './Home';
import {
  addSingleUserToOrganizationFromKindeManagementAPI,
  getOrganizationsFromKindeManagementAPI,
  initKindeManagementAPI,
} from './actions';

export default async function Index() {
  console.log(process.env.KINDE_DOMAIN);
  console.log(process.env.KINDE_MANAGEMENT_CLIENT_ID);
  console.log(process.env.KINDE_MANAGEMENT_CLIENT_SECRET);
  // init();
  initKindeManagementAPI();

  // await fetch('/management');

  return (
    <div className="flex gap-4 items-center justify-around p-8">
      <Home
        getOrganizations={getOrganizationsFromKindeManagementAPI}
        joinTeam={addSingleUserToOrganizationFromKindeManagementAPI}
      ></Home>
    </div>
  );
}
