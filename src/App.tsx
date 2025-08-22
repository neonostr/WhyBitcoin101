import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import NotFound from "./pages/NotFound";
import QuestionFollow from "./pages/QuestionFollow";
import GetInvolved from "./pages/GetInvolved";
import VideoPage from "./pages/VideoPage";

// Only lazy-load BaseLayers since it's rarely visited
const BaseLayers = lazy(() => import("./pages/BaseLayers"));

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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video/:slug" element={<VideoPage />} />
          <Route path="/coming-soon" element={<ComingSoonRedirect />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/question/:key" element={<QuestionFollow />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/base-layer" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">Loading...</div></div>}>
              <BaseLayers />
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
