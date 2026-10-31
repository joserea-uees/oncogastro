import {useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import Logotipo from './Logotipo';
export const enlaces=[['Inicio','inicio'],['Nosotros','nosotros'],['Especialidades','especialidades'],['Equipo médico','equipo'],['Contacto','contacto']];
export default function BarraNavegacion(){const [abierto,establecerAbierto]=useState(false);return <header><div className="nav-shell"><Logotipo/><button className="menu-button" aria-label={abierto?'Cerrar menú':'Abrir menú'} aria-expanded={abierto} aria-controls="main-nav" onClick={()=>establecerAbierto(!abierto)}>{abierto?<X/>:<Menu/>}</button><nav id="main-nav" className={abierto?'open':''}>{enlaces.map(([label,id])=><a key={id} href={'#'+id} onClick={()=>establecerAbierto(false)}>{label}</a>)}<a className="button small" href="#contacto" onClick={()=>establecerAbierto(false)}>Agendar una cita <ArrowUpRight size={15}/></a></nav></div></header>}
