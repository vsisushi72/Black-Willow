/* journal.js — escala el marco de diseño (402px) al ancho real del teléfono */
(() => {
  const BASE_WIDTH = 402;
  const MOBILE_MAX = 768;
  const screen = document.getElementById('screen');

  if (!screen) return;

  let pending = false;

  const fit = () => {
    pending = false;
    const width = window.innerWidth;
    screen.style.zoom = width <= MOBILE_MAX ? width / BASE_WIDTH : 1;
  };

  /* requestAnimationFrame evita recalcular varias veces por cuadro durante el resize */
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(fit);
  };

  fit();
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });
})();

/* Videos como GIF: al pulsar play se carga el GIF encima de la imagen fija del marco */
document.querySelectorAll('.play').forEach((btn) => {
  btn.addEventListener('click', () => {
    const gif = btn.parentElement.querySelector('.gif');
    if (!gif) return;
    gif.src = gif.dataset.gif;
    gif.hidden = false;
    btn.hidden = true;
  });
});
