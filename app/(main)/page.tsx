import { Suspense } from 'react'
import ClientHome from './ClientHome'
import prisma from '@/lib/prisma'

export default async function Page() {
  const artists = await prisma.artist.findMany({})

  return (
    <Suspense>
      <ClientHome artists={artists} />
    </Suspense>
  )
}
