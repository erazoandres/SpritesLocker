// Generation 2 Override Spirits (19 6-variant families with Truco o trato + 1 5-variant family + 4 Fort Drop 6-variant families + Mega Man + Sonic Ciber = 145 items)

const ALL_VARIANTS_ORDER = ['Base', 'Oro', 'Maestro de Trucos', 'Hacker de botín', 'Cazarrecompensas'];
const TRICKTREAT_VARIANTS_ORDER = ['Base', 'Oro', 'Maestro de Trucos', 'Hacker de botín', 'Cazarrecompensas', 'Truco o trato'];
const FORT_DROP_VARIANTS_ORDER = ['Base', 'Oro', 'Matriz Verde', 'Red Azul', 'Galaxia Morada', 'Fuego Naranja'];

export const GEN2_FAMILIES = [
  {
    slug: 'arbustin',
    webBase: 'bush',
    name: 'Arbustín',
    en: 'Bush',
    rarity: 'Raro',
    ability: 'Te camufla como arbusto después de un tiempo; al máximo nivel también se activa al eliminar.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'corona',
    webBase: 'crown',
    name: 'Corona',
    en: 'Crown',
    rarity: 'Mítico',
    ability: 'Solo sube ganando partidas; las victorias con corona aceleran su progreso y desbloquean variantes.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'mapache',
    webBase: 'mapache',
    name: 'Mapache',
    en: 'Raccoon',
    rarity: 'Raro',
    ability: 'Furtivo y ágil; recolecta botín adicional en contenedores y mejora la velocidad en sigilo.',
    order: FORT_DROP_VARIANTS_ORDER
  },
  {
    slug: 'ciervo',
    webBase: 'ciervo',
    name: 'Ciervo',
    en: 'Deer',
    rarity: 'Épico',
    ability: 'Otorga un gran impulso de zancada en terreno abierto y reduce significativamente el daño de caída.',
    order: FORT_DROP_VARIANTS_ORDER
  },
  {
    slug: 'monstruo',
    webBase: 'monstruo',
    name: 'Monstruo',
    en: 'Teeth Monster',
    rarity: 'Legendario',
    ability: 'Desata voracidad feroz aumentando el daño en combate a corta distancia y regenerando vida al eliminar.',
    order: FORT_DROP_VARIANTS_ORDER
  },
  {
    slug: 'calabaza',
    webBase: 'calabaza',
    name: 'Calabaza',
    en: 'Pumpkin',
    rarity: 'Raro',
    ability: 'Despliega escudos espectrales de calabaza que absorben los primeros impactos de cada enfrentamiento.',
    order: FORT_DROP_VARIANTS_ORDER
  },
  {
    slug: 'aventura',
    webBase: 'adventure',
    name: 'Bandido',
    en: 'Adventure',
    rarity: 'Raro',
    ability: 'Mejora un objeto aleatorio de tu inventario cada vez que sube de nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: '8-bits',
    webBase: '8-bit',
    name: '8-Bit',
    en: '8-Bit',
    rarity: 'Raro',
    ability: 'Incluye una escopeta de 8 bits en el primer cofre y un multiplicador de puntuación para ella.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'jazz-jackrabbit',
    webBase: 'jackrabbit',
    name: 'Jazz Jackrabbit',
    en: 'Jackrabbit',
    rarity: 'Legendario',
    ability: 'Permite realizar un salto adicional en el aire; el enfriamiento disminuye al subir de nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'jonesy',
    webBase: 'jonesy',
    name: 'Jonesy',
    en: 'Jonesy',
    rarity: 'Raro',
    ability: 'Recupera vida o escudo tras recibir daño; la cantidad aumenta con cada nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'explorador-tormenta',
    webBase: 'storm-scout',
    name: 'Explorador de Tormenta',
    en: 'Storm Scout',
    rarity: 'Raro',
    ability: 'Activa Overdrive al recibir daño de tormenta y, al máximo nivel, revela los próximos círculos.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'klombo',
    webBase: 'klombo',
    name: 'Klombo',
    en: 'Klombo',
    rarity: 'Mítico',
    ability: 'Entrega objetos aleatorios por nivel y solo progresa consumiendo objetos; mejora su calidad al subir.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'tails',
    webBase: 'tails',
    name: 'Tails',
    en: 'Tails',
    rarity: 'Épico',
    ability: 'Permite planear con ayuda de Tails; la velocidad aumenta con cada nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'sonic',
    webBase: 'sonic',
    name: 'Sonic',
    en: 'Sonic',
    rarity: 'Épico',
    ability: 'Aumenta la velocidad de sprint con cada nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'sombra',
    webBase: 'shadow',
    name: 'Shadow',
    en: 'Shadow',
    rarity: 'Épico',
    ability: 'Recarga automáticamente las armas guardadas; la recarga mejora con cada nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'killswitch',
    webBase: 'killswitch',
    name: 'Killswitch',
    en: 'Killswitch',
    rarity: 'Épico',
    ability: 'Mejora la precisión al apuntar mientras saltas o caes; aumenta con cada nivel.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'rayos-x',
    webBase: 'x-ray',
    name: 'Rayos X',
    en: 'X-Ray',
    rarity: 'Legendario',
    ability: 'Revela la posición de cofres, contenedores y enemigos cercanos a través de muros y estructuras.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'onigiri',
    webBase: 'onigiri',
    name: 'Onigiri',
    en: 'Onigiri',
    rarity: 'Raro',
    ability: 'Regenera salud continuamente mientras estés fuera del alcance del combate activo.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'protector',
    webBase: 'overshield',
    name: 'Protector',
    en: 'Overshield',
    rarity: 'Raro',
    ability: 'Otorga un escudo de sobreprotección extra que se regenera automáticamente tras un periodo de calma.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'crash-bandicoot',
    webBase: 'crash-bandicoot',
    name: 'Crash Bandicoot',
    en: 'Crash Bandicoot',
    rarity: 'Épico',
    ability: 'Desata un ataque giratorio devastador que rompe construcciones cercanas e impulsa la velocidad.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'blinky',
    webBase: 'blinky',
    name: 'Blinky',
    en: 'Blinky',
    rarity: 'Épico',
    ability: 'Permite un impulso de teletransporte instantáneo a corta distancia para maniobras evasivas.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'morgana',
    webBase: 'morgana',
    name: 'Morgana',
    en: 'Morgana',
    rarity: 'Épico',
    ability: 'Dispara una ráfaga de sombras que ralentiza a los rivales e interrumpe sus ataques.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'cumpleanos',
    webBase: 'birthday',
    name: 'Cumpleaños',
    en: 'Birthday',
    rarity: 'Raro',
    ability: 'Genera regalos con botín especial y pastel de cumpleaños revitalizante durante la partida.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'estanque',
    webBase: 'pond',
    name: 'Estanque',
    en: 'Pond',
    rarity: 'Épico',
    ability: 'Incrementa enormemente la movilidad en el agua y regenera salud de manera sostenida al nadar.',
    order: TRICKTREAT_VARIANTS_ORDER
  },
  {
    slug: 'mega-man',
    webBase: 'mega-man',
    name: 'Mega Man',
    en: 'Mega Man',
    rarity: 'Raro',
    ability: 'Despliega un Mega Blaster con disparos de energía concentrada de alto impacto.',
    order: ['Base']
  }
];

