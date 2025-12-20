import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/Navbar'))
const Contact = dynamic(() => import('../../components/Contact'))
const Footer = dynamic(() => import('../../components/Footer'))

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24">
                <Contact />
            </div>
            <Footer />
        </main>
    )
}
