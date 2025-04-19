import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat, Conversation, Message } from "@/contexts/ChatContext";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  ChevronRight,
  Camera,
  Paperclip
} from "lucide-react";

const Messages = () => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    sendMessage, 
    getConversationMessages,
    getUserConversations,
    markConversationAsRead,
    getParticipantInfo
  } = useChat();
  const { toast } = useToast();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get user conversations or show example conversations if no user
  const userConversations = user 
    ? getUserConversations(user.id)
    : conversations;
  
  // Filter conversations based on search query
  const filteredConversations = userConversations.filter(convo => {
    const participantInfo = getParticipantInfo(convo, user?.id || "");
    return participantInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get the selected conversation
  const selectedConversation = selectedConversationId 
    ? userConversations.find(convo => convo.id === selectedConversationId) 
    : null;
  
  // Get messages for the selected conversation
  const conversationMessages = selectedConversationId 
    ? getConversationMessages(selectedConversationId)
    : [];
  
  // Set the first conversation as selected if none is selected
  useEffect(() => {
    if (filteredConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(filteredConversations[0].id);
    }
  }, [filteredConversations, selectedConversationId]);
  
  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversationId && user) {
      markConversationAsRead(selectedConversationId, user.id);
    }
  }, [selectedConversationId, user, markConversationAsRead]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);
  
  // Get participant info for the selected conversation
  const participantInfo = selectedConversation 
    ? getParticipantInfo(selectedConversation, user?.id || "")
    : { name: "", avatar: undefined, isVerified: false };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId || !user) {
      return;
    }
    
    const otherParticipantId = selectedConversation?.participants.find(id => id !== user.id) || "";
    
    sendMessage(
      selectedConversationId,
      user.id,
      otherParticipantId,
      messageText
    );
    
    setMessageText("");
    
    // Show toast confirmation
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  // Format message timestamp
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="container mx-auto py-4">
        <div className="bg-[#1A1F2C] text-white rounded-lg overflow-hidden h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Left sidebar - Conversations list */}
            <div className="border-r border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold">Messages</h1>
                <p className="text-gray-400 text-sm">Communicate with renters and owners</p>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 bg-[#252A37] border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-130px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((convo) => {
                    const participantInfo = getParticipantInfo(convo, user?.id || "");
                    const isSelected = selectedConversationId === convo.id;
                    
                    return (
                      <div
                        key={convo.id}
                        className={`p-4 border-b border-gray-700 flex items-center gap-3 cursor-pointer hover:bg-[#252A37] ${
                          isSelected ? "bg-[#252A37]" : ""
                        }`}
                        onClick={() => setSelectedConversationId(convo.id)}
                      >
                        <Avatar className="h-12 w-12">
                          {participantInfo.avatar ? (
                            <AvatarImage src={participantInfo.avatar} alt={participantInfo.name} />
                          ) : (
                            <AvatarFallback className="bg-gray-600 text-white">
                              {participantInfo.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate flex items-center">
                              {participantInfo.name}
                              {participantInfo.isVerified && (
                                <span className="ml-1">
                                  <VerificationBadge status="verified" />
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-400 truncate mt-1">
                            {convo.lastMessageText}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    No conversations found
                  </div>
                )}
              </div>
            </div>
            
            {/* Right section - Chat area */}
            <div className="md:col-span-2 flex flex-col h-full bg-[#121212]">
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        {participantInfo.avatar ? (
                          <AvatarImage src={participantInfo.avatar} alt={participantInfo.name} />
                        ) : (
                          <AvatarFallback className="bg-gray-600 text-white">
                            {participantInfo.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div>
                        <div className="font-medium flex items-center">
                          {participantInfo.name}
                          {participantInfo.isVerified && (
                            <span className="ml-1">
                              <VerificationBadge status="verified" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-green-500">Verified User</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full text-white">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full text-white">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full text-white">
                        <span className="sr-only">More</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Related item info */}
                  {selectedConversation.relatedListing && (
                    <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-800 rounded overflow-hidden">
                          {selectedConversation.relatedListing.image ? (
                            <img 
                              src={selectedConversation.relatedListing.image} 
                              alt={selectedConversation.relatedListing.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-800">
                              <Camera className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{selectedConversation.relatedListing.title}</div>
                          <div className="text-sm text-gray-400">
                            ${selectedConversation.relatedListing.price}/day · Rental: {selectedConversation.relatedListing.rentalPeriod}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-white flex items-center">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                  
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#1A1F2C]">
                    {conversationMessages.length > 0 ? (
                      conversationMessages.map((msg) => {
                        const isCurrentUser = msg.senderId === user?.id;
                        
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                isCurrentUser
                                  ? "bg-[#9b87f5] text-white"
                                  : "bg-[#252A37] text-white"
                              }`}
                            >
                              <div className="text-sm mb-1">{msg.text}</div>
                              <div
                                className={`text-xs ${
                                  isCurrentUser ? "text-purple-200" : "text-gray-400"
                                } text-right`}
                              >
                                {formatMessageTime(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t border-gray-700 bg-[#121212]">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <div className="flex-grow relative">
                        <Textarea
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="min-h-0 h-10 py-2 resize-none bg-[#252A37] border-gray-700 text-white"
                        />
                      </div>
                      <Button 
                        onClick={handleSendMessage} 
                        className="rounded-full h-10 w-10 p-0 bg-[#9b87f5] hover:bg-[#7E69AB]"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <div className="text-gray-400 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Your Messages</h3>
                    <p className="text-gray-400 mb-4">
                      Select a conversation or start a new one
                    </p>
                    <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">Start a New Chat</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
