import clsx from 'clsx';

import React, {memo, useMemo} from 'react';

import {AvatarProps} from '.';

const Avatar = ({name, className, dataTestId}: AvatarProps) => {
  const avatarLabel: string = useMemo(() => {
    return name
      ?.split(' ')
      .map((item) => item?.[0]?.toUpperCase())
      .join('');
  }, [name]);

  return (
    <div className="avatar placeholder">
      <div
        data-testid={dataTestId}
        className={clsx('bg-neutral-focus text-neutral-content rounded-full w-12', className)}
      >
        <span>{avatarLabel}</span>
      </div>
    </div>
  );
};

export default memo(Avatar);
