import * as React from 'react';
import { flushSync } from 'react-dom';
import {
  HierarchicalMenuProps,
  ID,
  LevelData,
  LevelProps,
} from './HierarchicalMenu.types';
import { calcWidths, getInitNextLevelData } from './HierarchicalMenu.services';
import {
  MenuButtonProps,
  StyledLevel,
  StyledLevelsContainer,
  StyledMenuButton,
  StyledViewPort,
  TRANSITION,
} from './HierarchicalMenu.styles';

const MenuButton = ({ onClick, children, ...restProps }: MenuButtonProps) => {
  return (
    <StyledMenuButton {...restProps} onClick={onClick}>
      {children}
    </StyledMenuButton>
  );
};

const LevelComponent = ({
  node,
  onNextLevelClick = () => {},
  widthVal,
}: LevelProps) => {
  let topLevel;
  if (!node) return null;
  if (Array.isArray(node)) {
    topLevel = node.map((node) => (
      <MenuButton onClick={() => { onNextLevelClick(node.id) }} key={node.id}>
        {node.nodeData.label}
      </MenuButton>
    ));
  } else {
    topLevel = (
      <MenuButton onClick={() => { onNextLevelClick(node.id) }}>
        {node.nodeData.label}
      </MenuButton>
    );
  }
  return <StyledLevel widthVal={widthVal}>{topLevel}</StyledLevel>;
};

const HierarchicalMenu = ({ menuTree }: HierarchicalMenuProps) => {
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
  const [transitionDecl, setTransitionDecl] =
    React.useState<string>(TRANSITION);

  const widths = calcWidths(undefined, currLevelData, nextLevelData);

  const loadNextLevel = (clickedNodeId: ID) => {
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
      setTransitionDecl('');
    });
    flushSync(() => {
      setTransformVal('0');
    });
    setTransitionDecl(TRANSITION);
    setIsTransitioning(false);
  };

  return (
    <StyledViewPort>
      <StyledLevelsContainer
        transitionDecl={transitionDecl}
        transformVal={transformVal}
        widthVal={widths.containerWidth}
        onTransitionEnd={handleTransitionEnd}
        isTransitioning={isTransitioning}
      >
        <LevelComponent widthVal={widths.levelWidth} node={undefined} />
        <LevelComponent
          widthVal={widths.levelWidth}
          node={currLevelData}
          onNextLevelClick={loadNextLevel}
        />
        <LevelComponent widthVal={widths.levelWidth} node={nextLevelData} />
      </StyledLevelsContainer>
    </StyledViewPort>
  );
};

export default HierarchicalMenu;
