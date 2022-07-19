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
  node: LevelData | undefined;
  onSelectLevel?(event: React.MouseEvent<HTMLButtonElement>): void;
  // so as not to conflict with inline width
  widthVal: string;
}

export interface HierarchicalMenuProps {
  menuTree: LevelData;
}
