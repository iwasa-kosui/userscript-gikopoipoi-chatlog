import { PoiElement } from "./element";
import { drawButton } from "./drawButton";
import { PipMessage } from "./components/message";
import { PipContainer } from "./components/container";
import { PipStyle } from "./components/style";

export type Context = {
  pipContainerElement: HTMLDivElement;
  pipStyleElement: HTMLStyleElement;
  init: boolean;
};

export const Context = {
  new: (): Context => {
    return {
      pipContainerElement: PipContainer.create(),
      pipStyleElement: PipStyle.create(),
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
        const message = PipMessage.create(node);
        context.pipContainerElement.append(message);
        context.pipContainerElement.parentElement?.scrollBy(
          0,
          message.clientHeight + 8
        );
      });

    return context;
  },
} as const;
