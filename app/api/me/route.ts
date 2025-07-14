import { validateRoute } from '@/lib/auth'
import { NextResponse } from 'next/server'

export const GET = validateRoute(async (req, user) => {
  return NextResponse.json(user)
})
