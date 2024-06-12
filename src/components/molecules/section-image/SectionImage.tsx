import { FC } from 'react';

import type { ActiveElement } from '../../../type-definitions/components';

interface SectionImageProps {
  activeElement: ActiveElement | null,
}

export const SectionImage: FC<SectionImageProps> = () => {
  return (
    <div className="section">
      <div className="section-header">Image</div>
      <div className="text-field">
        <label htmlFor="image-url">URL</label>
        <input id="image-url" type="text"/>
      </div>
    </div>
  );
};
