import {useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import Logo from './Logo';
export const links=[['Inicio','inicio'],['Nosotros','nosotros'],['Especialidades','especialidades'],['Equipo médico','equipo'],['Contacto','contacto']];
export default function Navbar(){const [open,setOpen]=useState(false);return <header><div className="nav-shell"><Logo/><button className="menu-button" aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-nav" className={open?'open':''}>{links.map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}<a className="button small" href="#contacto" onClick={()=>setOpen(false)}>Agendar una cita <ArrowUpRight size={15}/></a></nav></div></header>}
