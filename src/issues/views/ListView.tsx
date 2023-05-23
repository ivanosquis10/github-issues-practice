import { useIssues } from '../hooks'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'

import { Spinner } from '../../shared/components/Spinner'

export const ListView = () => {
  const {
    issuesQuery,
    page,
    nextPage,
    prevPage,
    handleSetState,
    state,
    labels,
    onChangeLabel,
  } = useIssues()

  // const { issuesQuery, page, nextPage, prevPage } = useIssues({
  //   labels: selectedlabels,
  //   state: estado,
  // })

  // const onChangeLabel = (labelName: string) => {
  //   selectedlabels.includes(labelName)
  //     ? // si ya esta en el arrya, lo filtra
  //       setSelectedLabels(selectedlabels.filter(label => label !== labelName))
  //     : // en caso de que no este, lo agregar
  //       setSelectedLabels([...selectedlabels, labelName])
  // }

  return (
    <div className='container mx-auto mt-5 grid grid-cols-12'>
      <div className='col-span-8'>
        {issuesQuery.isLoading ? (
          <Spinner />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            handleSetState={handleSetState}
          />
        )}
      </div>

      <section className='col-span-4 flex flex-col items-center justify-between py-2'>
        <LabelPicker selectedlabels={labels} onChangeLabel={onChangeLabel} />

        <div className='w-full flex items-center justify-between mt-5'>
          <button
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
            className='font-medium w-1/3 p-1 md:p-2 hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800 rounded tracking-widest'
          >
            Prev
          </button>
          <span className='font-bold text-lg'>
            {/* {issuesQuery.isFetching ? <Spinner size={20} /> : page} */}
            {page}
          </span>
          <button
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
            className='font-medium w-1/3 p-1 md:p-2 hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800 rounded tracking-widest'
          >
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
