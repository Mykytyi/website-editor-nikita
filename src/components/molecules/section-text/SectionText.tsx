import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Icons } from '../../atoms/icons';

import type {
  ActiveElement,
  ColumnElement,
  EditorRowType,
  TextAlignType,
} from '../../../type-definitions/components';

interface SectionTextProps {
  activeElement: ColumnElement,
  setActiveElement:  Dispatch<SetStateAction<ActiveElement | null>>,
  setRows:  Dispatch<SetStateAction<EditorRowType[]>>,
}

export const SectionText: FC<SectionTextProps> = ({
  activeElement,
  setActiveElement,
  setRows,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(() => activeElement.content);
  console.log('activeElement: ', activeElement);
  useEffect(() => {
    setText(activeElement.content);
  }, [activeElement.content]);

  useEffect(() => {
    // Here we control focus on the content area; it is focused every time the "activeElement" is updated
    if (textareaRef.current && activeElement?.id) {
      textareaRef.current.focus();
    }
  }, [activeElement?.id]);

  const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;

    setText(text);
    setActiveElement((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          content: text,
        }
      }
      return prevState
    });
  }

  // Here we make a search in a nested array, complexity of algorithm is O(n2), but nested arrays(columns) won't be bigger than 5-10 elements,
  // so it is not so bad. Better approach would be using Map, we would get complexity O(n)
  const handleTextOnBlur = () => {
    setRows((prevRows) => {
      return prevRows.map((prevRow) => {
        // We try to find our rowId to get to its column data
        if (prevRow.id === activeElement.rowId) {
          const newColumns = prevRow.columns.map((column) => {
            // Here we try to find row's column by id
            return column.id === activeElement.id
              ? {...column, content: text}
              : column;
          })

          return {...prevRow, columns: newColumns}
        }
        return prevRow;
      });
    });
  }

  const handleTextAlign = (align: TextAlignType) => {
    if (align !== activeElement.textAlign) {
      // This functionality is very similar to what is found in handleTextOnBlur.
      // We can create a helper handler that will assist with DRY
      setRows((prevRows) => {
        return prevRows.map((prevRow) => {
          // We try to find our rowId to get to its column data
          if (prevRow.id === activeElement.rowId) {
            const newColumns = prevRow.columns.map((column) => {
              // Here we try to find row's column by id
              return column.id === activeElement.id
                ? {...column, textAlign: align}
                : column;
            })

            return {...prevRow, columns: newColumns}
          }
          return prevRow;
        });
      });

      setActiveElement((prevElem) => {
        if (prevElem) {
          return {...prevElem, textAlign: align};
        }
        return prevElem
      });
    }
  }

  return (
    <div className="section">
      <div className="section-header">Text</div>
      <div className="button-group-field">
        <label>Alignment</label>
        <div className="button-group">
          <button
            className={activeElement.textAlign === 'left' ? 'selected' : ''}
            onClick={() => handleTextAlign('left')}
          >
            <Icons.TextAlignLeft/>
          </button>
          <button
            className={activeElement.textAlign === 'center' ? 'selected' : ''}
            onClick={() => handleTextAlign('center')}
          >
            <Icons.TextAlignCenter/>
          </button>
          <button
            className={activeElement.textAlign === 'right' ? 'selected' : ''}
            onClick={() => handleTextAlign('right')}
          >
            <Icons.TextAlignRight/>
          </button>
        </div>
      </div>
      <div className="textarea-field">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextInput}
          onBlur={handleTextOnBlur}
          rows={8}
          placeholder="Enter text"
        ></textarea>
      </div>
    </div>
  );
};
