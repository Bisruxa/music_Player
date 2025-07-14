// app/api/signin/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      'hello',
      { expiresIn: '8h' }
    )

    const response = NextResponse.json(user)

    response.headers.set(
      'Set-Cookie',
      `TRAX_ACCESS_TOKEN=${token}; HttpOnly; Path=/; Max-Age=${8 * 60 * 60}; SameSite=Lax; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      }`
    )

    return response
  } else {
    return NextResponse.json({ error: 'Email or Password is wrong' }, { status: 401 })
  }
}
