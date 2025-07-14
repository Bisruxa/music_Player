'use client'
import NextImage from 'next/image'
import Link from 'next/link'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <div className="w-full h-[calc(100vh-100px)] bg-black text-gray-400 px-1">
      <div className="py-5 h-full flex flex-col">
        <div className="w-[120px] mb-5 px-5">
          <NextImage src="/logo.svg" height={60} width={120} alt="Logo" />
        </div>

        {/* Navigation Menu */}
        <nav className="mb-5">
          <ul className="space-y-2">
            {navMenu.map((menu) => (
              <li key={menu.name} className="px-5 text-base">
                <Link href={menu.route} passHref
                >
                  <div className="flex items-center text-white hover:text-green-400">
                    <menu.icon className="mr-5 text-xl" />
                    <span>{menu.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
 <hr className="border-gray-800 border-t-4 mx-4" />

        {/* Music Menu */}
        <nav className="mt-5">
          <ul className="space-y-2">
            {musicMenu.map((menu) => (
              <li key={menu.name} className="px-5 text-base">
                <Link href={menu.route} passHref>
                  <div className="flex items-center text-white hover:text-green-400">
                    <menu.icon className="mr-5 text-xl" />
                    <span>{menu.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

       

        {/* Playlists */}
        <div className="flex-grow overflow-y-auto py-5">
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li key={playlist.id} className="px-5 text-base">
                <Link href={`/playlist/${playlist.id}`}>

                  <div  className="text-gray-400 hover:text-white">{playlist.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
