import {action} from '@storybook/addon-actions';

import type {Meta, Story} from '@storybook/react';
import {useState} from 'react';

import Card from '.';
import type {CardProps} from '.';

export default {
  title: 'View/Card',
  component: Card,
} as Meta;

export const Default: Story<CardProps> = ({likesCount, ...args}) => {
  const [reacted, setReacted] = useState(false);

  return (
    <Card
      {...args}
      likesCount={reacted ? likesCount + 1 : likesCount}
      reacted={reacted}
      onReact={() => setReacted((prev) => !prev)}
      onDeletePost={action('delete-clicked')}
    />
  );
};

Default.args = {
  name: 'Mahyar Fard',
  title: 'Card Title',
  body: 'This is a body for Card.',
  commentsCount: 5,
  createdAt: '2022-04-04T10:14:46.878Z',
  hasDeletePermission: true,
  likesCount: 40,
};
