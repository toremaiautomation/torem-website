import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { theme, buildCSS, BODY } from "./theme";
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

const PAGES = ["Home", "Services", "About", "Contact", "Terms", "Privacy", "Cookies", "Disclaimer"];
function pageFromPath(p) {
  const seg = p.replace(/^\//, "").split("/")[0];
  return PAGES.find(n => n.toLowerCase() === seg.toLowerCase()) || "Home";
}

function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("torem-theme") === "dark"; } catch { return false; }
  });
  const [scrollTarget, setScrollTarget] = useState(null);
  const T = theme(dark);

  const page = pageFromPath(location.pathname);
  const go = p => navigate(p === "Home" ? "/" : `/${p.toLowerCase()}`);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = buildCSS(T);
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, [dark]);

  useEffect(() => {
    try { localStorage.setItem("torem-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div style={{ fontFamily: BODY, background: T.bg, paddingTop: "66px", minHeight: "100vh" }}>
      <Navbar page={page} setPage={go} dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<HomePage setPage={go} dark={dark} />} />
        <Route path="/services" element={<ServicesPage setPage={go} dark={dark} scrollTarget={scrollTarget} setScrollTarget={setScrollTarget} />} />
        <Route path="/about" element={<AboutPage setPage={go} dark={dark} />} />
        <Route path="/contact" element={<ContactPage dark={dark} />} />
        <Route path="/terms" element={<TermsPage dark={dark} />} />
        <Route path="/privacy" element={<PrivacyPage dark={dark} />} />
        <Route path="/cookies" element={<CookiePage dark={dark} />} />
        <Route path="/disclaimer" element={<DisclaimerPage dark={dark} />} />
        <Route path="*" element={<HomePage setPage={go} dark={dark} />} />
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
