'use client';

import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';
// import Auth from './auth';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
