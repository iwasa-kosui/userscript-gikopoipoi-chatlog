import { PipButton } from "./components/button";
import { Context } from "./context";
import { PoiElement } from "./element";

const openPipWindow = async (context: Context) => {
  const pipWindow = await (
    window as unknown as any
  ).documentPictureInPicture.requestWindow({
    copyStyleSheets: true,
    initialAspectRatio: 1,
  });

  pipWindow.document.body.append(context.pipContainerElement);
  pipWindow.document.head.append(context.pipStyleElement);
};

export const drawButton = (context: Context): Context => {
  const button = PipButton.create();
  button.onclick = () => openPipWindow(context);
  PoiElement.chatLogContainer().insertBefore(
    button,
    PoiElement.ChatLog.getElement()
  );
  PoiElement.chatLogLabel().remove();
  return {
    ...context,
    init: true,
  };
};
