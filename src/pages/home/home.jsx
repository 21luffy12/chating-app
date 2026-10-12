import MessagesContainer from "../../components/messages/MessagesContainer"
import Sidebar from "../../components/sidebar" 

const  Home = () =>{
  return (
    <div className='flex w-[800px] max-w-6xl h-[100vh] rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-blue-100/50 border border-gray-100 flex-row'>
			<Sidebar/>
			<MessagesContainer/>
		</div>
  )
}

export default Home

