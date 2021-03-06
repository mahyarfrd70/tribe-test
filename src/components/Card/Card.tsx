import React, {memo, useMemo} from 'react';

import {getDistance} from '@/utils/timeFormat';

import {CardProps} from '.';
import Avatar from '../Avatar';
import Button from '../Button';
import If from '../If';

const Card = ({
  title,
  body,
  name,
  createdAt,
  commentsCount,
  likesCount,
  hasDeletePermission,
  reacted,
  onDeletePost,
  onReact,
}: CardProps) => {
  const formatedCreatedAt = useMemo(() => getDistance(createdAt), [createdAt]);
  const firstLetterUpperCaseName = useMemo(
    () =>
      // TODO: move this function to utils to reuse in need
      name
        .split(' ')
        .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
        .join(' '),
    [name],
  );

  return (
    <div className="card card-bordered w-full bg-base-100 shadow-xl max-w-2xl mb-3">
      <div className="flex justify-between items-center p-4 pb-0">
        <div className="flex items-center">
          <Avatar dataTestId="card-avatar" name={name} className="w-10 text-xs mr-2" />
          <div>
            <div data-testid="card-createdby" className="text-xs">
              By {firstLetterUpperCaseName}
            </div>
            <span data-testid="card-createdat" className="text-xs">
              {formatedCreatedAt}
            </span>
          </div>
        </div>
        <If condition={hasDeletePermission}>
          <Button dataTestId="card-delete-button" buttonTypeClass="btn-link" className="p-0" onClick={onDeletePost}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="24px" viewBox="0 0 28 32" version="1.1">
              <g id="surface1">
                <path d="M 0 9 L 0 6.8125 C 0.0429688 6.023438 0.355469 5.355469 0.9375 4.8125 C 1.519531 4.273438 2.207031 4 3 4 L 6 4 L 6 3 C 6 2.167969 6.292969 1.460938 6.875 0.878906 C 7.457031 0.292969 8.167969 0.00390625 9 0.00390625 L 19 0.00390625 C 19.832031 0.00390625 20.539062 0.292969 21.125 0.878906 C 21.707031 1.460938 22 2.167969 22 3 L 22 4 L 25 4 C 25.789062 4 26.476562 4.273438 27.0625 4.8125 C 27.644531 5.355469 27.957031 6.023438 28 6.8125 L 28 9 C 28 9.542969 27.800781 10.011719 27.40625 10.40625 C 27.007812 10.804688 26.539062 11 26 11 L 26 28 C 26 29.125 25.613281 30.074219 24.84375 30.84375 C 24.070312 31.613281 23.125 32 22 32 L 6 32 C 4.875 32 3.925781 31.613281 3.15625 30.84375 C 2.386719 30.074219 2 29.125 2 28 L 2 11 C 1.457031 11 0.988281 10.804688 0.59375 10.40625 C 0.199219 10.011719 0 9.542969 0 9 Z M 2 9 L 26 9 L 26 7 C 26 6.710938 25.90625 6.46875 25.71875 6.28125 C 25.53125 6.09375 25.289062 6 25 6 L 3 6 C 2.707031 6 2.46875 6.09375 2.28125 6.28125 C 2.09375 6.46875 2 6.710938 2 7 Z M 4 28 C 4 28.542969 4.199219 29.011719 4.59375 29.40625 C 4.988281 29.800781 5.457031 30 6 30 L 22 30 C 22.539062 30 23.007812 29.800781 23.40625 29.40625 C 23.800781 29.011719 24 28.542969 24 28 L 24 11 L 4 11 Z M 6 27 L 6 14 C 6 13.710938 6.09375 13.46875 6.28125 13.28125 C 6.46875 13.09375 6.707031 13 7 13 L 9 13 C 9.292969 13 9.53125 13.09375 9.71875 13.28125 C 9.90625 13.46875 10 13.710938 10 14 L 10 27 C 10 27.292969 9.90625 27.53125 9.71875 27.71875 C 9.53125 27.90625 9.292969 28 9 28 L 7 28 C 6.707031 28 6.46875 27.90625 6.28125 27.71875 C 6.09375 27.53125 6 27.292969 6 27 Z M 7 27 L 9 27 L 9 14 L 7 14 Z M 8 4 L 20 4 L 20 3 C 20 2.710938 19.90625 2.46875 19.71875 2.28125 C 19.53125 2.09375 19.289062 2 19 2 L 9 2 C 8.707031 2 8.46875 2.09375 8.28125 2.28125 C 8.09375 2.46875 8 2.710938 8 3 Z M 12 27 L 12 14 C 12 13.710938 12.09375 13.46875 12.28125 13.28125 C 12.46875 13.09375 12.707031 13 13 13 L 15 13 C 15.289062 13 15.53125 13.09375 15.71875 13.28125 C 15.90625 13.46875 16 13.710938 16 14 L 16 27 C 16 27.292969 15.90625 27.53125 15.71875 27.71875 C 15.53125 27.90625 15.289062 28 15 28 L 13 28 C 12.707031 28 12.46875 27.90625 12.28125 27.71875 C 12.09375 27.53125 12 27.292969 12 27 Z M 13 27 L 15 27 L 15 14 L 13 14 Z M 18 27 L 18 14 C 18 13.710938 18.09375 13.46875 18.28125 13.28125 C 18.46875 13.09375 18.707031 13 19 13 L 21 13 C 21.289062 13 21.53125 13.09375 21.71875 13.28125 C 21.90625 13.46875 22 13.710938 22 14 L 22 27 C 22 27.292969 21.90625 27.53125 21.71875 27.71875 C 21.53125 27.90625 21.289062 28 21 28 L 19 28 C 18.707031 28 18.46875 27.90625 18.28125 27.71875 C 18.09375 27.53125 18 27.292969 18 27 Z M 19 27 L 21 27 L 21 14 L 19 14 Z M 19 27 " />
              </g>
            </svg>
          </Button>
        </If>
      </div>
      <div className="divider" />
      <div className="card-body">
        <h2 data-testid="card-title" className="card-title cursor-pointer">
          {title}
        </h2>
        <div data-testid="card-body" dangerouslySetInnerHTML={{__html: body as string}} className="mt-5" />
      </div>
      <div className="divider" />
      <div className="card-actions flex justify-between items-center p-4 pt-0">
        <div>
          <div data-testid="card-likescount" className="text-xs">
            {likesCount} likes
          </div>
          <div data-testid="card-commentscount" className="text-xs">
            {commentsCount} comments
          </div>
        </div>
        <Button dataTestId="card-like-button" buttonTypeClass="btn-link" className="p-0" onClick={onReact}>
          <svg
            data-testid="card-like-icon"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={reacted ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default memo(Card);
