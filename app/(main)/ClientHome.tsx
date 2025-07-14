// 🗂️ /app/(main)/ClientHome.tsx
'use client'

import GradientLayout from '@/components/gradientLayout'
import Image from 'next/image'
import placeholder from '@/public/placeholder.jpg'
import { useMe } from '@/lib/hooks'

export default function ClientHome({ artists }) {
  const { user } = useMe()

  return (
    <GradientLayout
      roundImage
      color="gray"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`  }
      description="15 public playlists"
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <div className="text-white px-10">
        <div className="mb-10">
          <p className="text-2xl font-bold">Top artist this month</p>
          <p className="text-md">only visible to you</p>
        </div>
        <div className="flex flex-wrap">
          {artists.map((artist) => (
            <div key={artist.id} className="px-2 w-1/5">
              <div className="bg-gray-900 rounded-md p-4 w-full">
                <Image
                  src={placeholder}
                  alt={artist.name}
                  className="rounded-full w-full object-cover"
                  width={80}
                  height={80}
                />
                <div className="mt-5">
                  <p className="text-lg">{artist.name}</p>
                  <p className="text-xs">Artist</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GradientLayout>
  )
}
