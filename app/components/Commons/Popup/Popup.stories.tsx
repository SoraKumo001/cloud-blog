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
        <div className="w-[640px] h-[640px]">
          <div className="bg-red-50 absolute w-16 h-16 left-32 top-32">
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
