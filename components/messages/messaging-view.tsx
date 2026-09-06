"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Send,
  CheckCheck,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "provider";
  text: string;
  timestamp: string;
}

export interface ConversationThread {
  id: string;
  providerName: string;
  providerInitial: string;
  providerRole: string;
  serviceTitle: string;
  serviceSlug: string;
  bookingId?: string;
  bookingScope?: string;
  bookingPrice?: number;
  scheduledTime?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

const INITIAL_THREADS: ConversationThread[] = [
  {
    id: "conv-akosua",
    providerName: "Akosua CleanCo",
    providerInitial: "A",
    providerRole: "Professional House Cleaning Specialist",
    serviceTitle: "Professional House Cleaning",
    serviceSlug: "standard-home-cleaning",
    bookingId: "BK-98124",
    bookingScope: "Routine maintenance cleaning of 2 bedrooms, 2 bathrooms, kitchen, and living room.",
    bookingPrice: 360,
    scheduledTime: "Mon, Sep 14 · 9:30 AM",
    lastMessage: "Noted! We have added specialized bathroom descaling to our kit. See you Monday morning at 9:30 AM!",
    lastTimestamp: "10:42 AM",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "m-1",
        sender: "provider",
        text: "Hello! Thank you for booking our 2-3 Bedroom cleaning session. Our team of 2 will arrive at House 14, East Legon with all eco-friendly supplies and industrial vacuums.",
        timestamp: "10:15 AM",
      },
      {
        id: "m-2",
        sender: "customer",
        text: "Hello Akosua, looks great. Please remember to bring the tile descaler for the master bathroom as discussed.",
        timestamp: "10:30 AM",
      },
      {
        id: "m-3",
        sender: "provider",
        text: "Noted! We have added specialized bathroom descaling to our kit. See you Monday morning at 9:30 AM!",
        timestamp: "10:42 AM",
      },
    ],
  },
  {
    id: "conv-kwame",
    providerName: "Kwame Mensah",
    providerInitial: "K",
    providerRole: "Licensed Master Plumber",
    serviceTitle: "Residential Plumbing & Pipe Repairs",
    serviceSlug: "residential-plumbing-repairs",
    bookingId: "BK-44821",
    bookingScope: "Repairing 2 leaking washbasin traps & mechanical drain snaking.",
    bookingPrice: 350,
    scheduledTime: "Thu, Sep 10 · 10:00 AM",
    lastMessage: "Yes, standard fittings and leak testing are fully covered in the agreed price.",
    lastTimestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "m-101",
        sender: "provider",
        text: "Good morning! I reviewed your booking request regarding the leaking washbasin traps. I have replacement brass P-traps in my tool kit ready.",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: "m-102",
        sender: "customer",
        text: "Great Kwame, is the GHS 350 price inclusive of the new pipe fittings?",
        timestamp: "Yesterday, 3:30 PM",
      },
      {
        id: "m-103",
        sender: "provider",
        text: "Yes, standard fittings and leak testing are fully covered in the agreed price.",
        timestamp: "Yesterday, 3:45 PM",
      },
    ],
  },
  {
    id: "conv-kofi",
    providerName: "Kofi Boateng",
    providerInitial: "K",
    providerRole: "Certified Industrial & Residential Electrician",
    serviceTitle: "Electrical Wiring & Breaker Panel Repair",
    serviceSlug: "electrical-repairs-wiring",
    bookingId: "BK-77192",
    bookingScope: "Diagnosing tripping MCB breaker & phase load re-balancing on 3-phase board.",
    bookingPrice: 380,
    scheduledTime: "Today · 9:30 AM",
    lastMessage: "Hello! I am currently heading towards Ahodwo for the diagnostic. Will be there shortly.",
    lastTimestamp: "9:12 AM",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: "m-201",
        sender: "provider",
        text: "Hello! I am currently heading towards Ahodwo for the diagnostic. Will be there shortly.",
        timestamp: "9:12 AM",
      },
    ],
  },
];

const QUICK_PROMPTS = [
  "Can you arrive 15 minutes earlier?",
  "Where can I share gate security access?",
  "Is the price inclusive of materials?",
  "Please call me when you are near the location.",
];

export function MessagingView() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-[#74767E]">Loading messaging center...</div>}>
      <MessagingViewContent />
    </React.Suspense>
  );
}

