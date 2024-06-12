import { FC, Dispatch, SetStateAction } from 'react';
import { Stage } from '../../atoms/stage';
import { EditorRow } from '../../molecules/editor-row';
import { ElementFactory } from '../../../utils/elementFactory';

import type { EditorRowType, ActiveElement } from '../../../type-definitions/components';

interface DocumentWindowProps {
  rows: Array<EditorRowType>,
  activeElement: ActiveElement | null,
  setActiveElement: Dispatch<SetStateAction<ActiveElement | null>>,
}

export const DocumentWindow: FC<DocumentWindowProps> = ({
  rows,
  activeElement,
  setActiveElement,
}) => {

  const handleStageSelecting = () => {
    // functionality for the 'stage' elements are currently absent, sot it is just a plug
    setActiveElement(ElementFactory.createStage(''));
  }

  return (
    <Stage onSelect={handleStageSelecting}>
      {rows.map((row) => {
        return (
          <EditorRow
            row={row}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            key={row.id}
          />
        );
      })}
    </Stage>
  );
}
