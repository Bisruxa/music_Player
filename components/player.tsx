'use client'

import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import ReactHowler from 'react-howler'
import { formatTime } from '@/lib/formatters'
import { StoreModel } from '@/lib/store'

const Player = ({songs,activeSong}) => {
  // const [progress, setProgress] = useState(30);
  const [shuffle , setShuffle ]= useState(false);
  const [playing, setPlaying] = useState(true)
  const [seek,setSeek] = useState(0.0)
  const [repeat,setRepeat]= useState(false);
  const [duration,setDuration]=useState(0.0);
  const [index,setIndex]= useState(0);
  const [isSeeking,setIsSeeking]= useState(false)
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat)
 const setActiveSong = useStoreActions<StoreModel>((state) => state.changeActiveSong);

  const setPlayState = (value)=>{
    setPlaying(value)
  }
  const onShuffle=()=>{
    setShuffle((state)=>!state)
  }
  const onRepeat =()=>{
setRepeat((state)=>!state)
  }

const prevSong=()=>{
  setIndex((state)=>{
    return state ? state-1 : songs.length-1
  })
}
const nextSong =()=>{
  setIndex((state)=>{
if(shuffle){
const next = Math.floor(Math.random() * songs.length)
if(next === state){
  return nextSong()
}
}else{
  return state === songs.length-1?0:state + 1
}
  })
}
const onEnd =()=>{
  if(repeat){
    setSeek(0)
    soundRef.current.seek(0)
  }
  else{
    nextSong()
  }
}
const onLoad = () => {
  let tries = 0;
  const tryGetDuration = () => {
    const songDuration = soundRef.current?.duration()
    console.log('onLoad fired, duration:', songDuration)
    if (songDuration && songDuration > 0) {
      setDuration(songDuration)
    } else if (tries < 5) {
      tries++
      setTimeout(tryGetDuration, 100) // retry after 100ms
    }
  }

  tryGetDuration()
}

const onSeek =(e)=>{
  setSeek(parseFloat(e[0]))
  soundRef.current.seek(e[0])
}
 useEffect(() => {
  let timerId

  if (playing && !isSeeking && soundRef.current) {
    const updateSeek = () => {
      if (soundRef.current) {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(updateSeek)
      }
    }

    timerId = requestAnimationFrame(updateSeek)
    return () => cancelAnimationFrame(timerId)
  }

  return () => cancelAnimationFrame(timerId)
}, [playing, isSeeking])


   useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])
  return (
    <div className="w-full px-4">
      <div>{activeSong?.url && (
  <ReactHowler
    playing={playing}
    src={activeSong.url}
    ref={soundRef}
    onLoad={onLoad}
    onEnd={onEnd}
  />
)}
</div>
      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <button>
         <MdShuffle size={24} className={shuffle ? 'text-white' : 'text-gray-500'}onClick={onShuffle} />
        </button>
        <button>
          <MdSkipPrevious size={24} className="text-gray-500" onClick={prevSong} />
        </button>
        {playing ? (<button>
          <MdOutlinePauseCircleFilled size={40} onClick={()=>setPlayState(false)}/>
        </button>):(<button>
          <MdOutlinePlayCircleFilled size={40} onClick={()=>setPlayState(true)} />
        </button>)}
        
        
        <button>
          <MdSkipNext size={24} className="text-gray-500" onClick={nextSong}/>
        </button>
        <button>
          <MdOutlineRepeat size={24} className={repeat ? 'text-white' : 'text-gray-500'} onClick={onRepeat} />
        </button>
      </div>

      {/* Time + Slider */}
      <div className="text-gray-600 w-full">
        <div className="flex items-center justify-center w-full gap-4">
          {/* Left time */}
          <div className="w-[10%] text-sm text-white">{formatTime(seek)}</div>

          {/* Slider with filled background */}
          <div className="relative w-[80%] h-2">
            {/* Filled progress bar */}
            <div
              className="absolute h-1 bg-green-500 rounded-lg top-1/2 -translate-y-1/2"
               style={{ width: `${(seek / duration) * 100}%` }}
            ></div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={duration ? parseFloat(duration.toFixed(2)) : 0}
              step={0.1}
              value={seek}
              onChange={onSeek
                // (e) => setProgress(Number(e.target.value))
                }
              onMouseUp={() => setIsSeeking(true)}
              onMouseDown={() => setIsSeeking(false)}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer relative z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:shadow
                accent-green-500"
              id="player-range"
            />
          </div>

          {/* Right time (optional) */}
          <div className="w-[10%] text-sm text-white text-right">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  )
}

export default Player
