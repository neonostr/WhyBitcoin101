import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Mission = lazy(() => import("./pages/Mission"));
const NotFound = lazy(() => import("./pages/NotFound"));
const QuestionFollow = lazy(() => import("./pages/QuestionFollow"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/video/:slug" element={<VideoPage />} />
            <Route path="/coming-soon" element={<ComingSoonRedirect />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/question/:key" element={<QuestionFollow />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/base-layer" element={<BaseLayers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
