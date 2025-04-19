import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types/user";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantName?: string;
  participantAvatar?: string;
  isVerified?: boolean;
  lastMessage?: Message;
  lastMessageText?: string;
  lastMessageTime?: string;
  createdAt: string;
  updatedAt?: string;
  relatedBookingId?: string;
  relatedListingId?: string;
  relatedListing?: {
    title: string;
    price: number;
    rentalPeriod: string;
    image?: string;
  };
}

interface ChatContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  startConversation: (participantIds: string[], relatedBookingId?: string, relatedListingId?: string) => string;
  sendMessage: (conversationId: string, senderId: string, receiverId: string, text: string) => void;
  markConversationAsRead: (conversationId: string, userId: string) => void;
  getUserConversations: (userId: string) => Conversation[];
  getConversationMessages: (conversationId: string) => Message[];
  getParticipantInfo: (conversation: Conversation, currentUserId: string) => { 
    name: string; 
    avatar?: string; 
    isVerified: boolean;
  };
}

// Sample initial conversations
const initialConversations: Conversation[] = [
  {
    id: "conversation-1",
    participants: ["user-1", "user-2"],
    participantName: "John Doe",
    participantAvatar: undefined,
    isVerified: true,
    lastMessageText: "Great! I'll see you tomorrow at 2pm.",
    lastMessageTime: "2023-10-15T14:30:00Z",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-15",
    relatedListingId: "listing-1",
    relatedBookingId: "booking-1",
    relatedListing: {
      title: "Professional DSLR Camera",
      price: 25,
      rentalPeriod: "Apr 19-21",
      image: "/lovable-uploads/a6162b67-e53f-4083-811f-f3ff1d19846f.png"
    }
  },
  {
    id: "conversation-2",
    participants: ["user-1", "user-3"],
    participantName: "Sarah Johnson",
    participantAvatar: undefined,
    isVerified: true,
    lastMessageText: "Is the camera still available for this weekend?",
    lastMessageTime: "2023-10-10T09:45:00Z",
    createdAt: "2023-09-25",
    updatedAt: "2023-10-10",
    relatedListingId: "listing-2",
    relatedBookingId: "booking-2"
  },
  {
    id: "conversation-3",
    participants: ["user-1", "user-4"],
    participantName: "Mike Wilson",
    participantAvatar: undefined,
    isVerified: false,
    lastMessageText: "Thanks for the quick response!",
    lastMessageTime: "2023-10-08T16:20:00Z",
    createdAt: "2023-09-20",
    updatedAt: "2023-10-08",
    relatedListingId: "listing-3"
  },
  {
    id: "conversation-4",
    participants: ["user-1", "user-5"],
    participantName: "Emily Davis",
    participantAvatar: undefined,
    isVerified: true,
    lastMessageText: "I'd like to rent your mountain bike next weekend.",
    lastMessageTime: "2023-10-05T11:15:00Z",
    createdAt: "2023-09-15",
    updatedAt: "2023-10-05",
    relatedListingId: "listing-4"
  }
];