const getVariantSlug = (variant) => {
  switch (variant) {
    case 'Base': return 'base';
    case 'Oro': return 'oro';
    case 'Maestro de Trucos': return 'maestro-trucos';
    case 'Hacker de botín': return 'hacker-botin';
    case 'Cazarrecompensas': return 'cazarrecompensas';
    case 'Truco o trato': return 'truco-trato';
    case 'Matriz Verde': return 'matriz-verde';
    case 'Red Azul': return 'red-azul';
    case 'Galaxia Morada': return 'galaxia-morada';
    case 'Fuego Naranja': return 'fuego-naranja';
    default: return 'base';
  }
};

const getImageFile = (fam, variant) => {
  if (fam.customImage) return fam.customImage;
  if (!fam.webBase) return `/sprites/variations/${fam.slug}.png`;

  switch (variant) {
    case 'Base':
      return `/sprites/espiritus/${fam.webBase}.png`;
    case 'Oro':
      return `/sprites/espiritus/${fam.webBase}-gold.png`;
    case 'Maestro de Trucos':
      return `/sprites/espiritus/${fam.webBase}-cheatmaster.png`;
    case 'Hacker de botín':
      return `/sprites/espiritus/${fam.webBase}-loothacker.png`;
    case 'Cazarrecompensas':
      return `/sprites/espiritus/${fam.webBase}-bountyhunter.png`;
    case 'Truco o trato':
      return `/sprites/espiritus/${fam.webBase}-tricktreat.png`;
    case 'Matriz Verde':
      return `/sprites/espiritus/${fam.webBase}-greenmatrix.png`;
    case 'Red Azul':
      return `/sprites/espiritus/${fam.webBase}-bluegrid.png`;
    case 'Galaxia Morada':
      return `/sprites/espiritus/${fam.webBase}-purplegalaxy.png`;
    case 'Fuego Naranja':
      return `/sprites/espiritus/${fam.webBase}-orangefire.png`;
    default:
      return `/sprites/espiritus/${fam.webBase}.png`;
  }
};

export const GEN2_SPIRITS = GEN2_FAMILIES.flatMap(fam =>
  fam.order.map(variant => ({
    id: `g2-${fam.slug}-${getVariantSlug(variant)}`,
    family: fam.name,
    familyEn: fam.en,
    variant: fam.order.length === 1 ? 'Único' : variant,
    rarity: variant === 'Base' || fam.order.length === 1 ? fam.rarity : 'Especial',
    summonCost: 0,
    image: getImageFile(fam, variant),
    generation: 2,
    ability: fam.ability
  }))
);
