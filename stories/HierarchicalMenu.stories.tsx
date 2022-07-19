import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HierarchicalMenu, HierarchicalMenuProps } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: HierarchicalMenu,
  // argTypes: {
  //   children: {
  //     control: {
  //       type: 'text',
  //     },
  //   },
  // },
  // parameters: {
  //   controls: { expanded: true },
  // },
};

export default meta;

// test cases
const nodeTop = {
  id: '0',
  nodeData: {
    label: 'hello 0',
  },
  children: [
    {
      id: '01',
      nodeData: {
        label: 'hello 01',
      },
    },
    {
      id: '02',
      nodeData: {
        label: 'hello 02',
      },
      children: [
        {
          id: '021',
          nodeData: {
            label: 'hello 021',
          },
        },
      ],
    },
  ],
};

const Template: Story<HierarchicalMenuProps> = (args) => (
  <HierarchicalMenu menuTree={nodeTop} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
