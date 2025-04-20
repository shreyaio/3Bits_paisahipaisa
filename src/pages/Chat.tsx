import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { Search, Send, Image, Paperclip, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages: allMessages, 
    sendMessage, 
    getConversationMessages,
    getUserConversations,
    getParticipantInfo
  } = useChat();

  const [selectedConversation, setSelectedConversation] = useState(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get user conversations or show example conversations if no user
  const userConversations = user 
    ? getUserConversations(user.id)
    : conversations;
  
  // Filter conversations based on search query
  const filteredConversations = userConversations.filter(convo => {
    const participantInfo = getParticipantInfo(convo, user?.id || "");
    return participantInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get messages for the selected conversation
  const conversationMessages = selectedConversation 
    ? getConversationMessages(selectedConversation)
    : [];
  
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [conversationMessages]);
  
  // Get the selected conversation details
  const activeConversation = userConversations.find(
    convo => convo.id === selectedConversation
  );
  
  // Get participant info for the selected conversation
  const participantInfo = activeConversation 
    ? getParticipantInfo(activeConversation, user?.id || "")
    : { name: "", avatar: undefined, isVerified: false };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation || !user) return;
    
    const otherParticipantId = activeConversation?.participants.find(id => id !== user.id) || "";
    
    sendMessage(
      selectedConversation,
      user.id,
      otherParticipantId,
      messageText
    );
    
    setMessageText("");
  };

  useEffect(() => {
    // Set the first conversation as selected if none is selected
    if (filteredConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(filteredConversations[0].id);
    }
  }, [filteredConversations, selectedConversation]);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-14rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Conversations list */}
            <div className="border-r">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Messages</h2>
                  <Link to="/messages">
                    <Button variant="outline" size="sm">Try New UI</Button>
                  </Link>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-80px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((convo) => {
                    const participant = getParticipantInfo(convo, user?.id || "");
                    
                    return (
                      <div
                        key={convo.id}
                        className={`p-4 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                          selectedConversation === convo.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setSelectedConversation(convo.id)}
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {participant.avatar ? (
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-lg text-gray-500">
                              {participant.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate flex items-center">
                              {participant.name}
                              {participant.isVerified && (
                                <VerificationBadge status="verified" className="ml-1" />
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {convo.lastMessageTime && new Date(convo.lastMessageTime).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {convo.lastMessageText}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="md:col-span-2 flex flex-col h-full">
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {participantInfo.avatar ? (
                          <img
                            src={participantInfo.avatar}
                            alt={participantInfo.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-lg text-gray-500">
                            {participantInfo.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium flex items-center">
                          {participantInfo.name}
                          {participantInfo.isVerified && (
                            <VerificationBadge status="verified" className="ml-1" />
                          )}
                        </div>
                        <div className="text-xs text-green-500">Online</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
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
                                  ? "bg-brand-blue text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              <div className="text-sm mb-1">{msg.text}</div>
                              <div
                                className={`text-xs ${
                                  isCurrentUser ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-grow"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
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
                    <p className="text-gray-500 mb-4">
                      Select a conversation or start a new one
                    </p>
                    <Button>Start a New Chat</Button>
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

export default Chat;