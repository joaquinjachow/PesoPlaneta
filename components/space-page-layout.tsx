'use client'

import { StarfieldBackground } from '@/components/starfield-background'
import { ThemeToggle } from '@/components/theme-toggle'
import type { SpacePageLayoutProps } from '@/lib/types'

export function SpacePageLayout({ children }: SpacePageLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarfieldBackground />
      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col">
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center">{children}</div>
      </div>
    </div>
  )
}