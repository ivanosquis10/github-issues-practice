import { FC } from 'react'
import { useLabels } from '../hooks'
import { Spinner } from '../../shared/components/Spinner'

interface Props {
  selectedlabels: string[]
  onChangeLabel: (labelName: string) => void
}

export const LabelPicker: FC<Props> = ({ selectedlabels, onChangeLabel }) => {
  const { labelsQuery } = useLabels()

  return (
    <div className='flex flex-col md:flex-row  md:flex-wrap gap-1 p-1 mt-10'>
      {labelsQuery.isLoading && <Spinner />}
      {labelsQuery.data?.map(label => (
        <span
          key={label.id}
          onClick={() => onChangeLabel(label.name)}
          className={`text-xs font-bold mr-2 px-2.5 py-0.5 rounded text-center md:rounded-full duration-200 transition-all hover:bg-slate-50/50 cursor-pointer ${
            selectedlabels.includes(label.name) ? 'label-active' : ''
          } `}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}
