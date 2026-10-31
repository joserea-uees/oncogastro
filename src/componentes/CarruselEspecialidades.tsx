import {useEffect, useRef, useState} from 'react';
import {Activity, ArrowDown, ArrowUpRight, HeartPulse, ScanLine, Scissors} from 'lucide-react';
import {services as especialidades} from '../data/services';
import './CarruselEspecialidades.css';

const iconos = [Activity, HeartPulse, Scissors, ScanLine];
const limitar = (valor:number, minimo:number, maximo:number) => Math.min(maximo, Math.max(minimo, valor));

export default function CarruselEspecialidades({alSeleccionar}:{alSeleccionar:(indice:number)=>void}) {
  const [progreso, establecerProgreso] = useState(0);
  const referencia = useRef<HTMLDivElement>(null);
  const pantalla = useRef<HTMLDivElement>(null);
  const total = especialidades.length;
  // Un tramo de lectura quieta en cada extremo permite ver la primera y la última tarjeta completas.
  const recorrido = limitar((progreso - 0.08) / 0.84, 0, 1) * (total - 1);
  const indiceActivo = Math.round(recorrido);

  useEffect(() => {
    const contenedor = referencia.current!;
    const cabecera = document.querySelector('header');
    let fotograma = 0;
    function actualizarProgreso() {
      fotograma = 0;
      const alturaCabecera = cabecera?.getBoundingClientRect().height ?? 0;
      contenedor.style.setProperty('--altura-cabecera', `${alturaCabecera}px`);
      const alturaPantalla = pantalla.current?.offsetHeight ?? window.innerHeight;
      const distancia = contenedor.offsetHeight - alturaPantalla;
      establecerProgreso(limitar((alturaCabecera - contenedor.getBoundingClientRect().top) / Math.max(1, distancia), 0, 1));
    }
    function solicitarActualizacion() {
      if (!fotograma) fotograma = window.requestAnimationFrame(actualizarProgreso);
    }
    const observador = new ResizeObserver(solicitarActualizacion);
    observador.observe(contenedor);
    if (cabecera) observador.observe(cabecera);
    window.addEventListener('scroll', solicitarActualizacion, {passive:true});
    window.addEventListener('resize', solicitarActualizacion);
    actualizarProgreso();
    return () => {
      window.cancelAnimationFrame(fotograma);
      observador.disconnect();
      window.removeEventListener('scroll', solicitarActualizacion);
      window.removeEventListener('resize', solicitarActualizacion);
    };
  }, []);

  function irAEspecialidad(indice:number) {
    const contenedor = referencia.current;
    const panel = pantalla.current;
    if (!contenedor || !panel) return;
    const alturaCabecera = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const inicio = window.scrollY + contenedor.getBoundingClientRect().top - alturaCabecera;
    const distancia = contenedor.offsetHeight - panel.offsetHeight;
    const destino = 0.08 + limitar(indice, 0, total - 1) / (total - 1) * 0.84;
    window.scrollTo({top:inicio + destino * distancia, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }

  return (
    <div ref={referencia} className="recorrido-especialidades">
      <div ref={pantalla} className="carrusel-especialidades" role="region" aria-roledescription="carrusel" aria-label="Especialidades médicas, avanza desplazándote por la página"
        onKeyDown={evento => {
          if (evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') {
            evento.preventDefault();
            irAEspecialidad(indiceActivo + (evento.key === 'ArrowRight' ? 1 : -1));
          }
        }}>
        <div className="carrusel-cabecera"><span>ONCOGASTRO / NUESTRAS ESPECIALIDADES</span><span>ATENCIÓN EXPERTA. CUIDADO INTEGRAL.</span></div>
        <div className="carrusel-escenario">
          {especialidades.map((especialidad, indice) => {
            const posicion = indice - recorrido;
            const distancia = Math.abs(posicion);
            const activa = indice === indiceActivo;
            const Icono = iconos[indice % iconos.length];
            return (
              <article className={`carrusel-tarjeta${activa ? ' activa' : ''}`} key={especialidad.name}
                style={{transform:`translateX(${posicion * 88}%) translateZ(${-distancia * 150}px) rotateY(${limitar(-posicion * 24,-40,40)}deg)`,zIndex:10 - Math.round(distancia * 2),opacity:limitar(2.6 - distancia,0,1),filter:`brightness(${Math.max(0.4,1 - distancia * 0.3)})`,visibility:distancia > 2.6 ? 'hidden' : 'visible'}}
                role="group" aria-roledescription="diapositiva" aria-label={`${indice + 1} de ${total}: ${especialidad.name}`}>
                <img src={especialidad.image} alt="" loading="lazy" draggable={false}/>
                <div className="carrusel-sombra" aria-hidden="true"/>
                <div className="carrusel-tarjeta-superior" aria-hidden="true"><Icono size={27} strokeWidth={1.3}/><span>0{indice + 1}</span></div>
                <div className="carrusel-texto" aria-hidden={!activa}>
                  <span className="carrusel-etiqueta">ATENCIÓN ESPECIALIZADA</span>
                  <h3>{especialidad.name}</h3>
                  <span className="carrusel-linea"/>
                  <p>{especialidad.description}</p>
                  <button className="carrusel-conocer" tabIndex={activa ? 0 : -1} onClick={() => alSeleccionar(indice)}>Conocer más <ArrowUpRight size={18}/></button>
                </div>
                {!activa && <button className="carrusel-seleccionar" aria-label={`Ver ${especialidad.name}`} onClick={() => irAEspecialidad(indice)}/>}
              </article>
            );
          })}
        </div>
        <div className="carrusel-pie">
          <span className="carrusel-contador" aria-live="polite" aria-atomic="true">0{indiceActivo + 1} <span>/ 0{total}</span><span className="sr-only"> · {especialidades[indiceActivo].name}</span></span>
          <div className="carrusel-indicadores" aria-label="Seleccionar especialidad">{especialidades.map((especialidad, indice) => <button key={especialidad.name} className={indice === indiceActivo ? 'seleccionado' : ''} aria-label={`Mostrar ${especialidad.name}`} aria-current={indice === indiceActivo ? 'true' : undefined} onClick={() => irAEspecialidad(indice)}/>)}</div>
          <span className="carrusel-instruccion">{progreso > 0.92 ? 'CONTINÚA PARA CONOCER AL EQUIPO' : 'DESLIZA PARA EXPLORAR'}<ArrowDown size={15}/></span>
        </div>
        <div className="carrusel-progreso" style={{transform:`scaleX(${progreso})`}} aria-hidden="true"/>
      </div>
    </div>
  );
}
