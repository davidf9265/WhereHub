'use client';
import React from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Spinner } from '@nextui-org/react';

const Planning = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="grid place-content-center">
      {isLoading && <Spinner color="white" />}
      {!isLoading && !isAuthenticated && <div>you may have to login</div>}
      {isAuthenticated && (
        <div>
          <h1>Planning page</h1>
        </div>
      )}
    </div>
  );
};

export default Planning;
