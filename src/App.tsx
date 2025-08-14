import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import QuestionFollow from "./pages/QuestionFollow";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const RedirectToComingSoon = () => {
  const [shouldRedirect, setShouldRedirect] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasDevParam = urlParams.get('dev') === 'true';
    setShouldRedirect(!hasDevParam);
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/coming-soon" replace />;
  }

  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToComingSoon />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/question/:nsec" element={<QuestionFollow />} />
          <Route path="/mission" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
