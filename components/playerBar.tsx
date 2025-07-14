import Player from "./player"
import { useStoreState } from 'easy-peasy'
const PlayerBox= ()=>{
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)
  return(
    <div className="w-screen h-[100px] bg-gray-900 p-4 flex items-center justify-between">
  {/* Left: Song Info */}
  <div className="text-white w-[30%]">
    <p className="text-lg">Song Name</p>
    <p className="text-sm text-gray-400">artist name</p>
  </div>

  {/* Center: Player */}
  <div className="w-[40%] flex justify-center">
    <Player songs={songs} activeSong={activeSong} />
  </div>

  {/* Right: Extra */}
  <div className="w-[30%] text-white text-right">
    three
  </div>
</div>

  )
}
export default PlayerBox