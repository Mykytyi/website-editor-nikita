import { FC, Dispatch, SetStateAction } from 'react';
import { SectionPage } from '../../molecules/section-page';
import { SectionRow } from '../../molecules/section-row';
import { SectionColumn } from '../../molecules/section-column';
import { SectionText } from '../../molecules/section-text';
import { SectionImage } from '../../molecules/section-image';

import type {ActiveElement, ColumnElement, EditorRowType} from '../../../type-definitions/components';

interface ToolbarProps {
  activeElement: ActiveElement | null,
  setActiveElement:  Dispatch<SetStateAction<ActiveElement | null>>,
  setRows:  Dispatch<SetStateAction<EditorRowType[]>>,
}

export const Toolbar: FC<ToolbarProps> = ({
  activeElement,
  setActiveElement,
  setRows,
}) => {

  const isElementTypeRow = activeElement?.elementType === 'row';

  const isElementTypeColumn = activeElement?.elementType === 'column';

  const isContentTypeText = isElementTypeColumn && activeElement.contentType === 'text';

  const isContentTypeImage = isElementTypeColumn && activeElement.contentType === 'image';

  return (
    <div className="properties">
      <SectionPage
        setActiveElement={setActiveElement}
        setRows={setRows}
      />

      {(isElementTypeRow || isElementTypeColumn) && (
        <SectionRow
          activeElement={activeElement}
          setActiveElement={setActiveElement}
          setRows={setRows}
        />
      )}

      {isElementTypeColumn && (
        <SectionColumn activeElement={activeElement}/>
      )}

      {isContentTypeText && (
        <SectionText
          setRows={setRows}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
        />
      )}

      {isContentTypeImage && (
        <SectionImage activeElement={activeElement}/>
      )}
    </div>
  );
}
