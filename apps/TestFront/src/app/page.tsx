'use server';

import { init } from '@kinde/management-api-js';
import Home from './Home';
import {
  addSingleUserToOrganizationFromKindeManagementAPI,
  getOrganizationsFromKindeManagementAPI,
} from './actions';

export default async function Index() {
  init();

  return (
    <div className="flex gap-4 items-center justify-around p-8">
      <Home
        getOrganizations={getOrganizationsFromKindeManagementAPI}
        joinTeam={addSingleUserToOrganizationFromKindeManagementAPI}
      ></Home>
    </div>
  );
}
