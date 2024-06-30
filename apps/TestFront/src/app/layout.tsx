'use client';

import { NextUIProvider } from '@nextui-org/react';
import './global.css';
import AppHeader from '../components/Header/AppHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <NextUIProvider>
          <AppHeader></AppHeader>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
