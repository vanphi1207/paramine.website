import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Staff from "./components/Staff";
import History from "./components/History";
import Gallery from "./components/Gallery";
import Wiki from "./components/Wiki";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import Reveal from "./components/Reveal";
import BackgroundMusic from "./components/BackgroundMusic";
import { ArrowUp } from "lucide-react";
import { PageView } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to section logic
  const navigateSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Back to top logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <ParticleBackground />
      <BackgroundMusic />

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onNavigateSection={navigateSection}
      />

      {currentPage === "home" && (
        <main>
          <Hero />
          <Features />
          <div className="bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent">
            <Staff />
          </div>
          <Gallery />
          <History />

          {/* Join CTA Section */}
          <section className="py-24 text-center px-4">
            <Reveal>
              <div className="max-w-3xl mx-auto glass-panel p-12 rounded-3xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                  Sẵn sàng tham chiến?
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  Hàng ngàn người chơi đang chờ đợi bạn tại Paramine. Đừng bỏ lỡ
                  cơ hội trải nghiệm máy chủ Minecraft tuyệt vời nhất.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("paramine.fun");
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-xl text-lg transition-transform hover:scale-105 shadow-lg shadow-emerald-500/30"
                >
                  Tham Gia Ngay
                </button>
              </div>
            </Reveal>
          </section>
        </main>
      )}

      {currentPage === "wiki" && <Wiki />}

      <Footer />

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
