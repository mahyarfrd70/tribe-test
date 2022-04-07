import React from 'react';

import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex justify-center shadow sticky" data-testid="header">
      <div className="navbar  max-w-4xl">
        <div className="flex-1">
          <Link href="/">
            <a className="normal-case text-xl">Tribe</a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="/signin">Sign in</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
