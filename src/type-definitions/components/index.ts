
export type EditorRowType = {
  id: string,
  columns: Array<EditorColumnType>,
};

export type EditorColumnType = {
  id: string,
  contentType: 'text' | 'image',
  content: string,
  textAlign: TextAlignType,
}

export type TextAlignType = 'left' | 'center' | 'right';

export type ActiveElement = StageElement | RowElement | ColumnElement;

export type StageElement = {
  id: string,
  elementType: 'stage'
}
export type RowElement = {
  id: string,
  elementType: 'row'
  rowId: string,
}

export type ColumnElement = {
  id: string,
  elementType: 'column'
  rowId: string,
  content: string,
  contentType: 'text' | 'image',
  textAlign: 'left' | 'center' | 'right',
}

