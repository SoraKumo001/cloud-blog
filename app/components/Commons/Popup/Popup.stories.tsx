import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popup } from '.';

const meta: Meta<typeof Popup> = {
  component: Popup,
  parameters: {},
  args: {
    posX: 'right',
    children: <div className="bg-white">ContentValue</div>,
  },
  decorators: [
    (Story, { parameters, args }) => {
      const [isOpen, setIsOpen] = useState(true);
      parameters.setIsOpen = setIsOpen;
      return (
        <div className="size-[640px]">
          <div className="absolute top-32 left-32 size-16 bg-red-50">
            <Story args={{ ...args, isOpen }} />
            ABCD
          </div>
        </div>
      );
    },
  ],
};
export default meta;

export const Primary: StoryObj<typeof Popup> = {
  args: {},
};
