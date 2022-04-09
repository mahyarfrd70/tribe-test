import React from 'react';

import Link from 'next/link';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Container from '@/components/Container';
import If from '@/components/If';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';

const Header = () => {
  const logout = useLogout();
  const {isLoggedIn, user} = useAuth();

  return (
    <div className="shadow sticky top-0 bg-white z-50" data-testid="header">
      <Container className="navbar">
        <div className="flex-1">
          <Link href="/">
            <a className="normal-case text-xl">Tribe</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <If condition={!isLoggedIn}>
              <li>
                <Link href="/signin">Sign in</Link>
              </li>
              <li>
                <Link href="/signup">Sign up</Link>
              </li>
            </If>
            <If condition={isLoggedIn}>
              <li>
                <Button onClick={logout} buttonTypeClass="btn-ghost" className="self-center">
                  Logout
                </Button>
              </li>
              <li>
                <Avatar dataTestId="header-avatar" name={user?.name as string} />
              </li>
            </If>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Header;
