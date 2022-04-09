import userEvent from '@testing-library/user-event';

import {render} from '@testing-library/react';

import TextInput from '..';

describe('components > TextInput', () => {
  it('valid and no info', async () => {
    expect.assertions(6);
    const mockChange = jest.fn();
    const {getByTestId, queryByTestId} = render(
      <TextInput name="email" type="email" value="test" onChange={mockChange} />,
    );
    const user = userEvent.setup();
    expect(getByTestId('email')).toHaveValue('test');
    expect(getByTestId('email')).toHaveAttribute('type', 'email');
    expect(getByTestId('email')).toHaveAttribute('name', 'email');
    await user.type(getByTestId('email'), 'text');
    expect(mockChange).toHaveBeenCalledTimes(4);
    expect(queryByTestId('email-invalid-text')).not.toBeInTheDocument();
    expect(queryByTestId('email-info-text')).not.toBeInTheDocument();
  });

  it('invalid and has info', () => {
    const mockChange = jest.fn();
    const {getByTestId, queryByTestId} = render(
      <TextInput
        name="email"
        type="email"
        invalidMessage="invalid message"
        infoText="info text"
        value="test"
        onChange={mockChange}
      />,
    );
    expect(getByTestId('email-invalid-text')).toBeInTheDocument();
    expect(getByTestId('email-invalid-text')).toHaveTextContent('invalid message');
    expect(queryByTestId('email-info-text')).not.toBeInTheDocument();
  });

  it('valid and has info', () => {
    const mockChange = jest.fn();
    const {getByTestId, queryByTestId} = render(
      <TextInput name="email" type="email" infoText="info text" value="test" onChange={mockChange} />,
    );
    expect(queryByTestId('email-invalid-text')).not.toBeInTheDocument();
    expect(getByTestId('email-info-text')).toBeInTheDocument();
    expect(getByTestId('email-info-text')).toHaveTextContent('info text');
  });
});
