import * as React from 'react';

export type ID = string;

export interface Node {
  id: ID;
  children?: Node[];
  nodeData: {
    [key: string]: React.ReactNode;
  };
}

export type LevelData = Node | Node[] | undefined;

export interface LevelProps {
  levelData: LevelData | undefined;
  onNextLevelClick?(id: ID): void;
}

export interface HierarchicalMenuParameters {
  menuTree: LevelData;
}
