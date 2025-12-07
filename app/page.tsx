import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../components/Hero'))
const Navbar = dynamic(() => import('../components/Navbar'))

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent">
      <Navbar />
      <Hero />
    </div>
  )
}