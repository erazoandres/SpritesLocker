// Generation 2 Override Spirits (12 standard 3-variant families + 5 single-type spirits = 41 items)
export const GEN2_FAMILIES = [
  {
    slug: 'arbustin',
    name: 'Arbustín',
    en: 'Bush',
    rarity: 'Raro',
    ability: 'Te camufla como arbusto después de un tiempo; al máximo nivel también se activa al eliminar.',
    baseFile: 'T_Icon_BR_Creature_Sprite_BushRanger_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_BushRanger_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_BushRanger_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'corona',
    name: 'Corona',
    en: 'Crown',
    rarity: 'Mítico',
    ability: 'Solo sube ganando partidas; las victorias con corona aceleran su progreso y desbloquean variantes.',
    baseFile: 'T_Icon_BR_Creature_Sprite_Crown_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_Crown_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_Crown_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'aventura',
    name: 'Bandido',
    en: 'Adventure',
    rarity: 'Raro',
    ability: 'Mejora un objeto aleatorio de tu inventario cada vez que sube de nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_Dwarf_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_Dwarf_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_Dwarf_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: '8-bits',
    name: '8-Bit',
    en: '8-Bit',
    rarity: 'Raro',
    ability: 'Incluye una escopeta de 8 bits en el primer cofre y un multiplicador de puntuación para ella.',
    baseFile: 'T_Icon_BR_Creature_Sprite_EightBitBlaster_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_EightBitBlaster_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_EightBitBlaster_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'jazz-jackrabbit',
    name: 'Jazz Jackrabbit',
    en: 'Jackrabbit',
    rarity: 'Legendario',
    ability: 'Permite realizar un salto adicional en el aire; el enfriamiento disminuye al subir de nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_JazzJackrabbit_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_JazzJackrabbit_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_JazzJackrabbit_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'jonesy',
    name: 'Jonesy',
    en: 'Jonesy',
    rarity: 'Raro',
    ability: 'Recupera vida o escudo tras recibir daño; la cantidad aumenta con cada nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_Jonesy_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_Jonesy_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_Jonesy_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'explorador-tormenta',
    name: 'Explorador de Tormenta',
    en: 'Storm Scout',
    rarity: 'Raro',
    ability: 'Activa Overdrive al recibir daño de tormenta y, al máximo nivel, revela los próximos círculos.',
    baseFile: 'T_Icon_BR_Creature_Sprite_StormScout_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_StormScout_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_StormScout_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'klombo',
    name: 'Klombo',
    en: 'Klombo',
    rarity: 'Mítico',
    ability: 'Entrega objetos aleatorios por nivel y solo progresa consumiendo objetos; mejora su calidad al subir.',
    baseFile: 'T_Icon_BR_Creature_Sprite_Klombo_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_Klombo_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_Klombo_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'tails',
    name: 'Tails',
    en: 'Tails',
    rarity: 'Épico',
    ability: 'Permite planear con ayuda de Tails; la velocidad aumenta con cada nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Monkey_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'sonic',
    name: 'Sonic',
    en: 'Sonic',
    rarity: 'Épico',
    ability: 'Aumenta la velocidad de sprint con cada nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Obsidian_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'sombra',
    name: 'Shadow',
    en: 'Shadow',
    rarity: 'Épico',
    ability: 'Recarga automáticamente las armas guardadas; la recarga mejora con cada nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_NarrowFlea_Scribe_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'killswitch',
    name: 'Killswitch',
    en: 'Killswitch',
    rarity: 'Épico',
    ability: 'Mejora la precisión al apuntar mientras saltas o caes; aumenta con cada nivel.',
    baseFile: 'T_Icon_BR_Creature_Sprite_Killswitch_L.webp',
    cheatFile: 'T_Icon_BR_Creature_Sprite_Killswitch_Cheatmaster_L.webp',
    goldFile: 'T_Icon_BR_Creature_Sprite_Killswitch_Gold_L.webp',
    order: ['Base', 'Oro', 'Maestro de Trucos']
  },
  {
    slug: 'caballero',
    name: 'Caballero',
    en: 'Knight',
    rarity: 'Legendario',
    ability: 'Otorga un escudo protector cibernético y aumenta la resistencia contra detonaciones.',
    customImage: '/sprites/variations/caballero.png',
    order: ['Base']
  },
  {
    slug: 'ciber',
    name: 'Ciber',
    en: 'Cyber',
    rarity: 'Épico',
    ability: 'Mejora la velocidad de recarga y aumenta la capacidad del cargador de armas energéticas.',
    customImage: '/sprites/variations/ciber.png',
    order: ['Base']
  },
  {
    slug: 'onigiri',
    name: 'Onigiri',
    en: 'Onigiri',
    rarity: 'Raro',
    ability: 'Regenera salud continuamente mientras estés fuera del alcance del combate activo.',
    customImage: '/sprites/variations/onigiri.png',
    order: ['Base']
  },
  {
    slug: 'cientifico',
    name: 'Científico',
    en: 'Scientist',
    rarity: 'Legendario',
    ability: 'Rastrea cofres y contenedores cercanos a través de obstáculos y acelera la reanimación.',
    customImage: '/sprites/variations/cientifico.png',
    order: ['Base']
  },
  {
    slug: 'rey-pixel',
    name: 'Rey Píxel',
    en: 'Pixel King',
    rarity: 'Mítico',
    ability: 'Otorga un multiplicador de experiencia por eliminación y proyecta una corona resplandeciente.',
    customImage: '/sprites/variations/rey_pixel.png',
    order: ['Base']
  }
];

const getImageFile = (fam, variant) => {
  if (fam.customImage) return fam.customImage;
  if (variant === 'Base') return `/sprites/gen2/${fam.baseFile}`;
  if (variant === 'Oro') return `/sprites/gen2/${fam.goldFile}`;
  return `/sprites/gen2/${fam.cheatFile}`;
};

export const GEN2_SPIRITS = GEN2_FAMILIES.flatMap(fam =>
  fam.order.map(variant => ({
    id: `g2-${fam.slug}-${variant === 'Base' ? 'base' : variant === 'Oro' ? 'oro' : 'maestro-trucos'}`,
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
