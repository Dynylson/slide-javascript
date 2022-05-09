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
    event.preventDefault();
    dist.startX = event.clientX;
    wrapperEl.addEventListener("mousemove", onMove);
  }

  function onMove(event) {
    const finalPosition = updatePosition(event.clientX);
    moveSlide(finalPosition);
  }

  function onEnd(event) {
    wrapperEl.removeEventListener("mousemove", onMove);
    dist.finalPosition = dist.movePosition;
  }

  function addSlideEvents() {
    wrapperEl.addEventListener("mousedown", onStart);
    wrapperEl.addEventListener("mouseup", onEnd);
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
