import CarruselEspecialidades from '../componentes/CarruselEspecialidades';

export default function Especialidades({alSeleccionar}:{alSeleccionar:(indice:number)=>void}) {
  return <section id="especialidades" className="specialties"><div className="section reveal introduccion-especialidades"><div className="section-heading"><div><p className="eyebrow">02 / NUESTRAS ESPECIALIDADES</p><h2>Atención experta.<br/><em>Cuidado integral.</em></h2></div><p>Desliza para descubrir las especialidades<br className="desktop-break"/> que nos permiten acompañarte.</p></div></div><CarruselEspecialidades alSeleccionar={alSeleccionar}/><div className="nota-especialidades"><p className="illustration-note">Fotografías de referencia. No representan al equipo ni las instalaciones de ONCOGASTRO.</p></div></section>;
}
