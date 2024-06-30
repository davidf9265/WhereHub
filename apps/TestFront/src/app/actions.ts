'use server';

import {
  AddOrganizationUsersData,
  AddOrganizationUsersResponse,
  GetOrganizationsResponse,
  init,
  Organizations,
} from '@kinde/management-api-js';

export const initKindeManagementAPI = async () => {
  init();
};

export const getOrganizationsFromKindeManagementAPI = async () => {
  const organizations = await Organizations.getOrganizations();
  return organizations;
};

/**
 * @description Get an organization from the Kinde Management API.
 * @param orgcode
 * @returns
 */
export const getOrganizationFromKindeManagementAPI = async (
  orgcode: string
): Promise<GetOrganizationsResponse> => {
  const organization = await Organizations.getOrganization({ code: orgcode });
  return organization;
};

/**
 * @description Add a single user to an organization from the Kinde Management API.
 * @param orgcode The organization code.
 * @param requestUser The user to add to the organization.
 */
export const addSingleUserToOrganizationFromKindeManagementAPI = async (
  orgcode: string,
  requestUser: {
    id?: string;
    roles?: Array<string>;
    permissions?: Array<string>;
  }
): Promise<AddOrganizationUsersResponse> => {
  const addOrganizationParams: AddOrganizationUsersData = {
    orgCode: orgcode,
    requestBody: {
      users: [requestUser],
    },
  };
  const response = await Organizations.addOrganizationUsers(
    addOrganizationParams
  );
  return response;
};
