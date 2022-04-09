import type {Story, Meta} from '@storybook/react';

import Avatar from '.';
import type {AvatarProps} from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Tribe Community',
  className: 'bg-purple-800',
};
