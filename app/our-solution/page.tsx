import OurApproach from '@/components/OurApproach';
import Navbar from '@/components/Navbar'; // Import Navbar so this page has navigation too

export default function OurSolutionPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Add some top padding so the content doesn't hide behind the Navbar */}
            <div className="pt-20">
                <OurApproach />
            </div>
        </main>
    );
}