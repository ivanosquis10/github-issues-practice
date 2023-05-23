import { useQuery } from '@tanstack/react-query'
import { getIssueComments, getIssueInfo } from '../../services/githubApi'

export const useIssue = (issueNumber: number) => {
  const issuesQuery = useQuery(
    ['issue', issueNumber],
    () => getIssueInfo(issueNumber),
    {
      refetchOnWindowFocus: false,
      // staleTime: 1000 * 60 * 120,
    }
  )

  const commentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issuesQuery.data!.number),
    {
      // esto que hacemos aqui es para que haga un fecth luego de que cargue la query de arriba
      // el enabled evitará que se monte esta porcion de codigo hasta que su condicion se cumpla
      refetchOnWindowFocus: false,
      enabled: issuesQuery.data !== undefined,
    }
  )

  return {
    issuesQuery,
    commentsQuery,
  }
}
