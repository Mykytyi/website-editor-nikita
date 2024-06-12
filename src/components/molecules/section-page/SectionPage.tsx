import { FC, Dispatch, SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { RowFactory } from '../../../utils/rowFactory';
import { ElementFactory } from '../../../utils/elementFactory';

import type { ActiveElement, EditorRowType } from '../../../type-definitions/components';

interface SectionPageProps {
  setActiveElement:  Dispatch<SetStateAction<ActiveElement | null>>,
  setRows:  Dispatch<SetStateAction<EditorRowType[]>>,
}

export const SectionPage: FC<SectionPageProps> = ({
  setRows,
  setActiveElement,
}) => {

  const handleAddRow = () => {
    const uniqueId = uuid();

    // Adding a new row
    setRows((prevState) => {
      const newRows = [...prevState];
      newRows.push(RowFactory.createNewRow(uniqueId));
      return newRows;
    });

    // Make newly created row active
    setActiveElement(ElementFactory.createRow(uniqueId));
  }

  return (
    <div className="section">
      <div className="section-header">Page</div>
      <div className="actions">
        <button className="action" onClick={handleAddRow}>Add row</button>
      </div>
    </div>
  );
};
