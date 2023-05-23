import { FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { type Issues, State } from '../../interfaces'

import { getIssueComments, getIssueInfo } from '../../services/githubApi'
import { timeSince } from '../../helpers'

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi'

interface Props {
  issue: Issues
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // esto se va a encargar de cuando se le de hover a un issue, para que precargue la informacion
  const handleOnMouse = () => {
    queryClient.prefetchQuery(['issue', issue.number], () =>
      getIssueInfo(issue.number)
    )

    // esto se va a encargar de cuando se le de hover a un issue, para que precargue la informacion
    queryClient.prefetchQuery(['issue', issue.number, 'comments'], () =>
      getIssueComments(issue.number)
    )
  }

  const handlePreSetIssue = () => {
    queryClient.setQueryData(['issue', issue.number], () => issue)
  }

  if (!issue) {
    console.log(issue)
  }

  return (
    <div
      className='px-2 bg-zinc-800 hover:bg-zinc-800/50 mb-2 cursor-pointer py-2 rounded transition-colors duration-300'
      // onMouseEnter={handleOnMouse}
      onMouseEnter={handlePreSetIssue}
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
    >
      <div className='flex flex-col md:flex-row gap-2 px-1 md:px-0 md:items-center'>
        {issue.state === State.Open ? (
          <FiInfo size={30} color='red' />
        ) : (
          <FiCheckCircle size={30} color='green' />
        )}

        <div className='flex flex-col flex-1 md:px-2'>
          <span>{issue.title} </span>
          <span className='text-xs text-zinc-400'>
            #{issue.number} opened {timeSince(issue.created_at.toString())} ago
            by <span className='fw-bold'>{issue.user.login}</span>
          </span>
          <div>
            {issue.labels?.map(label => (
              <span
                key={label.id}
                className={`text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full`}
                style={{
                  backgroundColor: `#${label.color}`,
                  color: `black`,
                }}
              >
                {' '}
                {label.name}{' '}
              </span>
            ))}
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <img
            src={issue.user.avatar_url}
            alt='User Avatar'
            className='w-9 rounded-full'
            loading='lazy'
          />
          <span className='font-bold'>{issue.comments}</span>
          <FiMessageSquare size='15' />
        </div>
      </div>
    </div>
  )
}
