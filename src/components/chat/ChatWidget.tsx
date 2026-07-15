"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { LogoIcon } from "@/components/brand/LogoIcon";
import {
  CHAT_GREETING,
  CHAT_HIDDEN_PREFIXES,
  CHAT_LINKS,
  CHAT_PHONE_DISPLAY,
  CHAT_PHONE_TEL,
  CHAT_SUGGESTIONS,
} from "@/lib/chat/config";

/** Only link real site routes — never slash-words like genuine/authorized. */
const LINKABLE_PATHS = Object.values(CHAT_LINKS)
  .slice()
  .sort((a, b) => b.length - a.length);

const LINKABLE_PATH_PATTERN = LINKABLE_PATHS.map((path) =>
  path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
).join("|");

const LINKIFY_PATTERN = new RegExp(
  `(\\+91[\\s-]?\\d{2}[\\s-]?\\d{4}[\\s-]?\\d{4}|(?<![A-Za-z0-9])(?:${LINKABLE_PATH_PATTERN})(?![A-Za-z0-9-]))`,
  "g",
);

function messageText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("") ?? ""
  );
}

/** Soften model output: strip markdown-ish noise, keep short chat paragraphs. */
function normalizeBotText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function linkify(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(LINKIFY_PATTERN.source, LINKIFY_PATTERN.flags);

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const value = match[0];
    if (value.startsWith("/")) {
      nodes.push(
        <Link key={`${match.index}-${value}`} href={value} className="chat-widget__inline-link">
          {value}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${match.index}-${value}`}
          href={`tel:${CHAT_PHONE_TEL}`}
          className="chat-widget__inline-link"
        >
          {value}
        </a>,
      );
    }
    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6a2.5 2.5 0 0 1-2.5 2.5H12l-3.8 2.85a.6.6 0 0 1-.95-.48V16H7.5A2.5 2.5 0 0 1 5 13.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10h7M8.5 12.5h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 12a8 8 0 1 1-2.34-5.66"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 5v5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 18V7M7.5 11.5 12 7l4.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const titleId = useId();
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState("chat-initial");
  const [typingHold, setTypingHold] = useState(false);
  const typingStartedAt = useRef<number | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const { messages, sendMessage, status, setMessages, error, clearError } =
    useChat({
      id: chatId,
      transport,
    });

  const hidden = CHAT_HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`),
  );

  const busy = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const lastAssistantText =
    lastMessage?.role === "assistant" ? messageText(lastMessage) : "";
  const awaitingFirstTokens =
    status === "submitted" || (status === "streaming" && !lastAssistantText);
  const showTyping = typingHold || awaitingFirstTokens;
  const canSend = Boolean(input.trim()) && !busy;

  useEffect(() => {
    const MIN_TYPING_MS = 1100;

    if (awaitingFirstTokens) {
      if (typingStartedAt.current == null) {
        typingStartedAt.current = Date.now();
      }
      setTypingHold(true);
      return;
    }

    if (!typingHold) {
      typingStartedAt.current = null;
      return;
    }

    const started = typingStartedAt.current ?? Date.now();
    const remaining = Math.max(0, MIN_TYPING_MS - (Date.now() - started));
    const timer = window.setTimeout(() => {
      setTypingHold(false);
      typingStartedAt.current = null;
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [awaitingFirstTokens, typingHold]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, open, status, showTyping]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const startNewChat = useCallback(() => {
    clearError();
    setMessages([]);
    setInput("");
    setTypingHold(false);
    typingStartedAt.current = null;
    setChatId(`chat-${Date.now()}`);
  }, [clearError, setMessages]);

  const submitText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      clearError();
      sendMessage({ text: trimmed });
      setInput("");
    },
    [busy, clearError, sendMessage],
  );

  const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitText(input);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitText(input);
  };

  if (hidden) return null;

  return (
    <div className={`chat-widget${open ? " chat-widget--open" : ""}`}>
      {open ? (
        <section
          id={panelId}
          className="chat-widget__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          data-lenis-prevent
        >
          <header className="chat-widget__header">
            <div className="chat-widget__brand">
              <span className="chat-widget__mark" aria-hidden>
                <LogoIcon className="chat-widget__mark-icon" />
              </span>
              <p id={titleId} className="chat-widget__title">
                Sri&nbsp;Comforts
              </p>
            </div>
            <button
              type="button"
              className="chat-widget__icon-btn"
              onClick={startNewChat}
              aria-label="Start a new chat"
              title="New chat"
            >
              <RefreshIcon />
            </button>
          </header>

          <div
            className="chat-widget__body"
            ref={listRef}
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
          >
            <div className="chat-widget__bubble chat-widget__bubble--bot">
              <p>{CHAT_GREETING}</p>
            </div>

            {messages.length === 0 ? (
              <div className="chat-widget__chips" role="list">
                {CHAT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    role="listitem"
                    className="chat-widget__chip"
                    onClick={() => submitText(suggestion)}
                    disabled={busy}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            {messages.map((message) => {
              const text = messageText(message);
              if (!text) return null;
              const isUser = message.role === "user";
              if (isUser) {
                return (
                  <div
                    key={message.id}
                    className="chat-widget__bubble chat-widget__bubble--user"
                  >
                    <p>{text}</p>
                  </div>
                );
              }

              const paragraphs = normalizeBotText(text)
                .split(/\n\s*\n/)
                .map((part) => part.trim())
                .filter(Boolean);

              return (
                <div
                  key={message.id}
                  className="chat-widget__bubble chat-widget__bubble--bot"
                >
                  {(paragraphs.length > 0 ? paragraphs : [text]).map((part, index) => (
                    <p key={`${message.id}-p-${index}`}>{linkify(part)}</p>
                  ))}
                </div>
              );
            })}

            {showTyping ? (
              <div
                className="chat-widget__bubble chat-widget__bubble--bot chat-widget__bubble--typing"
                aria-live="polite"
              >
                <span className="chat-widget__dot" />
                <span className="chat-widget__dot" />
                <span className="chat-widget__dot" />
              </div>
            ) : null}

            {error ? (
              <div className="chat-widget__error" role="alert">
                <p>
                  {error.message ||
                    `Something went wrong. Call ${CHAT_PHONE_DISPLAY} or try again.`}
                </p>
                <a href={`tel:${CHAT_PHONE_TEL}`} className="chat-widget__error-link">
                  Call {CHAT_PHONE_DISPLAY}
                </a>
              </div>
            ) : null}
          </div>

          <footer className="chat-widget__footer">
            <form className="chat-widget__composer" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="chat-widget-input">
                Message
              </label>
              <textarea
                id="chat-widget-input"
                ref={inputRef}
                className="chat-widget__input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onComposerKeyDown}
                placeholder="Message..."
                disabled={busy}
                autoComplete="off"
                maxLength={2000}
                rows={1}
              />
              <button
                type="submit"
                className="chat-widget__send"
                disabled={!canSend}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </form>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        className="chat-widget__fab"
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              queueMicrotask(() => inputRef.current?.focus());
            }
            return next;
          });
        }}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat" : "Open Sri Comforts chat"}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open ? <span className="chat-widget__fab-label">Chat</span> : null}
      </button>
    </div>
  );
}
