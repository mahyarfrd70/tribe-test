import {Post} from '@tribeplatform/gql-client/types';

export const simplifyPaginatedResult = jest.fn().mockImplementation((data: Post[]) => ({nodes: data}));
