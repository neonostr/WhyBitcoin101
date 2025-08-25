import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import NotFound from "./pages/NotFound";
import QuestionFollow from "./pages/QuestionFollow";
import GetInvolved from "./pages/GetInvolved";
import VideoPage from "./pages/VideoPage";

// Only lazy-load PulseLayers since it's rarely visited
const PulseLayers = lazy(() => import("./pages/PulseLayers"));

const queryClient = new QueryClient();

const ComingSoonRedirect = () => {
  return <Navigate to="/mission" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video/:slug" element={<VideoPage />} />
          <Route path="/coming-soon" element={<ComingSoonRedirect />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/question/:key" element={<QuestionFollow />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/pulse-layer" element={
            <Suspense fallback={null}>
              <PulseLayers />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
