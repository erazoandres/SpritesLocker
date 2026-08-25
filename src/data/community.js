export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/B84RnJ3XBxC2oQRY3qeQhx';
export const ADMIN_CONTACT_LINK = 'https://wa.me/525582057435?text=' + encodeURIComponent('Hola iCharly, vengo de la página de Legión Fortnicadora. Quiero enviar un comentario o reporte.');

export const SELLERS = [
  {
    name: 'IVY / VICBUCKS',
    phone: '+52 1 220 543 3360',
    type: 'PAVOS Y REGALOS',
    link: 'https://wa.me/522205433360?text=' + encodeURIComponent('Hola, vengo de la página de Legión Fortnicadora y quiero información sobre Pavos o regalos de Fortnite.'),
    img: 'https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/promos/cosmeticos-via-regalo.jpg'
  },
  {
    name: 'VICENTE',
    phone: '+52 1 220 272 6191',
    type: 'CLUB DE FORTNITE',
    link: 'https://wa.me/522202726191?text=' + encodeURIComponent('Hola, vengo de la página de Legión Fortnicadora y quiero información sobre el Club de Fortnite.'),
    img: 'https://icharly-afton-sprite-locker.icharly-afton.chatgpt.site/promos/club-fortnite.jpg'
  }
];

export const GIFT_ACCOUNTS = Array.from({ length: 10 }, (_, i) => i + 10).flatMap(num => [
  `VICBUCKS${num}`,
  `IVYBUCKS${num}`
]);

export const PRICING_LIST = [
  { price: '$8 MXN', label: 'por cada 100 Pavos' },
  { price: '$120 MXN', label: 'skin de 1,500 Pavos' },
  { price: '$40 MXN', label: 'gesto de 500 Pavos' },
  { price: '$110 MXN', label: 'Club Fortnite · 1 mes' },
  { price: '$250 MXN', label: 'Club Fortnite · 3 meses' },
  { price: '$450 MXN', label: 'Club Fortnite · 6 meses' }
];

export const COMMUNITY_RULES = [
  'Está prohibido publicar contenido para adultos (+18).',
  'No se permiten insultos, agresiones verbales ni acoso a las mujeres del grupo.',
  'No se permiten mensajes racistas, xenófobos, repetitivos ni spam de stickers que moleste a los demás.',
  'No se pueden promocionar ventas de personas externas sin consentimiento de los administradores.',
  'Incumplir estas reglas puede causar la expulsión del grupo.'
];
