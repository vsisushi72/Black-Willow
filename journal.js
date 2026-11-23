/* journal.js — escala cada pantalla (móvil 402px / escritorio 1440px) al ancho real del navegador */
(() => {
  const screens = document.querySelectorAll('.screen');
  if (!screens.length) return;

  let pending = false;

  const fit = () => {
    pending = false;
    const width = window.innerWidth;
    screens.forEach((screen) => {
      const design = Number(screen.dataset.design) || 402;
      screen.style.zoom = width / design;
    });
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
