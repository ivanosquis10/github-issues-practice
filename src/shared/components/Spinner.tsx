import { FaSpinner } from 'react-icons/fa'

interface Props {
  size?: string | number
}

export const Spinner = ({ size = 40 }: Props) => {
  return <FaSpinner className='animate-spin text-center w-full' size={size} />
}
