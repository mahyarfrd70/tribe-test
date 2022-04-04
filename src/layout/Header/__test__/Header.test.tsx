import {render} from '@testing-library/react';

import Header from '..';

describe('Header component', () => {
  it('check links', () => {
    const {getByText} = render(<Header />);
    expect(getByText('Tribe')).toHaveAttribute('href', '/');
    expect(getByText('Sign in')).toHaveAttribute('href', '/signin');
    expect(getByText('Sign up')).toHaveAttribute('href', '/signup');
  });
});
