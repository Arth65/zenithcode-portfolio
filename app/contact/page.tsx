import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('../../components/Navbar'))
const ContactComponent = dynamic(() => import('../../components/Contact'))
const Footer = dynamic(() => import('../../components/Footer'))

export default function ContactPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <ContactComponent />
            </div>
            <Footer />
        </div>
    )
}
