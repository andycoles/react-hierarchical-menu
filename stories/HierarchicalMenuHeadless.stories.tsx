import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LevelProps, useHierarchicalMenu } from '../src/HierarchicalMenuHeadless';

const meta: Meta = {
  title: 'Welcome',
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

const LevelComponent = ({
  levelData,
  onNextLevelClick = () => {},
  ...restLevelProps
}: LevelProps) => {
  let topLevel;
  if (!levelData) return null;
  if (Array.isArray(levelData)) {
    topLevel = levelData.map((node) => (
    <>
      <button onClick={() => { onNextLevelClick(node.id) }} key={node.id}>
        {node.nodeData.label}
      </button>
      <br />
    </>
    ));
  } else {
    topLevel = (
      <button onClick={() => { onNextLevelClick(levelData.id) }}>
        {levelData.nodeData.label}
      </button>
    );
  }
  return <div {...restLevelProps}>{topLevel}</div>;
};

const Template = (args) => {
  const {
    getRootProps,
    getLevelsContainerProps,
    getLevelProps,
    renderedLevels,
  } = useHierarchicalMenu({ menuTree: nodeTop });
  return (
    <div {...getRootProps()}>
      <div {...getLevelsContainerProps()}>
        {renderedLevels.map((level, index) => {
          return (
            <LevelComponent {...getLevelProps({ index })} />
          );
        })}
      </div>
    </div>
  );
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const HierarchicalMenuHeadless = Template.bind({});

HierarchicalMenuHeadless.args = {};
