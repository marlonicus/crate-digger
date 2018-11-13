const SoundManager = (() => {
  if (typeof window === "undefined") return false;

  const footsteps = new Audio("/static/sounds/footsteps.mp3");
  const swipe = new Audio("/static/sounds/swipe.mp3");
  const whoosh = new Audio("/static/sounds/whoosh.mp3");
  whoosh.volume = 0.4;

  return {
    whoosh: () => whoosh.play(),
    swipe: () => swipe.play(),
    footsteps: ({ stop } = {}) => (stop ? footsteps.pause() : footsteps.play())
  };
})();

export default SoundManager;