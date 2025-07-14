import { cookies } from 'next/headers'
import { validateToken } from '@/lib/auth'
import prisma from '@/lib/prisma'
import GradientLayout from '@/components/gradientLayout'
import Image from 'next/image'
import placeholder from '@/public/placeholder.jpg'
import SongTable from '@/components/songsTable'

type Props = {
  params: {
    id: string // comes from URL as string
  }
}

export default async function PlaylistPage({ params }: Props) {
  const cookieStore = cookies()
  const token = cookieStore.get('TRAX_ACCESS_TOKEN')?.value

  if (!token) {
    return <div>Not authorized</div>
  }

  const { id: userId } = validateToken(token)
  const playlistId = parseInt(params.id, 10)

  const playlist = await prisma.playlist.findFirst({
    where: {
      id: playlistId,
      userId: userId,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!playlist) {
    return <div>Playlist not found or access denied</div>
  }
const getBGColor = (id: number) => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'gray', 'yellow']
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}
const color = getBGColor(playlist.id)

  return (
    // <div className="text-white p-4">
    //   <h1 className="text-2xl font-bold">{playlist.name}</h1>
    //   {/* <ul>
    //     {playlist.songs.map((song) => (
    //       <li key={song.id}>
    //         {song.name} — {song.artist.name}
    //       </li>
    //     ))}
    //   </ul> */}
    // </div>
    <GradientLayout 
    color={color} 
    title={playlist.name} 
    image={`https://picsum.photos/400?random ${playlist.id}`}
    subtitle="playlist" 
    description={`${playlist.songs.length} songs` }>
<SongTable songs={playlist.songs}/>
    </GradientLayout>
  )
}
