import * as React from 'react';
import { flushSync } from 'react-dom';
import {
  calcWidths,
  getInitNextLevelData,
  getRootProps,
} from './useHierarchicalMenu.services';
import {
  HierarchicalMenuParameters,
  ID,
  LevelData,
} from './useHierarchicalMenu.types';

export default function useHierarchicalMenu({
  menuTree,
}: HierarchicalMenuParameters) {
  // const [prevLevelData, setPrevLevelData] = React.useState<LevelData>(undefined)
  const [currLevelData, setCurrLevelData] = React.useState<LevelData>(menuTree);
  const [nextLevelData, setNextLevelData] = React.useState<LevelData>(
    getInitNextLevelData(menuTree)
  );
  const [currLevelNodeId, setCurrLevelNodeId] = React.useState<ID>('0');
  // TODO implement down and up hierarchy
  // const [lastHierarchyDirection, setLastHierarchyDirection] = React.useState('');
  const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
  const [transformVal, setTransformVal] = React.useState<string>('0');
  const [transitionDecl, setTransitionDecl] = React.useState<boolean>(true);

  const widths = calcWidths(undefined, currLevelData, nextLevelData);

  const onNextLevelClick = (clickedNodeId: ID) => {
    let nextLevel: LevelData;
    if (Array.isArray(currLevelData)) {
      nextLevel = currLevelData.find(
        (node) => node.id === clickedNodeId
      )?.children;
    } else {
      nextLevel = currLevelData?.children;
    }
    if (nextLevel) {
      flushSync(() => {
        setNextLevelData(nextLevel);
        setCurrLevelNodeId(clickedNodeId);
        setIsTransitioning(true);
      });
      setTransformVal(`-${widths.levelWidth}`);
    }
  };

  const handleTransitionEnd = () => {
    let currLevel: LevelData;
    if (Array.isArray(currLevelData)) {
      currLevel = currLevelData.find(
        (node) => node.id === currLevelNodeId
      )?.children;
    } else {
      currLevel = currLevelData?.children;
    }
    flushSync(() => {
      setCurrLevelData(currLevel);
      setTransitionDecl(false);
    });
    flushSync(() => {
      setTransformVal('0');
    });
    setTransitionDecl(true);
    setIsTransitioning(false);
  };

  const getLevelsContainerProps = () => {
    return {
      style: {
        display: 'flex',
        height: '100%',
        position: 'relative',
        pointerEvents: isTransitioning ? 'none' : 'auto',
        ...(transitionDecl
          ? {
              transition: 'transform 0.5s ease',
            }
          : {}),
        width: widths.containerWidth,
        transform: `translateX(${transformVal})`,
      },
      onTransitionEnd: handleTransitionEnd,
    };
  };

  const getLevelProps = ({ index }: { index: number }) => {
    const baseObj = {
      style: {
        width: widths.levelWidth,
        display: 'block',
        height: '100%',
        overflowY: 'auto',
      },
      onNextLevelClick: onNextLevelClick,
    };
    if (index === 0) {
      return {
        ...baseObj,
        levelData: undefined,
      };
    } else if (index === 1) {
      return {
        ...baseObj,
        levelData: currLevelData,
      };
    } else if (index === 2) {
      return {
        ...baseObj,
        levelData: nextLevelData,
      };
    } else {
      throw new Error('Level index is out of bounds');
    }
  };

  return {
    getRootProps,
    getLevelsContainerProps,
    getLevelProps,
    renderedLevels: [undefined, currLevelData, nextLevelData],
  };
}
