'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' 

// import { useSWRConfig } from 'swr'
// import NextImage from 'next/image'
import { auth } from '../lib/mutations'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col">
      <div className="flex justify-center items-center h-[100px] border-b border-white">
        {/* <NextImage src="/logo.svg" height={60} width={120} alt="Logo" /> */}
        {mode}
      </div>

      <div className="flex justify-center items-center flex-grow">
        <div className="bg-gray-900 p-12 rounded-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-3 rounded-md bg-green-600 hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : mode}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
