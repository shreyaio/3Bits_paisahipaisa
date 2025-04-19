
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { ListingProvider } from './contexts/ListingContext';
import { BookingProvider } from './contexts/BookingContext';
import { ChatProvider } from './contexts/ChatContext';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ListingProvider>
      <BookingProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </BookingProvider>
    </ListingProvider>
  </AuthProvider>
);
