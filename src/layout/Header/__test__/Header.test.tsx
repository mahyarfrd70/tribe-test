import {render} from '@testing-library/react';

import Header from '..';

jest.mock('@tribeplatform/react-sdk/hooks');

describe('Header component', () => {
  it('loggedin header', () => {
    const {queryByText, getByText, getByTestId} = render(<Header />);

    expect(getByText('Tribe')).toHaveAttribute('href', '/');

    expect(queryByText('Sign in')).not.toBeInTheDocument();
    expect(queryByText('Sign up')).not.toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
    expect(getByTestId('header-avatar')).toHaveTextContent('MF');
  });
  it('not loggedin header', () => {
    const {queryByText, getByText, queryByTestId} = render(<Header />);
    expect(getByText('Tribe')).toHaveAttribute('href', '/');
    expect(getByText('Sign in')).toHaveAttribute('href', '/signin');
    expect(getByText('Sign up')).toHaveAttribute('href', '/signup');
    expect(queryByText('Logout')).not.toBeInTheDocument();
    expect(queryByTestId('header-avatar')).not.toBeInTheDocument();
  });
});
