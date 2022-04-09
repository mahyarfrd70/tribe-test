import {render} from '@testing-library/react';

import Alert from '..';

describe('components > Alert', () => {
  it('without children', () => {
    const {queryByTestId} = render(<Alert />);
    expect(queryByTestId('alert')).not.toBeInTheDocument();
  });

  it('with children', () => {
    const {getByTestId} = render(<Alert>test</Alert>);
    expect(getByTestId('alert')).toBeInTheDocument();
    expect(getByTestId('alert')).toHaveTextContent('test');
  });

  it('with className', () => {
    const {getByTestId} = render(<Alert alertType="alert-error">test</Alert>);
    expect(getByTestId('alert')).toHaveClass('alert-error');
  });
});
