let dispose: (() => void) | undefined;

function initializePointer() {
  dispose?.();
  const preference = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const dot = document.createElement("span");
  dot.className = "pointer-companion";
  dot.setAttribute("aria-hidden", "true");
  document.body.append(dot);
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let frame = 0;
  let x = 0;
  let y = 0;

  const hide = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    dot.hidden = true;
  };
  hide();
  preference.addEventListener("change", hide, options);
  window.addEventListener("blur", hide, options);
  document.documentElement.addEventListener("pointerleave", hide, options);
  document.addEventListener("pointerdown", hide, options);
  document.addEventListener("keydown", hide, options);
  document.addEventListener("pointermove", (event) => {
    if (!preference.matches || event.pointerType !== "mouse") return;
    x = event.clientX;
    y = event.clientY;
    const target = event.target instanceof Element ? event.target : null;
    dot.classList.toggle("is-link", Boolean(target?.closest("a, button, [role='button']")));
    if (frame) return;
    frame = requestAnimationFrame(() => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.hidden = false;
      frame = 0;
    });
  }, options);

  dispose = () => {
    controller.abort();
    cancelAnimationFrame(frame);
    dot.remove();
  };
}

initializePointer();
document.addEventListener("astro:page-load", initializePointer);
document.addEventListener("astro:before-swap", () => dispose?.());
