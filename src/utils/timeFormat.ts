import {formatDistance} from 'date-fns';

export const getDistance = (createdAt: string) => formatDistance(new Date(createdAt), new Date(), {addSuffix: true});
