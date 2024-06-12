import { FC, useState, useEffect } from 'react';
import { DocumentWindow } from '../../organisms/document-window';
import { Toolbar } from '../../organisms/toolbar';
import { RowFactory } from '../../../utils/rowFactory';
import { LOCAL_STORAGE_KEY } from '../../../constants';

import type { EditorRowType, ActiveElement } from '../../../type-definitions/components';

const initialRows = () => {
  const result = [];
  const newRow = RowFactory.createInitialRow();

  result.push(newRow);

  return result;
}

export const Editor: FC = () => {
  const [rows, setRows] = useState<Array<EditorRowType>>(initialRows());
  const [activeElement, setActiveElement] = useState<ActiveElement | null>(null);

  useEffect(() => {
    const storedRows = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      if (storedRows) {
        setRows(JSON.parse(storedRows));
      }
    } catch (e) {
      console.error('Error parsing data from localStorage: ', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  return (
    <div className="editor">
      <DocumentWindow
        rows={rows}
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
      <Toolbar
        activeElement={activeElement}
        setActiveElement={setActiveElement}
        setRows={setRows}
      />
    </div>
  );
};
