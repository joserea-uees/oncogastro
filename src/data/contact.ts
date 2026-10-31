// Completar con datos oficiales antes de habilitar los canales de atención.
export const contact = { whatsapp: '', phone: '', email: '', address: '', hours: '', social: [] as {name:string;url:string}[] };
export const initialMessage = 'Hola, quisiera obtener información sobre los servicios médicos de ONCOGASTRO y agendar una cita.';
export const whatsappUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(initialMessage)}` : '';
