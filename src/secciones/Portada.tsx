import {useEffect, useRef} from 'react';
import {ArrowUpRight, Activity, HeartPulse, Scissors, ScanLine} from 'lucide-react';
import {services as especialidades} from '../data/services';
import {desplazarAEspecialidad} from '../utilidades/navegacionEspecialidades';
import './Portada.css';

const nombreEmpresa = 'ONCOGASTRO';
const iconosEspecialidades = [Activity, HeartPulse, Scissors, ScanLine];

export default function Portada() {
  const referencia = useRef<HTMLElement>(null);

  useEffect(() => {
    const portada = referencia.current!;
    const cabecera = document.querySelector('header');
    let fotograma = 0;
    const preferencia = window.matchMedia('(prefers-reduced-motion: reduce)');
    function actualizarDesplazamiento() {
      fotograma = 0;
      const alturaCabecera = cabecera?.getBoundingClientRect().height ?? 0;
      portada.style.setProperty('--cabecera-portada', `${alturaCabecera}px`);
      const posicion = portada.getBoundingClientRect();
      const avance = preferencia.matches ? 0 : Math.min(1,Math.max(0,(alturaCabecera - posicion.top) / posicion.height));
      portada.style.setProperty('--avance-portada', String(avance));
    }
    function solicitarActualizacion() {
      if (!fotograma) fotograma = requestAnimationFrame(actualizarDesplazamiento);
    }
    const observador = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        portada.classList.add('portada-lista');
        observador.disconnect();
      }
    }, {threshold:0.1});
    observador.observe(portada);
    const observadorTamano = new ResizeObserver(solicitarActualizacion);
    observadorTamano.observe(portada);
    if (cabecera) observadorTamano.observe(cabecera);
    window.addEventListener('scroll', solicitarActualizacion, {passive:true});
    preferencia.addEventListener('change', solicitarActualizacion);
    actualizarDesplazamiento();
    return () => {
      cancelAnimationFrame(fotograma);
      observador.disconnect();
      observadorTamano.disconnect();
      window.removeEventListener('scroll', solicitarActualizacion);
      preferencia.removeEventListener('change', solicitarActualizacion);
    };
  }, []);

  return (
    <section ref={referencia} id="inicio" className="portada-cinematica" aria-labelledby="titulo-portada">
      <div className="portada-fotografia" aria-hidden="true"><img src="/images/hero-medico.png" alt="" fetchPriority="high"/></div>
      <div className="portada-velo" aria-hidden="true"/>
      <div className="portada-identidad">
        <p className="portada-sobretitulo">ATENCIÓN ESPECIALIZADA, CERCA DE TI</p>
        <h1 id="titulo-portada" className="portada-nombre" aria-label="ONCOGASTRO">
          {Array.from(nombreEmpresa).map((letra, indice) => <span className="portada-letra-marco" key={indice} aria-hidden="true"><span className="portada-letra" style={{animationDelay:`${160 + indice * 75}ms`}}>{letra}</span></span>)}
        </h1>
        <div className="portada-firma"><span/>ESPECIALISTAS EN CUIDAR DE TI<span/></div>
      </div>
      <div className="portada-contenido">
        <div className="portada-mensaje">
          <p className="portada-numero">CERCANÍA QUE SE SIENTE. CUIDADO QUE ACOMPAÑA.</p>
          <h2>Atención especializada<br/>para <em>tu salud.</em></h2>
          <p className="portada-descripcion">Gastroenterología, oncología y cirugía. Especialidades que se complementan para acompañarte con una atención profesional, cercana y personalizada.</p>
          <div className="portada-acciones"><a className="portada-cita" href="#contacto">Agendar una cita <ArrowUpRight size={18}/></a></div>
        </div>
        <div className="portada-servicios" role="group" aria-labelledby="titulo-servicios-portada">
          <div className="portada-servicios-titulo"><p id="titulo-servicios-portada">NUESTRAS ESPECIALIDADES</p><span>01 — 04</span></div>
          {especialidades.map((especialidad, indice) => {
            const Icono = iconosEspecialidades[indice % iconosEspecialidades.length];
            return <a key={especialidad.name} className="portada-servicio" href="#especialidades" style={{animationDelay:`${1000 + indice * 100}ms`}} onClick={evento => {evento.preventDefault(); desplazarAEspecialidad(indice, especialidades.length);}}><Icono size={22} strokeWidth={1.3}/><span>{especialidad.name}</span><ArrowUpRight size={18}/></a>;
          })}
          <p className="portada-servicios-nota">Conoce cómo podemos acompañarte.</p>
        </div>
      </div>
    </section>
  );
}
