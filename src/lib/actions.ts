export function external(node: HTMLAnchorElement) {
  node.rel = "noopener noreferrer";
  node.target = "_blank";

  return {
    destroy() {},
  };
}

export function profile(node: HTMLAnchorElement, address: string) {
  node.href = `https://rainbow.me/${address}`;
  return {
    destroy() {},
  };
}
