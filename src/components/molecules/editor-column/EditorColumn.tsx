import { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Column } from '../../atoms/column';
import { Markdown } from '../../atoms/markdown';
import { ElementFactory } from '../../../utils/elementFactory';

import type { ActiveElement, EditorColumnType } from '../../../type-definitions/components';

interface EditorColumnProps {
  column: EditorColumnType,
  rowId: string,
  activeElement: ActiveElement | null,
  setActiveElement: Dispatch<SetStateAction<ActiveElement | null>>,
}

export const EditorColumn: FC<EditorColumnProps> = ({
  column,
  rowId,
  activeElement,
  setActiveElement
}) => {
  const [text, setText] = useState(column.content);
  const isSelected = activeElement?.id === column.id;

  const handleColumnSelection = () => {
    if (!isSelected) {
      setActiveElement(ElementFactory.columnToActiveElement(column, rowId));
    }
  };

  useEffect(() => {
    // <activeElement?.elementType === 'column'> - is a type guard, 'content' exists only with elementType === 'column'
    if (isSelected && activeElement?.elementType === 'column') {
      setText(activeElement.content);
    } else {
      setText(column.content);
    }
  }, [isSelected, activeElement, column.content]);

  return (
    <Column onSelect={handleColumnSelection} selected={isSelected}>
      <Markdown className={`text-align-${column.textAlign}`}>{text}</Markdown>
    </Column>
  );
};
