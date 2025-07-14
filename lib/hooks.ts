'use client'
import useSWR from 'swr'
import fetcher from './fetcher'
// import { ClientPageRoot } from 'next/dist/client/components/client-page'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher)
  console.log(data)
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}