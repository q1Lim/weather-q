'use client'

import { useRouter } from 'next/navigation'

const Button = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return <button onClick={handleClick}>홈으로</button>
}

export default Button
