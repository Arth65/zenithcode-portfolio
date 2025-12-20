import dynamic from 'next/dynamic'

const ZenithHero = dynamic(() => import('../components/ZenithHero'))
const Navbar = dynamic(() => import('../components/Navbar'))
const DigitalCompetence = dynamic(() => import('../components/DigitalCompetence'))
const SAPTeamService = dynamic(() => import('../components/SAPTeamService'))
const CreativitySection = dynamic(() => import('../components/CreativitySection'))
const EnterpriseIntelligence = dynamic(() => import('../components/EnterpriseIntelligence'))
const AdaptabilitySection = dynamic(() => import('../components/AdaptabilitySection'))
const AgileManagement = dynamic(() => import('../components/AgileManagement'))
const EngineerClaritySection = dynamic(() => import('../components/EngineerClaritySection'))
const Footer = dynamic(() => import('../components/Footer'))

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent">
      <Navbar />
      <ZenithHero />
      <DigitalCompetence />
      <SAPTeamService />
      <CreativitySection />
      <EnterpriseIntelligence />
      <AdaptabilitySection />
      <AgileManagement />
      <EngineerClaritySection />
      <Footer />
    </div>
  )
}