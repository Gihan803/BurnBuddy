import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
