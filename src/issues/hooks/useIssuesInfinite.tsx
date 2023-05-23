import { useInfiniteQuery } from '@tanstack/react-query'
import { getIssuesInfinite } from '../../services/githubApi'
import { State } from '../../interfaces'

interface Props {
  state?: State
  labels: string[]
  page?: number
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQueryInfinite = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    data => getIssuesInfinite(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 5) return

        return pages.length + 1
      },
    }
  )

  return {
    issuesQueryInfinite,
  }
}
