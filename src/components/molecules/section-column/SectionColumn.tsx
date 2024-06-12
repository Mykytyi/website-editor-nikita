import { FC } from 'react';
import { Icons } from '../../atoms/icons';

import type { ColumnElement } from '../../../type-definitions/components';

interface SectionColumnProps {
  activeElement: ColumnElement | null,
}

export const SectionColumn: FC<SectionColumnProps> = () => {
  return (
    <div className="section">
      <div className="section-header">Column</div>
      <div className="button-group-field">
        <label>Contents</label>
        <div className="button-group">
          <button className="selected">
            <Icons.Text/>
          </button>
          <button>
            <Icons.Image/>
          </button>
        </div>
      </div>
    </div>
  );
};
