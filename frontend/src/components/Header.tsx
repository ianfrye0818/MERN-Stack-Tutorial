import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className=' p-4 bg-gray-900 text-white h-20 flex items-center'>
      <nav className=' md:container flex justify-between items-center'>
        <h1 className='text-2xl'>Workout Tracker</h1>
        <ul className='flex gap-3'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/workouts'>Workouts</Link>
          </li>
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
