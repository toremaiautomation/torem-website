import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { T, buildCSS, BODY } from "./theme";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiePage from "./pages/CookiePage";
import DisclaimerPage from "./pages/DisclaimerPage";

const PAGES = ["Home","Services","About","Contact","Terms","Privacy","Cookies","Disclaimer"];
function pageFromPath(p) {
  const seg = p.replace(/^\//, "").split("/")[0];
  return PAGES.find(n => n.toLowerCase() === seg.toLowerCase()) || "Home";
}

function AppInner() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);

  useLenis();

  const page = pageFromPath(location.pathname);
  const go   = p => navigate(p === "Home" ? "/" : `/${p.toLowerCase()}`);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = buildCSS();
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div style={{ fontFamily: BODY, background: T.bg, paddingTop: "66px", minHeight: "100vh" }}>
      <Navbar page={page} setPage={go} />
      <Routes>
        <Route path="/"           element={<HomePage    setPage={go} />} />
        <Route path="/services"   element={<ServicesPage setPage={go} scrollTarget={scrollTarget} setScrollTarget={setScrollTarget} />} />
        <Route path="/about"      element={<AboutPage   setPage={go} />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="/terms"      element={<TermsPage />} />
        <Route path="/privacy"    element={<PrivacyPage />} />
        <Route path="/cookies"    element={<CookiePage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*"           element={<HomePage    setPage={go} />} />
      </Routes>
      <Footer setPage={go} page={page} setScrollTarget={setScrollTarget} />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
