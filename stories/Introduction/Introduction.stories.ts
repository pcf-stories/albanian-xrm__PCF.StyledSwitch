import { StoryObj } from '@storybook/html';
//@ts-ignore
import storyHtml from './Introduction.stories.html';

import './Introduction.stories.css';

export default {
  title: "AlbanianXrm's StyledSwitch",
};

export const Introduction = {
  render: () => storyHtml,
  decorators: [],
  parameters: {},
} as StoryObj;
