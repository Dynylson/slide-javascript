export const Slide = (slide, wrapper) => {
  const slideEl = document.querySelector(slide);
  const wrapperEl = document.querySelector(wrapper);

  function onStart(event) {
    event.preventDefault();
    wrapperEl.addEventListener("mousemove", onMove);
  }

  function onMove(event) {
    console.log("moveu");
  }

  function onEnd(event) {
    wrapperEl.removeEventListener("mousemove", onMove);
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
