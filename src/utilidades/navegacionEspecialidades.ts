export function desplazarAEspecialidad(indice:number, total:number) {
  const recorrido = document.getElementById('recorrido-especialidades');
  const panel = recorrido?.querySelector<HTMLElement>('.carrusel-especialidades');
  if (!recorrido || !panel) return;
  const alturaCabecera = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
  const inicio = window.scrollY + recorrido.getBoundingClientRect().top - alturaCabecera;
  const distancia = recorrido.offsetHeight - panel.offsetHeight;
  const seleccion = Math.min(total - 1, Math.max(0, indice));
  const destino = 0.08 + seleccion / Math.max(1, total - 1) * 0.84;
  window.scrollTo({top:inicio + destino * distancia, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
