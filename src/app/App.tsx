import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { TranslatorPage } from "./components/TranslatorPage";
import { GrammarPage } from "./components/GrammarPage";
import { ParsingTreePage } from "./components/ParsingTreePage";
import { ValidationPage } from "./components/ValidationPage";
import { AboutPage } from "./components/AboutPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'translator':
        return <TranslatorPage />;
      case 'grammar':
        return <GrammarPage />;
      case 'parsing':
        return <ParsingTreePage />;
      case 'validation':
        return <ValidationPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
