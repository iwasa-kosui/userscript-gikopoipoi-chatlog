import { Context } from "./context";
import { PoiElement } from "./element";

let context = Context.new();

const observer = new MutationObserver((records) => {
  context = Context.update(context, records);
});

observer.observe(PoiElement.vueApp(), {
  attributes: true,
  childList: true,
  subtree: true,
});
