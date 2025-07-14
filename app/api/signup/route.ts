// app/api/signin/route.ts

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma' // Update this path if needed

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync()
  const body = await req.json()
  const { email, password } = body

  let user

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (e) {
    return NextResponse.json({ error: 'User already exists' }, { status: 401 })
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
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
}
