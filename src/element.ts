type PageContainer = HTMLElement & { id: "page-container" };
const PageContainer = {
  getElement: (): PageContainer => document.querySelector("#page-container")!,
  getLang: () => PageContainer.getElement().getAttribute("lang")!,
} as const;

type ChatLog = HTMLElement & { id: "chatLog" };
const ChatLog = {
  getElement: (): ChatLog => document.querySelector("#chatLog")!,
  isChatLog: (node: Node): node is ChatLog =>
    node instanceof HTMLElement && node.id === "chatLog",
} as const;

/**
 * Find the original gikopoipoi element.
 */
export const PoiElement = {
  PageContainer,
  ChatLog,
  vueApp: () => document.querySelector("#vue-app")!,
  chatLogContainer: () => document.querySelector("#chat-log-container")!,
  chatLogLabel: () => document.querySelector("#chat-log-label")!,
  isMessage: (node: Node): node is HTMLDivElement =>
    node instanceof HTMLDivElement && node.className === "message",
} as const;
