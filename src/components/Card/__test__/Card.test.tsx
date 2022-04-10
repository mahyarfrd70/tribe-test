import userEvent from '@testing-library/user-event';
import {formatISO, subDays} from 'date-fns';

import {render} from '@testing-library/react';

import Card from '..';

describe('components > Card', () => {
  it('with permission to delete and not reacted', async () => {
    expect.assertions(15);
    const mockDelete = jest.fn();
    const mockReact = jest.fn();
    const date = formatISO(subDays(new Date(), 5));
    const {getByTestId} = render(
      <Card
        title="title"
        body="<p>body</p>"
        commentsCount={10}
        createdAt={date}
        likesCount={40}
        name="mahyar fard"
        reacted={false}
        hasDeletePermission={true}
        onDeletePost={mockDelete}
        onReact={mockReact}
      />,
    );
    const user = userEvent.setup();
    expect(getByTestId('card-title')).toHaveTextContent('title');
    expect(getByTestId('card-body').innerHTML).toBe('<p>body</p>');
    expect(getByTestId('card-commentscount')).toHaveTextContent('10 comments');
    expect(getByTestId('card-createdat')).toHaveTextContent('5 days ago');
    expect(getByTestId('card-likescount')).toHaveTextContent('40 likes');
    expect(getByTestId('card-avatar')).toHaveTextContent('MF');
    expect(getByTestId('card-createdby')).toHaveTextContent('By Mahyar Fard');
    expect(getByTestId('card-like-icon').getAttribute('fill')).toBe('none');
    expect(getByTestId('card-delete-button')).toBeInTheDocument();
    expect(mockDelete).toHaveBeenCalledTimes(0);
    expect(mockReact).toHaveBeenCalledTimes(0);
    await user.click(getByTestId('card-delete-button'));
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockReact).toHaveBeenCalledTimes(0);
    await user.click(getByTestId('card-like-button'));
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockReact).toHaveBeenCalledTimes(1);
  });

  it('without permission to delete and reacted', async () => {
    expect.assertions(4);
    const mockReact = jest.fn();
    const {getByTestId, queryByTestId} = render(
      <Card
        title="title"
        body="<p>body</p>"
        commentsCount={10}
        createdAt="2022-04-04T10:14:46.878Z"
        likesCount={40}
        name="mahyar fard"
        reacted={true}
        hasDeletePermission={false}
        onDeletePost={jest.fn()}
        onReact={mockReact}
      />,
    );
    const user = userEvent.setup();
    expect(getByTestId('card-like-icon').getAttribute('fill')).toBe('currentColor');
    expect(queryByTestId('card-delete-button')).not.toBeInTheDocument();
    expect(mockReact).toHaveBeenCalledTimes(0);
    await user.click(getByTestId('card-like-button'));
    expect(mockReact).toHaveBeenCalledTimes(1);
  });
});
