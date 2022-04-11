import {useEffect, useState} from 'react';

import {PostType} from '@tribeplatform/gql-client/types';

const usePostTypes = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [postTypes, setPostTypes] = useState<PostType[] | undefined>();

  useEffect(() => {
    async function getPostTypes() {
      try {
        const res = await fetch('/api/retrive-post-types');
        const {data} = await res.json();
        setPostTypes(data.nodes);
        setIsFetching(false);
        setIsError(false);
      } catch {
        setIsError(true);
        setIsFetching(false);
        setPostTypes(undefined);
      }
    }
    getPostTypes();
  }, []);

  return {isFetching, isError, postTypes};
};

export default usePostTypes;
