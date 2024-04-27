type PipContainer = HTMLDivElement & {
  readonly id: "userscript-pip-container";
};
export const PipContainer = {
  create: (): PipContainer => {
    const container = document.createElement("div");
    container.id = "userscript-pip-container";
    return container as PipContainer;
  },
} as const;
