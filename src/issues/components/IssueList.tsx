import { FC } from 'react'
import { IssueItem } from './IssueItem'
import { Issues, State } from '../../interfaces'

interface Props {
  issues: Issues[]
  state?: State
  handleSetState: (estado?: State) => void
}

// export const IssueList: FC<Props> = ({ issues, estado, onStateChange }) => {
export const IssueList: FC<Props> = ({ issues, state, handleSetState }) => {
  return (
    <>
      <div>
        <ul className='flex items-center gap-2 [&>li]:px-2 [&>li]:py-1 [&>li]:bg-zinc-900 [&>li]:rounded cursor-pointer p-2'>
          <li
            onClick={() => handleSetState()}
            className='hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800'
          >
            <a
              className={`font-medium tracking-widest ${
                !state ? 'active' : ''
              }`}
            >
              All
            </a>
          </li>
          <li
            onClick={() => handleSetState(State.Open)}
            className='hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800'
          >
            <a
              className={`font-medium tracking-widest ${
                state === State.Open ? 'active' : ''
              }`}
            >
              Open
            </a>
          </li>
          <li
            onClick={() => handleSetState(State.Closed)}
            className='hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800'
          >
            <a
              className={`font-medium tracking-widest ${
                state === State.Closed ? 'active' : ''
              }`}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>

      <div className='px-2'>
        {issues?.map(issue => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  )
}
