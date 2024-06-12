import { ActiveElement, EditorColumnType } from '../type-definitions/components';

export class ElementFactory {
  static createStage(id: string): ActiveElement {
    return {
      id,
      elementType: 'stage'
    };
  }

  static createRow(id: string): ActiveElement {
    return {
      id,
      rowId: id,
      elementType: 'row'
    };
  }

  static createColumn(elementId: string, rowId: string): ActiveElement {
    return {
      id: elementId,
      rowId,
      elementType: 'column',
      content: '',
      contentType: 'text',
      textAlign: 'left'
    };
  }

  static columnToActiveElement(column: EditorColumnType, rowId: string): ActiveElement {
    return {
      id: column.id,
      rowId: rowId,
      elementType: 'column',
      content: column.content,
      contentType: column.contentType,
      textAlign: column.textAlign,
    }
  }
}
