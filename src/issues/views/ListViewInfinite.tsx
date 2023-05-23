import { useState } from 'react'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'

import { Spinner } from '../../shared/components/Spinner'
import { State } from '../../interfaces'
import { useIssuesInfinite } from '../hooks'

export const ListViewInfinite = () => {
  const [selectedlabels, setSelectedLabels] = useState<string[]>([])
  const [estado, setEstado] = useState<State>()

  const { issuesQueryInfinite } = useIssuesInfinite({
    labels: selectedlabels,
    state: estado,
  })

  const onChangeLabel = (labelName: string) => {
    selectedlabels.includes(labelName)
      ? // si ya esta en el arrya, lo filtra
        setSelectedLabels(selectedlabels.filter(label => label !== labelName))
      : // en caso de que no este, lo agregar
        setSelectedLabels([...selectedlabels, labelName])
  }

  return (
    <div className='container mx-auto mt-5 grid grid-cols-12 relative'>
      <div className='col-span-8 position-relative'>
        {issuesQueryInfinite.isLoading ? (
          <Spinner />
        ) : (
          <IssueList
            issues={issuesQueryInfinite.data?.pages.flat() || []}
            state={estado}
            handleSetState={newState => setEstado(newState)}
          />
        )}
        <button
          onClick={() => issuesQueryInfinite.fetchNextPage()}
          disabled={!issuesQueryInfinite.hasNextPage}
          className='hover:bg-zinc-800 bg-zinc-900 duration-300 transition-colors border border-zinc-500 px-4 py-1 rounded'
        >
          Load more...
        </button>
      </div>

      <div className='col-span-4 py-2'>
        <LabelPicker
          selectedlabels={selectedlabels}
          onChangeLabel={onChangeLabel}
        />
      </div>
    </div>
  )
}
