'use client';

import { organization } from '@kinde/management-api-js';
import { Button } from '@nextui-org/react';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TeamPageProps {
  orgCode: string;
  getOrganization: (orgCode: string) => Promise<any>;
}
const TeamPage = ({ orgCode, getOrganization }: TeamPageProps) => {
  const [org, setOrg] = useState<organization | undefined>();
  const router = useRouter();

  const setThisOrg = async () => {
    const orgResponse = await getOrganization(orgCode);
    setOrg(orgResponse);
  };

  const navigateToTeamManagement = () => {
    router.push(`/team/${orgCode}/management`);
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
      <Button onClick={navigateToTeamManagement}>Manage</Button>
    </section>
  );
};

export default TeamPage;
