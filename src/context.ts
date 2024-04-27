import { PoiElement } from "./element";
import { drawButton } from "./drawButton";
import { style } from "./style";

export type Context = {
  pipContainerElement: HTMLDivElement;
  pipStyleElement: HTMLStyleElement;
  init: boolean;
};

export const Context = {
  new: (): Context => {
    const pip = document.createElement("div");
    pip.id = "userscript-pip-container";

    const pipStyle = document.createElement("style");
    pipStyle.textContent = style;

    return {
      pipContainerElement: pip,
      pipStyleElement: pipStyle,
      init: false,
    };
  },
  update: (context: Context, records: MutationRecord[]): Context => {
    if (!context.init && PoiElement.chatLogContainer()) {
      return drawButton(context);
    }

    const chatLogRecords = records.filter((r) =>
      PoiElement.ChatLog.isChatLog(r.target)
    );
    if (chatLogRecords.length === 0) return context;
    chatLogRecords
      .flatMap((r) => Array.from(r.addedNodes))
      .filter(PoiElement.isMessage)
      .forEach((node) => {
        const cloned = node.cloneNode(true) as HTMLElement;
        cloned.querySelector(".message-body")?.previousSibling?.remove();

        const userId = cloned.getAttribute("data-user-id")!;
        const userIdSpan = document.createElement("span");
        userIdSpan.className = "message-author";
        userIdSpan.innerHTML = `(${userId.slice(0, 6)})`;

        cloned.insertBefore(userIdSpan, cloned.querySelector(".message-body"));
        context.pipContainerElement.append(cloned);
        context.pipContainerElement.parentElement?.scrollBy(
          0,
          cloned.clientHeight + 8
        );
      });

    return context;
  },
} as const;
