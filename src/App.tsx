import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import QuestionFollow from "./pages/QuestionFollow";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const RedirectToComingSoon = () => {
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(() => {
    // Check on initial render to avoid flash
    const urlParams = new URLSearchParams(location.search);
    const devValue = urlParams.get('dev')?.trim().replace(/\?+$/, '');
    return devValue !== 'true';
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const devValue = urlParams.get('dev')?.trim().replace(/\?+$/, '');
    const hasDevParam = devValue === 'true';
    console.log('Dev param check:', { 
      search: location.search, 
      hasDevParam, 
      devValue,
      rawDevValue: urlParams.get('dev')
    });
    setShouldRedirect(!hasDevParam);
    console.log('Setting shouldRedirect to:', !hasDevParam);
  }, [location.search]);

  console.log('Current shouldRedirect state:', shouldRedirect);

  if (shouldRedirect) {
    console.log('Redirecting to coming-soon');
    return <Navigate to={`/coming-soon${location.search}`} replace />;
  }

  console.log('Showing Index page');
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
