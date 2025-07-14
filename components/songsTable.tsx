import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlineClockCircle} from 'react-icons/ai'
import { formatDate, formatTime } from '@/lib/formatters'

const SongTable = ({songs})=>{
  return (
   <div className='bg-transparent'>
    <div className="p-5 mb-5">
  <div className="bg-green-500 p-3 rounded-full w-[50px] hover:scale-105 transition mb-12">
    <BsFillPlayFill size={28} color="white" />
  </div>
 <table className="min-w-full divide-y divide-gray-700 text-white">
  <thead >
    <tr>
      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">#</th>
      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider ">Title</th>
      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date Added</th>
      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
        <AiOutlineClockCircle/>
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-600">
    {songs.map((song, index) => (
      <tr key={song.id} className="hover:bg-gray-700 transition">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{song.name}</td>
        <td className="px-6 py-4">{formatDate(song.createdAt)}</td>
        <td className="px-6 py-4">{formatTime(song.duration)}</td>
      </tr>
    ))}
  </tbody>
</table>

</div>

   </div>
  )
}
export default SongTable