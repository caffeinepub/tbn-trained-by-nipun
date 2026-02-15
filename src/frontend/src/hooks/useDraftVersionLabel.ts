import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { APP_VERSION_LABEL } from '../constants/appVersion';

/**
 * Hook that provides the local UI version label and optionally fetches
 * the backend published version for verification (non-blocking).
 */
export function useDraftVersionLabel() {
  const { actor, isFetching: isActorFetching } = useActor();

  const { data: backendVersion, isLoading } = useQuery<string>({
    queryKey: ['publishedVersion'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getPublishedVersion();
    },
    enabled: !!actor && !isActorFetching,
    staleTime: Infinity, // Version doesn't change during session
  });

  return {
    localVersion: APP_VERSION_LABEL,
    backendVersion,
    isLoadingBackend: isLoading,
    versionsMatch: backendVersion ? backendVersion === APP_VERSION_LABEL : null,
  };
}