function MessagingViewContent() {
  const { isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const targetProvider = searchParams.get("to");
  const targetService = searchParams.get("service");

  const [threads, setThreads] = React.useState<ConversationThread[]>(() => {
    let list = INITIAL_THREADS;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fixit_messages");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed;
          }
        } catch {
          // fallback
        }
      }
    }

    if (targetProvider) {
      const exists = list.find((t) =>
        t.providerName.toLowerCase().includes(targetProvider.toLowerCase())
      );
      if (!exists) {
        const newThread: ConversationThread = {
          id: generateId("conv"),
          providerName: targetProvider,
          providerInitial: targetProvider.charAt(0).toUpperCase(),
          providerRole: "Verified Marketplace Provider",
          serviceTitle: targetService || "Requested Service Consultation",
          serviceSlug: targetService ? targetService.toLowerCase().replace(/\s+/g, "-") : "all",
          bookingPrice: 200,
          lastMessage: "Hi! How can I assist you with this service?",
          lastTimestamp: "Just now",
          unreadCount: 0,
          isOnline: true,
          messages: [
            {
              id: generateId("msg"),
              sender: "provider",
              text: `Hello! Thank you for reaching out regarding ${targetService || "our services"}. How can I assist you today?`,
              timestamp: "Just now",
            },
          ],
        };
        list = [newThread, ...list];
        if (typeof window !== "undefined") {
          localStorage.setItem("fixit_messages", JSON.stringify(list));
        }
      }
    }

    return list;
  });

  const [activeThreadId, setActiveThreadId] = React.useState<string>(() => {
    if (targetProvider && threads.length > 0) {
      const match = threads.find((t) =>
        t.providerName.toLowerCase().includes(targetProvider.toLowerCase())
      );
      if (match) return match.id;
    }
    return threads[0]?.id || INITIAL_THREADS[0].id;
  });

  const [searchQuery, setSearchQuery] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [activeThreadId, activeThread?.messages.length]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || !activeThread) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMessage: ChatMessage = {
      id: generateId("msg"),
      sender: "customer",
      text,
      timestamp: timeString,
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          lastMessage: text,
          lastTimestamp: "Just now",
          messages: [...t.messages, newMessage],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setInputText("");
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_messages", JSON.stringify(updatedThreads));
    }

    // Auto-reply simulation after 1.2s to create responsive experience
    setTimeout(() => {
      const replies = [
        "Received! Thanks for confirming. I'll make sure this is noted for the job.",
        "Got it! We have that covered. Let me know if you need anything else.",
        "Understood. Our team will bring the necessary tools and be ready on schedule!",
        "Perfect, thank you! Feel free to reach out if you have further questions before then.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const providerReply: ChatMessage = {
        id: generateId("msg-reply"),
        sender: "provider",
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setThreads((current) => {
        const next = current.map((t) => {
          if (t.id === activeThread.id) {
            return {
              ...t,
              lastMessage: randomReply,
              lastTimestamp: "Just now",
              messages: [...t.messages, providerReply],
            };
          }
          return t;
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("fixit_messages", JSON.stringify(next));
        }
        return next;
      });
    }, 1200);
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-white rounded-[16px] border border-[#DADBDD] p-8 sm:p-12 text-center max-w-[560px] mx-auto shadow-xs my-8">
        <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#008744] flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 stroke-[2]" />
        </div>
        <h2 className="text-[22px] font-bold text-[#222325] mb-2">
          Sign in to access your messages
        </h2>
        <p className="text-[14px] text-[#62646A] leading-relaxed mb-6">
          Connect directly with verified service technicians, coordinate appointment details, and discuss project scopes.
        </p>
        <div className="flex items-center justify-center gap-3">
          <SignInButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Join Fix it
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] border border-[#DADBDD] shadow-sm overflow-hidden flex flex-col md:flex-row h-[740px]">
      {/* Left Sidebar: Threads List */}
      <div className="w-full md:w-[360px] lg:w-[400px] border-r border-[#DADBDD] flex flex-col bg-white shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#DADBDD]">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[20px] font-bold text-[#222325]">Messages</h1>
            <span className="text-[12px] font-medium text-[#74767E] bg-[#F7F7F7] px-2.5 py-1 rounded-full">
              {threads.length} conversations
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#74767E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats or services..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F7F7] border border-transparent rounded-[8px] text-[13px] text-[#222325] placeholder:text-[#74767E] focus:bg-white focus:border-[#222325] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F0F0F0]">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-[#74767E] text-[13px]">
              No conversations found.
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread?.id;
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-4 transition-colors flex items-start gap-3 cursor-pointer ${
                    isSelected ? "bg-[#F4F9F5] border-l-4 border-l-[#008744]" : "hover:bg-[#F9FAFB]"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center text-[15px] border border-[#DADBDD]/60">
                      {thread.providerInitial}
                    </div>
                    {thread.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#008744] border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Thread details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-semibold text-[14px] text-[#222325] truncate">
                        {thread.providerName}
                      </span>
                      <span className="text-[11px] text-[#74767E] shrink-0">
                        {thread.lastTimestamp}
                      </span>
                    </div>

                    <p className="text-[12px] font-medium text-[#008744] truncate mb-1">
                      {thread.serviceTitle}
                    </p>

                    <p className="text-[12px] text-[#62646A] truncate leading-relaxed">
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Pane: Active Chat Window */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-[#FAFAFA] min-w-0">
          {/* Top Bar */}
          <div className="p-4 bg-white border-b border-[#DADBDD] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center text-[14px] shrink-0">
                {activeThread.providerInitial}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-[15px] text-[#222325] truncate">
                    {activeThread.providerName}
                  </h2>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#008744] bg-[#E6F4EA] px-1.5 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-[12px] text-[#74767E] truncate">
                  {activeThread.providerRole} · {activeThread.isOnline ? "Online now" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/services/${activeThread.serviceSlug}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium text-[#404145] hover:text-[#008744] bg-[#F7F7F7] hover:bg-[#EBF7EE] px-3 py-1.5 rounded-[6px] border border-[#DADBDD] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Service
              </Link>
              {activeThread.bookingId && (
                <Link
                  href="/bookings"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#008744] hover:underline px-2 py-1.5"
                >
                  Bookings ({activeThread.bookingId})
                </Link>
              )}
            </div>
          </div>

          {/* Contextual Job Banner */}
          {activeThread.bookingId && (
            <div className="bg-[#F0FDF4] border-b border-[#DCFCE7] px-4 py-2.5 flex items-center justify-between text-[12px] text-[#166534]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold">Job #{activeThread.bookingId}:</span>
                <span className="font-medium text-[#222325]">{activeThread.serviceTitle}</span>
                {activeThread.bookingPrice && (
                  <span className="bg-white border border-[#BBF7D0] px-2 py-0.5 rounded text-[11px] font-bold text-[#008744]">
                    GHS {activeThread.bookingPrice.toLocaleString()}
                  </span>
                )}
                {activeThread.scheduledTime && (
                  <span className="flex items-center gap-1 text-[#4B5563]">
                    <Clock className="w-3 h-3 text-[#166534]" /> {activeThread.scheduledTime}
                  </span>
                )}
              </div>
              <Link
                href="/bookings"
                className="text-[11px] font-bold text-[#008744] hover:underline shrink-0"
              >
                Track Booking
              </Link>
            </div>
          )}

          {/* Message Bubbles Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <div className="text-center my-2">
              <span className="text-[11px] font-medium text-[#74767E] bg-white border border-[#DADBDD] px-3 py-1 rounded-full shadow-xs">
                End-to-end encrypted marketplace chat · Accra, Ghana
              </span>
            </div>

            {activeThread.messages.map((msg) => {
              const isCustomer = msg.sender === "customer";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-[14px] px-4 py-3 shadow-xs ${
                      isCustomer
                        ? "bg-[#222325] text-white rounded-br-xs"
                        : "bg-white text-[#222325] border border-[#DADBDD]/80 rounded-bl-xs"
                    }`}
                  >
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isCustomer ? "text-gray-300" : "text-[#74767E]"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isCustomer && <CheckCheck className="w-3.5 h-3.5 text-[#008744]" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-white border-t border-[#F0F0F0] overflow-x-auto no-scrollbar flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#008744] shrink-0" />
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap bg-[#F7F7F7] hover:bg-[#EBF7EE] text-[#404145] hover:text-[#008744] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#DADBDD]/60 transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-[#DADBDD]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
                placeholder={`Message ${activeThread.providerName}... (Enter to send)`}
                className="flex-1 resize-none bg-[#F7F7F7] border border-[#DADBDD] focus:border-[#222325] focus:bg-white rounded-[10px] px-4 py-2.5 text-[13px] text-[#222325] placeholder:text-[#74767E] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="h-[42px] px-4 bg-[#008744] hover:bg-[#007038] disabled:bg-[#DADBDD] disabled:text-[#74767E] text-white font-medium text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-[#74767E] text-[14px]">
          Select a conversation to begin messaging
        </div>
      )}
    </div>
  );
}
