import { useQuery } from '@tanstack/react-query'
import { getLabels } from '../../services/githubApi'

export const useLabels = () => {
  const labelsQuery = useQuery(['labels'], getLabels, {
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 120,w
  })

  return {
    labelsQuery,
  }
}
