import {useEffect, useRef, useState} from 'react';
import {Menu, X, ArrowUpRight} from 'lucide-react';
import './BarraNavegacion.css';

export const enlaces = [['Inicio','inicio'],['Nosotros','nosotros'],['Especialidades','especialidades'],['Equipo médico','equipo'],['Contacto','contacto']];

export default function BarraNavegacion() {
  const [abierto, establecerAbierto] = useState(false);
  const [desplazado, establecerDesplazado] = useState(false);
  const referenciaPanel = useRef<HTMLDialogElement>(null);

  function cerrarMenu() { establecerAbierto(false); }

  useEffect(() => {
    let fotograma = 0;
    function actualizarFondo() {
      fotograma = 0;
      const portada = document.getElementById('inicio');
      establecerDesplazado((portada?.getBoundingClientRect().bottom ?? 0) <= 100);
    }
    function solicitarActualizacion() {
      if (!fotograma) fotograma = requestAnimationFrame(actualizarFondo);
    }
    window.addEventListener('scroll', solicitarActualizacion, {passive:true});
    window.addEventListener('resize', solicitarActualizacion);
    actualizarFondo();
    return () => {
      cancelAnimationFrame(fotograma);
      window.removeEventListener('scroll', solicitarActualizacion);
      window.removeEventListener('resize', solicitarActualizacion);
    };
  }, []);

  useEffect(() => {
    const panel = referenciaPanel.current!;
    if (!abierto) {
      if (panel.open) panel.close();
      return;
    }
    panel.showModal();
    const desbordamientoAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = desbordamientoAnterior; };
  }, [abierto]);

  return (
    <header className={`navegacion-flotante${desplazado ? ' navegacion-desplazada' : ''}`}>
      <div className="navegacion-controles">
        <a className="navegacion-simbolo" href="#inicio" aria-hidden={desplazado} tabIndex={desplazado ? -1 : 0} aria-label="ONCOGASTRO, volver al inicio"><span className="logo-symbol" aria-hidden="true"><i/><i/><i/><i/></span></a>
        <div className="navegacion-derecha">
          <button className="navegacion-menu" aria-label="Abrir menú" aria-haspopup="dialog" aria-expanded={abierto} aria-controls="panel-navegacion" onClick={() => establecerAbierto(true)}><Menu size={25}/></button>
        </div>
      </div>
      <dialog ref={referenciaPanel} id="panel-navegacion" className="panel-navegacion" aria-labelledby="titulo-navegacion"
        onCancel={evento => {evento.preventDefault(); cerrarMenu();}}
        onClick={evento => {if (evento.target === referenciaPanel.current) cerrarMenu();}}>
        <div className="panel-navegacion-interior">
          <div className="panel-navegacion-cabecera"><span id="titulo-navegacion">EXPLORA ONCOGASTRO</span><button autoFocus onClick={cerrarMenu} aria-label="Cerrar menú"><X size={23}/></button></div>
          <nav aria-label="Navegación principal">
            {enlaces.map(([etiqueta, identificador], indice) => <a key={identificador} href={`#${identificador}`} onClick={cerrarMenu} style={{animationDelay:`${indice * 55}ms`}}><span className="panel-numero">0{indice + 1}</span><span>{etiqueta}</span><ArrowUpRight size={21}/></a>)}
          </nav>
          <div className="panel-navegacion-base"><p>Atención especializada,<br/><em>cerca de ti.</em></p><a className="button" href="#contacto" onClick={cerrarMenu}>Agendar una cita <ArrowUpRight size={18}/></a><span>GASTROENTEROLOGÍA · ONCOLOGÍA · CIRUGÍA</span></div>
        </div>
      </dialog>
    </header>
  );
}
