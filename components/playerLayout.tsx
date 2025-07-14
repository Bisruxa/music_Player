import PlayerBox from './playerBar'
import Sidebar from './sidebar'

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen relative">
      {/* Sidebar */}
      <div className="absolute top-0 left-0 w-[250px] h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="ml-[250px] mb-[100px]">
        <div className="h-[calc(100vh-100px)]">
          {children}
        </div>
      </div>

      {/* Player bar */}
      <div className="absolute bottom-0 left-0">
        <PlayerBox/>
      </div>
    </div>
  )
}

export default PlayerLayout
