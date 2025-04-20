import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignupLogin from "./pages/SignupLogin";
import ListItem from "./pages/ListItem";
import Browse from "./pages/Browse";
import ItemDetails from "./pages/ItemDetails";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import Alerts from "./pages/Alerts";
import AdminPolicy from "./pages/AdminPolicy";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<SignupLogin />} />
          <Route path="/list-item" element={<ListItem />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/policies" element={<AdminPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
