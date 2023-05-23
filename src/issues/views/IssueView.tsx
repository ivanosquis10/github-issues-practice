import { Link, Navigate, useParams } from 'react-router-dom'

import { useIssue } from '../hooks'

import { IssueComment } from '../components/IssueComment'
import { Spinner } from '../../shared/components/Spinner'

export const IssueView = () => {
  // obtenemos los parametros
  const params = useParams()
  const { id = '0' } = params

  const { issuesQuery, commentsQuery } = useIssue(+id)

  if (issuesQuery.isLoading) {
    return <Spinner />
  }

  if (!issuesQuery.data) return <Navigate to='./issues/list' />

  return (
    <div className='mb-5 container mx-auto'>
      <div className='my-4'>
        <Link
          className='hover:bg-zinc-800 bg-zinc-900 duration-300 transition-colors border border-zinc-500 px-2 py-1 rounded'
          to='./issues/list'
        >
          Go Back
        </Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issuesQuery.data} />

      {/* Comentario de otros */}
      {commentsQuery.isLoading && <Spinner />}
      {commentsQuery.data?.map(issue => (
        <IssueComment key={issue.id} issue={issue} />
      ))}
    </div>
  )
}
