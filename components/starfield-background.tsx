'use client'

import { useEffect, useMemo, useState } from 'react'
import type { StarfieldBackgroundProps } from '@/lib/types'

function starValue(index: number, salt: number): number {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function StarfieldBackground({ count = 100 }: StarfieldBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stars = useMemo(() => {
    if (!mounted) return null

    return Array.from({ length: count }, (_, index) => {
      const size = starValue(index, 1) * 2 + 1
      const left = starValue(index, 2) * 100
      const top = starValue(index, 3) * 100
      const delay = starValue(index, 4) * 3

      return (
        <div
          key={index}
          className="star animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        />
      )
    })
  }, [count, mounted])

  return (
    <div className="starfield" aria-hidden="true">
      {stars}
    </div>
  )
}