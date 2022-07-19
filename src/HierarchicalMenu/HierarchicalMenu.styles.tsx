import styled from '@emotion/styled';

export const TRANSITION = 'transition: transform 0.5s ease;';

export interface MenuButtonProps {
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode;
}

export const StyledMenuButton = styled.button`
  background-color: #d2d2d2;
  height: 50px;
  width: 100%;
  &:hover {
    background-color: green;
  }
`;

export const StyledViewPort = styled.div`
  height: 100%;
  overflow-x: hidden;
  width: 100%;
`;

export type LevelStyles = {
  widthVal: string;
  transformVal: string;
  transitionDecl: string;
  isTransitioning: boolean;
};

export const StyledLevelsContainer = styled.div(
  ({ widthVal, transformVal, transitionDecl, isTransitioning }: LevelStyles) =>
    `
    display: flex;
    height: 100%;
    position: relative;
    pointer-events: ${isTransitioning ? 'none' : 'auto'};
    ${transitionDecl}
    width: ${widthVal};
    transform: translateX(${transformVal});
  `
);

export const StyledLevel = styled.div`
  display: block;
  height: 100%;
  width: ${({ widthVal }: { widthVal: string }) => widthVal};
  overflow-y: auto;
`;
