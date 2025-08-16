import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import NotFound from "./pages/NotFound";
import QuestionFollow from "./pages/QuestionFollow";
import GetInvolved from "./pages/GetInvolved";

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
          <Route path="/coming-soon" element={<ComingSoonRedirect />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/question/:key" element={<QuestionFollow />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
