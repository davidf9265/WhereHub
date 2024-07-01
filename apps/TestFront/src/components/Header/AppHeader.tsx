import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';

import wherehublogo from '../../../public/wherehublogo.svg';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';

const AppHeader = () => {
  const { user, getToken } = useKindeBrowserClient();

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Image
          className="mx-2"
          src={wherehublogo}
          width={20}
          height={20}
          alt="wherehublogo"
        />
        <p className="font-bold text-inherit">WhereHub</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="secondary" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/planning">
            Planning
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/org">
            My org
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name={user?.given_name + ' ' + user?.family_name}
                description="Product Designer"
                avatarProps={{
                  src: user?.picture ?? undefined,
                }}
                as="button"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <LoginLink>Sign in</LoginLink>
            </NavbarItem>
            <NavbarItem>
              <RegisterLink>Sign up</RegisterLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default AppHeader;
