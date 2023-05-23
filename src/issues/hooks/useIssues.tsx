import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getIssues } from '../../services/githubApi'
import { State } from '../../interfaces'

// interface Props {
//   labels: string[]
//   state?: State
// }

// export const useIssues = ({ labels, state }: Props) => {
export const useIssues = () => {
  const [page, setPage] = useState(1)
  const [labels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()

  useEffect(() => {
    setPage(1)
  }, [labels, state])

  const issuesQuery = useQuery(
    ['issues', { labels, state, page }],
    () => getIssues({ labels, page, state }),
    {
      refetchOnWindowFocus: false,
      // staleTime: 1000 * 60 * 120,w
    }
  )

  const onChangeLabel = (labelName: string) => {
    labels.includes(labelName)
      ? // si ya esta en el arrya, lo filtra
        setSelectedLabels(labels.filter(label => label !== labelName))
      : // en caso de que no este, lo agregar
        setSelectedLabels([...labels, labelName])
  }

  const handleSetState = (newState?: State) => {
    setState(newState)
  }

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return

    setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  return {
    // properties
    issuesQuery,
    labels,
    state,

    // getter
    page,

    // metodos
    onChangeLabel,
    handleSetState,
    nextPage,
    prevPage,
  }
}
