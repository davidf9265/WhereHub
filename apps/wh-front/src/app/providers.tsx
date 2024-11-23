'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface ProviderProps {
  className?: string;
  children: React.ReactNode;
}

const providers = ({ className, children }: ProviderProps) => {
  return (
    <>
      <NextUIProvider>
        <div className={className}>{children}</div>
      </NextUIProvider>
    </>
  );
};

export default providers;
