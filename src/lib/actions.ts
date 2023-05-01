export function external(node: HTMLAnchorElement) {
  node.rel = "noopener noreferrer";
  node.target = "_blank";

  return {
    destroy() {},
  };
}
