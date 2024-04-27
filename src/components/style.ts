type PipStyle = HTMLStyleElement;
export const PipStyle = {
  create: (): PipStyle => {
    const pipStyle = document.createElement("style");
    pipStyle.textContent = `
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
    return pipStyle;
  },
} as const;
