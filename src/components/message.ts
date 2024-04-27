export type PipMessage = HTMLDivElement & { readonly className: "message" };
export const PipMessage = {
  create: (original: HTMLDivElement): PipMessage => {
    const cloned = original.cloneNode(true) as HTMLElement;
    cloned.querySelector(".message-body")?.previousSibling?.remove();

    const userId = cloned.getAttribute("data-user-id")!;
    const userIdSpan = document.createElement("span");
    userIdSpan.className = "message-author";
    userIdSpan.innerHTML = `(${userId.slice(0, 6)})`;
    cloned.insertBefore(userIdSpan, cloned.querySelector(".message-body"));
    return cloned as PipMessage;
  },
} as const;
