import classNames from "classnames";
import { FC, ReactNode } from "react";
import { SelectableContainer } from "../selectable-container";

export interface StageProps {
  children?: ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Stage: FC<StageProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames("stage", { selected })} {...props} />
);
