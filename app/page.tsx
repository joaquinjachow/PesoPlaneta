import { StarfieldBackground } from '@/components/starfield-background'
import { PageHeader } from '@/components/page-header'
import { PlanetaryCalculator } from '@/components/planetary-calculator'
import { CreativeFooter } from '@/components/creative-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarfieldBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <PageHeader />
        <PlanetaryCalculator />
      </div>
      <CreativeFooter />
    </div>
  )
}
