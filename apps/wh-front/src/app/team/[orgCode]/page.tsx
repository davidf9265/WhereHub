import TeamPage from './TeamPage';

import { getOrganizationFromKindeManagementAPI } from '../../actions';

import React from 'react';

const page = ({ params }: { params: { orgCode: string } }) => {
  return (
    <TeamPage
      orgCode={params.orgCode}
      getOrganization={getOrganizationFromKindeManagementAPI}
    ></TeamPage>
  );
};

export default page;
