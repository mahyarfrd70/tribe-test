import {render} from '@testing-library/react';

import Avatar from '..';

describe('components > Avatar', () => {
  it('className and name', () => {
    const {getByTestId} = render(<Avatar dataTestId="avatar" name="mahyar fard" className="test-class" />);
    expect(getByTestId('avatar')).toHaveTextContent('MF');
    expect(getByTestId('avatar')).toHaveClass('test-class');
  });
});
