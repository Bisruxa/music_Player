import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from './prisma'
import { cookies } from 'next/headers'

type Handler = (
  req: NextRequest,
  user: any
) => Promise<NextResponse | Response>

export const validateRoute = (handler: Handler) => {
  return async (req: NextRequest) => {
    const cookieStore = cookies()
    const token = cookieStore.get('TRAX_ACCESS_TOKEN')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
    }

    try {
      const { id } = jwt.verify(token, 'hello') as { id: number }
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
      }

      // Call your handler with the request and user
      return await handler(req, user)
    } catch (error) {
      return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
    }
  }
}

export const validateToken=(token)=>{
  const user = jwt.verify(token,'hello')
  return user
}