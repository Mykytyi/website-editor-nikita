import { v4 as uuid } from 'uuid';

import type { EditorColumnType, EditorRowType } from '../type-definitions/components';

export class RowFactory {
  static createInitialRow(): EditorRowType {
    return {
      id: uuid(),
      columns: [{
        id: uuid(),
        contentType: 'text',
        content: '# Untitled',
        textAlign: 'left'
      }]
    };
  }

  static createNewRow(id: string): EditorRowType {
    return {
      id,
      columns: []
    };
  }

  static createNewColumn(id: string): EditorColumnType {
    return {
      id,
      contentType: 'text',
      content: '',
      textAlign: 'left'
    };
  }
}
