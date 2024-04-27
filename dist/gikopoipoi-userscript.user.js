// ==UserScript==
// @name       gikopoipoi-userscript
// @namespace  npm/vite-plugin-monkey
// @version    0.0.0
// @author     iwasa-kosui
// @icon       https://gikopoipoi.net/characters/naito/front-standing.svg
// @match      https://gikopoipoi.net/*
// ==/UserScript==

(function () {
  'use strict';

  const Element = {
    app: () => document.querySelector("#vue-app")
  };
  const state = { initialized: false, isPipMode: false };
  const pip = document.createElement("div");
  const pipStyle = document.createElement("style");
  pipStyle.textContent = `
  body {
    background: #eee;
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
  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      const { target } = record;
      if (target instanceof HTMLElement && target.id === "chatLog") {
        if (!state.initialized) {
          state.initialized = true;
          const button = document.createElement("button");
          button.onclick = () => {
            window.documentPictureInPicture.requestWindow({
              copyStyleSheets: true,
              initialAspectRatio: 1
            }).then((pipWindow) => {
              state.isPipMode = true;
              pip.id = "pip-container";
              pipWindow.document.body.append(pip);
              pipWindow.document.head.append(pipStyle);
            });
          };
          button.textContent = "PIP";
          const chatLogLabel = document.querySelector("#chat-log-label");
          chatLogLabel.textContent = "";
          chatLogLabel.appendChild(button);
        }
        record.addedNodes.forEach((node) => {
          pip.append(node.cloneNode(true));
        });
      }
    });
  });
  observer.observe(Element.app(), {
    attributes: true,
    childList: true,
    subtree: true
  });

})();