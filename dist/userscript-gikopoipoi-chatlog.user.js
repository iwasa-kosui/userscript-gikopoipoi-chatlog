// ==UserScript==
// @name       Gikopoipoi PiP on ChatLog
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     iwasa-kosui
// @icon       https://gikopoipoi.net/characters/naito/front-standing.svg
// @match      https://gikopoipoi.net/*
// ==/UserScript==

(function () {
  'use strict';

  const PageContainer = {
    getElement: () => document.querySelector("#page-container"),
    getLang: () => PageContainer.getElement().getAttribute("lang")
  };
  const ChatLog = {
    getElement: () => document.querySelector("#chatLog"),
    isChatLog: (node) => node instanceof HTMLElement && node.id === "chatLog"
  };
  const PoiElement = {
    PageContainer,
    ChatLog,
    vueApp: () => document.querySelector("#vue-app"),
    chatLogContainer: () => document.querySelector("#chat-log-container"),
    chatLogLabel: () => document.querySelector("#chat-log-label"),
    isMessage: (node) => node instanceof HTMLDivElement && node.className === "message"
  };
  const createButtonElement = () => {
    const button = document.createElement("button");
    button.id = "userscript-pip-button";
    button.setAttribute(
      "style",
      `
      display: block;
      margin: 4px 0 4px auto;
      background: #efefef;
      padding: 2px;
      border-radius: 8px;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      `
    );
    const buttonText = PoiElement.PageContainer.getLang() === "ja" ? "別窓" : "PiP";
    button.innerHTML = `
      <img src="data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9ImN1cnJlbnRDb2xvciIgIHN0cm9rZS13aWR0aD0iMiIgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgIHN0cm9rZS1saW5lam9pbj0icm91bmQiICBjbGFzcz0iaWNvbiBpY29uLXRhYmxlciBpY29ucy10YWJsZXItb3V0bGluZSBpY29uLXRhYmxlci1waWN0dXJlLWluLXBpY3R1cmUiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMSAxOWgtNmEyIDIgMCAwIDEgLTIgLTJ2LTEwYTIgMiAwIDAgMSAyIC0yaDE0YTIgMiAwIDAgMSAyIDJ2NCIgLz48cGF0aCBkPSJNMTQgMTRtMCAxYTEgMSAwIDAgMSAxIC0xaDVhMSAxIDAgMCAxIDEgMXYzYTEgMSAwIDAgMSAtMSAxaC01YTEgMSAwIDAgMSAtMSAtMXoiIC8+PC9zdmc+" width="16" height="16">${buttonText}
    `;
    return button;
  };
  const openPipWindow = async (context2) => {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      copyStyleSheets: true,
      initialAspectRatio: 1
    });
    pipWindow.document.body.append(context2.pipContainerElement);
    pipWindow.document.head.append(context2.pipStyleElement);
  };
  const drawButton = (context2) => {
    const button = createButtonElement();
    button.onclick = () => openPipWindow(context2);
    PoiElement.chatLogContainer().insertBefore(
      button,
      PoiElement.ChatLog.getElement()
    );
    PoiElement.chatLogLabel().remove();
    return {
      ...context2,
      init: true
    };
  };
  const style = `
body {
  background: #eee;
  font-size: 14px;
}
.message {
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  background: #fff;
}
.message-body {
  display: block;
}
.message-timestamp {
  display: none;
}
.message-author {
  font-size: 12px;
  color: #888;
}
`;
  const Context = {
    new: () => {
      const pip = document.createElement("div");
      pip.id = "userscript-pip-container";
      const pipStyle = document.createElement("style");
      pipStyle.textContent = style;
      return {
        pipContainerElement: pip,
        pipStyleElement: pipStyle,
        init: false
      };
    },
    update: (context2, records) => {
      if (!context2.init && PoiElement.chatLogContainer()) {
        return drawButton(context2);
      }
      const chatLogRecords = records.filter(
        (r) => PoiElement.ChatLog.isChatLog(r.target)
      );
      if (chatLogRecords.length === 0)
        return context2;
      chatLogRecords.flatMap((r) => Array.from(r.addedNodes)).filter(PoiElement.isMessage).forEach((node) => {
        var _a, _b, _c;
        const cloned = node.cloneNode(true);
        (_b = (_a = cloned.querySelector(".message-body")) == null ? void 0 : _a.previousSibling) == null ? void 0 : _b.remove();
        const userId = cloned.getAttribute("data-user-id");
        const userIdSpan = document.createElement("span");
        userIdSpan.className = "message-author";
        userIdSpan.innerHTML = `(${userId.slice(0, 6)})`;
        cloned.insertBefore(userIdSpan, cloned.querySelector(".message-body"));
        context2.pipContainerElement.append(cloned);
        (_c = context2.pipContainerElement.parentElement) == null ? void 0 : _c.scrollBy(
          0,
          cloned.clientHeight + 8
        );
      });
      return context2;
    }
  };
  let context = Context.new();
  const observer = new MutationObserver((records) => {
    context = Context.update(context, records);
  });
  observer.observe(PoiElement.vueApp(), {
    attributes: true,
    childList: true,
    subtree: true
  });

})();