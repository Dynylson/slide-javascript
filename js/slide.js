export const Slide = (slide, wrapper) => {
  const slideEl = document.querySelector(slide);
  const wrapperEl = document.querySelector(wrapper);
  const dist = { finalPosition: 0, startX: 0, movement: 0 };

  function moveSlide(distX) {
    dist.movePosition = distX;
    slideEl.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  function updatePosition(clientX) {
    dist.movement = (dist.startX - clientX) * 1.6;
    return dist.finalPosition - dist.movement;
  }

  function onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    wrapperEl.addEventListener(movetype, onMove);
  }

  function onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = updatePosition(pointerPosition);
    moveSlide(finalPosition);
  }

  function onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    wrapperEl.removeEventListener(movetype, onMove);
    dist.finalPosition = dist.movePosition;
  }

  function addSlideEvents() {
    wrapperEl.addEventListener("mousedown", onStart);
    wrapperEl.addEventListener("touchstart", onStart);
    wrapperEl.addEventListener("mouseup", onEnd);
    wrapperEl.addEventListener("touchend", onEnd);
  }

  function init() {
    addSlideEvents();
  }

  return {
    slideEl,
    wrapperEl,
    onStart,
    addSlideEvents,
    init,
  };
};
