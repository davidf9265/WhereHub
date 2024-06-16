'use client';

import { organization } from '@kinde/management-api-js';
import React, { use, useEffect, useState } from 'react';

interface TeamPageProps {
  orgCode: string;
  getOrganization: (orgCode: string) => Promise<any>;
}
const TeamPage = ({ orgCode, getOrganization }: TeamPageProps) => {
  const [org, setOrg] = useState<organization | undefined>();

  const setThisOrg = async () => {
    const orgResponse = await getOrganization(orgCode);
    setOrg(orgResponse);
  };

  useEffect(() => {
    if (org) {
      console.log(org);
    } else {
      setThisOrg();
    }
  }, [org]);

  return (
    <section className="p-1">
      <h1>Team Page</h1>
      <h1>Organization: {org?.name}</h1>
    </section>
  );
};

export default TeamPage;
