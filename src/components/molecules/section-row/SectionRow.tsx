import { FC, Dispatch, SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { RowFactory } from '../../../utils/rowFactory';
import { ElementFactory } from '../../../utils/elementFactory';

import type { ActiveElement, EditorRowType, ColumnElement, RowElement } from '../../../type-definitions/components';

interface SectionRowProps {
  activeElement: ColumnElement | RowElement | null,
  setActiveElement:  Dispatch<SetStateAction<ActiveElement | null>>,
  setRows:  Dispatch<SetStateAction<EditorRowType[]>>,
}

export const SectionRow: FC<SectionRowProps> = ({
  activeElement,
  setActiveElement,
  setRows,
  }) => {

  const handleAddColumn = () => {
    const uniqueId = uuid();

    // Adding a new column to a row
    setRows((prevRows) => {
      return prevRows.map((prevRow) => {
        return activeElement?.rowId === prevRow.id
          ? {...prevRow, columns: [...prevRow.columns, RowFactory.createNewColumn(uniqueId)]}
          : prevRow;
      });
    });

    // Make newly created column active
    setActiveElement((prevActiveElement) => {
      if (prevActiveElement?.elementType !== 'stage' && prevActiveElement?.rowId) {
        return ElementFactory.createColumn(uniqueId, prevActiveElement?.rowId);
      }
      return prevActiveElement;
    });
  }

  return (
    <div className="section">
      <div className="section-header">Row</div>
      <div className="actions">
        <button className="action" onClick={handleAddColumn}>Add column</button>
      </div>
    </div>
  );
};
