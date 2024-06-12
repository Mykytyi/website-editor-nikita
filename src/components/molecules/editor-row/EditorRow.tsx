import { FC, Dispatch, SetStateAction } from 'react';
import { EditorColumn } from '../editor-column';
import { Row } from '../../atoms/row';

import type { EditorRowType, ActiveElement } from '../../../type-definitions/components';

interface EditorRowProps {
  row: EditorRowType,
  activeElement: ActiveElement | null,
  setActiveElement: Dispatch<SetStateAction<ActiveElement | null>>,
}

export const EditorRow: FC<EditorRowProps> = ({
  row,
  activeElement,
  setActiveElement,
}) => {

  const selected = activeElement?.id === row.id;

  const handleRowSelection = () => {
    if (!selected) {
      setActiveElement({  id: row.id, rowId: row.id, elementType: 'row'  });
    }
  };

  return (
    <Row onSelect={handleRowSelection} selected={selected}>
      {row.columns.map((column) => {
        return (
          <EditorColumn
            column={column}
            rowId={row.id}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            key={column.id}
          />
        );
      })}
    </Row>
  );
};
