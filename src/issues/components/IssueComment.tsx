import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Issues } from '../../interfaces'

interface Props {
  issue: Issues
}

export const IssueComment: FC<Props> = ({ issue }) => {
  return (
    <div className='px-2'>
      <div className='border rounded mt-2'>
        <div className='flex items-center gap-3 bg-zinc-700 p-2   '>
          <img
            src={issue.user.avatar_url}
            alt='User Avatar'
            className='w-9 rounded-full'
            loading='lazy'
          />
          <span className='mx-2 font-bold'>{issue.user.login} commented</span>
        </div>
        <div className='text-sm md:text-base bg-zinc-800 rounded-b py-2 px-3 font-medium text-white'>
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
