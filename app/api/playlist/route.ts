// app/api/playlist/route.ts
import prisma from '@/lib/prisma'
import { validateRoute } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const user = await validateRoute(req)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return NextResponse.json(playlists)
}
