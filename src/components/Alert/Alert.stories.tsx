import type {Story, Meta} from '@storybook/react';

import Alert from '.';
import type {AlertProps} from '.';

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args}>Your purchase has been confirmed!</Alert>;

export const Success = Template.bind({});
Success.args = {
  alertType: 'alert-success',
};

export const Info = Template.bind({});
Info.args = {
  alertType: 'alert-info',
};

export const Error = Template.bind({});
Error.args = {
  alertType: 'alert-error',
};

export const Warnings = Template.bind({});
Warnings.args = {
  alertType: 'alert-warning',
};
