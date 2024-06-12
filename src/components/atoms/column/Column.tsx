import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { SelectableContainer } from '../selectable-container';

export interface ColumnProps {
  children?: ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Column: FC<ColumnProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames('column', { selected })} {...props} />
);
