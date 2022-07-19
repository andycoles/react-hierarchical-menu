import { LevelData } from "./HierarchicalMenu.types";

export function getInitNextLevelData(node: LevelData) {
  if (Array.isArray(node)) {
    return node[0]?.children;
  } else {
    return node?.children;
  }
}

export function calcWidths(...args: [LevelData, LevelData, LevelData]) {
  const numOfLevelsRendered = args.filter(level => level).length;
  return {
    containerWidth: numOfLevelsRendered * 100 + '%',
    levelWidth: 100 / numOfLevelsRendered + '%',
  };
}
