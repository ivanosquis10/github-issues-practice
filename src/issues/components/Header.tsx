import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <nav className=' flex items-center justify-between p-5 container mx-auto border-b'>
        <h1 className='text-5xl font-bold cursor-default'>GitHub Issues</h1>
        <ul className='flex items-center gap-2 [&>li]:px-2 [&>li]:py-1 [&>li]:bg-zinc-900 [&>li]:rounded cursor-pointer'>
          <li className='hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800 text-sm md:text-lg'>
            <Link to='/issues/list'>Home</Link>
          </li>
          <li className='hover:bg-zinc-800 duration-300 transition-colors border border-zinc-800 text-sm md:text-lg'>
            <Link to='/issues/list/infinite'>Infinite</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