// Sample initial messages
const initialMessages: Record<string, Message[]> = {
  "conversation-1": [
    {
      id: "message-1",
      conversationId: "conversation-1",
      senderId: "user-2",
      receiverId: "user-1",
      text: "Hi there! I'm interested in renting your DSLR camera.",
      timestamp: "2023-10-01T10:00:00Z",
      read: true
    },
    {
      id: "message-2",
      conversationId: "conversation-1",
      senderId: "user-1",
      receiverId: "user-2",
      text: "Hello! Yes, it's available. When would you like to rent it?",
      timestamp: "2023-10-01T10:05:00Z",
      read: true
    },
    {
      id: "message-3",
      conversationId: "conversation-1",
      senderId: "user-2",
      receiverId: "user-1",
      text: "I'm planning a photoshoot this weekend. Would it be available from Friday to Sunday?",
      timestamp: "2023-10-01T10:10:00Z",
      read: true
    },
    {
      id: "message-4",
      conversationId: "conversation-1",
      senderId: "user-1",
      receiverId: "user-2",
      text: "Yes, it's available for those dates. The total would be $75 for 3 days.",
      timestamp: "2023-10-01T10:15:00Z",
      read: true
    }
  ],
  "conversation-2": [
    {
      id: "message-5",
      conversationId: "conversation-2",
      senderId: "user-1",
      receiverId: "user-3",
      text: "Hi, is your mountain bike still available for this weekend?",
      timestamp: "2023-09-25T14:00:00Z",
      read: true
    },
    {
      id: "message-6",
      conversationId: "conversation-2",
      senderId: "user-3",
      receiverId: "user-1",
      text: "Yes, it is! Are you thinking of renting it?",
      timestamp: "2023-09-25T14:30:00Z",
      read: true
    },
    {
      id: "message-7",
      conversationId: "conversation-2",
      senderId: "user-1",
      receiverId: "user-3",
      text: "Definitely. I'd like to rent it from the 5th to the 8th if possible.",
      timestamp: "2023-09-25T15:00:00Z",
      read: true
    }
  ]
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    // Check local storage for saved conversations and messages
    const savedConversations = localStorage.getItem("trusted-share-conversations");
    const savedMessages = localStorage.getItem("trusted-share-messages");
    
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    } else {
      setConversations(initialConversations);
      localStorage.setItem("trusted-share-conversations", JSON.stringify(initialConversations));
    }
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(initialMessages);
      localStorage.setItem("trusted-share-messages", JSON.stringify(initialMessages));
    }
  }, []);

  const getParticipantInfo = (conversation: Conversation, currentUserId: string) => {
    // If participant info is already prepared, return it
    if (conversation.participantName) {
      return {
        name: conversation.participantName,
        avatar: conversation.participantAvatar,
        isVerified: conversation.isVerified || false
      };
    }
    
    // Otherwise find the other participant (not the current user)
    const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
    
    // This would be replaced with actual user lookup in a real application
    return {
      name: otherParticipantId || "Unknown User",
      avatar: undefined,
      isVerified: false
    };
  };

  const startConversation = (participantIds: string[], relatedBookingId?: string, relatedListingId?: string) => {
    // Check if conversation already exists between these participants
    const existingConversation = conversations.find(conv => 
      conv.participants.length === participantIds.length && 
      participantIds.every(id => conv.participants.includes(id)) &&
      (!relatedListingId || conv.relatedListingId === relatedListingId)
    );
    
    if (existingConversation) {
      return existingConversation.id;
    }
    
    // Create new conversation
    const newConversationId = `conversation-${Date.now()}`;
    const newConversation: Conversation = {
      id: newConversationId,
      participants: participantIds,
      createdAt: new Date().toISOString(),
      ...(relatedBookingId ? { relatedBookingId } : {}),
      ...(relatedListingId ? { relatedListingId } : {})
    };
    
    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
    localStorage.setItem("trusted-share-conversations", JSON.stringify(updatedConversations));
    
    // Initialize empty message array for this conversation
    const updatedMessages = { ...messages, [newConversationId]: [] };
    setMessages(updatedMessages);
    localStorage.setItem("trusted-share-messages", JSON.stringify(updatedMessages));
    
    return newConversationId;
  };

  const sendMessage = (conversationId: string, senderId: string, receiverId: string, text: string) => {
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      conversationId,
      senderId,
      receiverId,
      text,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add message to conversation
    const conversationMessages = messages[conversationId] || [];
    const updatedConversationMessages = [...conversationMessages, newMessage];
    const updatedMessages = { ...messages, [conversationId]: updatedConversationMessages };
    
    setMessages(updatedMessages);
    localStorage.setItem("trusted-share-messages", JSON.stringify(updatedMessages));
    
    // Update conversation's lastMessage and updatedAt
    const updatedConversations = conversations.map(conversation => 
      conversation.id === conversationId ? {
        ...conversation,
        lastMessage: newMessage,
        lastMessageText: text,
        lastMessageTime: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } : conversation
    );
    
    setConversations(updatedConversations);
    localStorage.setItem("trusted-share-conversations", JSON.stringify(updatedConversations));
  };

  const markConversationAsRead = (conversationId: string, userId: string) => {
    const conversationMessages = messages[conversationId] || [];
    
    // Mark all messages from other participants as read
    const updatedConversationMessages = conversationMessages.map(message => 
      message.receiverId === userId && !message.read ? { ...message, read: true } : message
    );
    
    const updatedMessages = { ...messages, [conversationId]: updatedConversationMessages };
    setMessages(updatedMessages);
    localStorage.setItem("trusted-share-messages", JSON.stringify(updatedMessages));
  };

  const getUserConversations = (userId: string) => {
    return conversations.filter(conversation => 
      conversation.participants.includes(userId)
    ).sort((a, b) => {
      const aDate = a.updatedAt || a.createdAt;
      const bDate = b.updatedAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime(); // Sort by most recent
    });
  };

  const getConversationMessages = (conversationId: string) => {
    return messages[conversationId] || [];
  };

  return (
    <ChatContext.Provider value={{ 
      conversations, 
      messages, 
      startConversation, 
      sendMessage, 
      markConversationAsRead, 
      getUserConversations, 
      getConversationMessages,
      getParticipantInfo
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
