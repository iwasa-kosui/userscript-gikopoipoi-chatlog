import { PoiElement } from "../element";

export type PipButton = HTMLButtonElement & {
  readonly id: "userscript-pip-button";
};
export const PipButton = {
  create: (): PipButton => {
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
    const buttonText =
      PoiElement.PageContainer.getLang() === "ja" ? "別窓" : "PiP";
    button.innerHTML = `
        <img src="data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjI0IiAgaGVpZ2h0PSIyNCIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9ImN1cnJlbnRDb2xvciIgIHN0cm9rZS13aWR0aD0iMiIgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgIHN0cm9rZS1saW5lam9pbj0icm91bmQiICBjbGFzcz0iaWNvbiBpY29uLXRhYmxlciBpY29ucy10YWJsZXItb3V0bGluZSBpY29uLXRhYmxlci1waWN0dXJlLWluLXBpY3R1cmUiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMSAxOWgtNmEyIDIgMCAwIDEgLTIgLTJ2LTEwYTIgMiAwIDAgMSAyIC0yaDE0YTIgMiAwIDAgMSAyIDJ2NCIgLz48cGF0aCBkPSJNMTQgMTRtMCAxYTEgMSAwIDAgMSAxIC0xaDVhMSAxIDAgMCAxIDEgMXYzYTEgMSAwIDAgMSAtMSAxaC01YTEgMSAwIDAgMSAtMSAtMXoiIC8+PC9zdmc+" width="16" height="16">${buttonText}
      `;
    return button as PipButton;
  },
} as const;
