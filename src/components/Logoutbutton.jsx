import { CiLogout } from "react-icons/ci"
import useLogout from '../hooks/useLogout'
const Logoutbutton = () => {

  const {loading, logout} = useLogout();
  return (
    <div className="mt-auto flex items-center justify-start w-full">
      {!loading ? (
        <button 
           onClick={logout} 
           className='flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors py-2 font-medium w-full'
        >
          <CiLogout className ='w-6 h-6' />
          <span>Logout</span>
        </button>
      ):(
        <span className='loading loading-spinner text-gray-400'></span>
      )}
    </div>
  )
}

export default Logoutbutton