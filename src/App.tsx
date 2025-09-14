import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Rankings from "./pages/Rankings";
import Recruiting from "./pages/Recruiting";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";

// Unit pages
import Indsatsleder from "./pages/units/Indsatsleder";
import Hundeforer from "./pages/units/Hundeforer";
import MotorcykelBetjent from "./pages/units/MotorcykelBetjent";
import ReaktionsPatruljen from "./pages/units/ReaktionsPatruljen";
import CivilPatruljen from "./pages/units/CivilPatruljen";
import AktionStyrken from "./pages/units/AktionStyrken";

// Application pages
import IndsatslederApply from "./pages/applications/IndsatslederApply";
import HundeforerApply from "./pages/applications/HundeforerApply";
import MotorcykelApply from "./pages/applications/MotorcykelApply";
import ReaktionsApply from "./pages/applications/ReaktionsApply";
import CivilApply from "./pages/applications/CivilApply";
import AktionApply from "./pages/applications/AktionApply";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/om-os" element={<About />} />
            <Route path="/rangorden" element={<Rankings />} />
            <Route path="/rekruttering" element={<Recruiting />} />
            <Route path="/ansog" element={<Apply />} />
            
            {/* Unit pages */}
            <Route path="/enheder/indsatsleder" element={<Indsatsleder />} />
            <Route path="/enheder/hundeforer" element={<Hundeforer />} />
            <Route path="/enheder/motorcykel-betjent" element={<MotorcykelBetjent />} />
            <Route path="/enheder/reaktions-patruljen" element={<ReaktionsPatruljen />} />
            <Route path="/enheder/civil-patruljen" element={<CivilPatruljen />} />
            <Route path="/enheder/aktions-styrken" element={<AktionStyrken />} />
            
            {/* Application pages */}
            <Route path="/ansog/indsatsleder" element={<IndsatslederApply />} />
            <Route path="/ansog/hundeforer" element={<HundeforerApply />} />
            <Route path="/ansog/motorcykel-betjent" element={<MotorcykelApply />} />
            <Route path="/ansog/reaktions-patruljen" element={<ReaktionsApply />} />
            <Route path="/ansog/civil-patruljen" element={<CivilApply />} />
            <Route path="/ansog/aktions-styrken" element={<AktionApply />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
