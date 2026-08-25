// Generation 1 Runners Spirits (117 items)
const CDN_BASE = 'https://fortnite.gg/img/x/sprites/icons/';

const GEN1_RAW_FAMILIES = [
  { slug: 'batman', name: 'Batman', en: 'Batman', rarity: 'Mítico', files: { Base: 'T_Icon_BR_FossilMeal_Default_L.webp', Oro: 'T_Icon_BR_FossilMeal_Gold_L.webp', Golosina: 'T_Icon_BR_FossilMeal_Candy_L.webp', Galaxy: 'T_Icon_BR_FossilMeal_Galaxy_L.webp', Holofoil: 'T_Icon_BR_FossilMeal_Holofoil_L.webp', Cubo: 'T_Icon_BR_FossilMeal_Cube_L.webp' } },
  { slug: 'agua', name: 'Agua', en: 'Water', rarity: 'Raro', files: { Base: 'T_Icon_BR_Creature_Sprite_Water_Unvault_Ch7S3_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Water_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Water_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Water_Galaxy_ui_L.webp', Gema: 'T_Icon_BR_Creature_Sprite_Water_Gem_ui_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_Water_Holofoil_ui_L.webp', Cuac: 'T_Icon_BR_Creature_Sprite_Water_Quack_ui_L.webp' } },
  { slug: 'tierra', name: 'Tierra', en: 'Earth', rarity: 'Raro', files: { Base: 'T_Icon_BR_Creature_Sprite_Earth_Ch7S3_UI_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Earth_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Earth_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Earth_Galaxy_ui_L.webp', Gema: 'T_Icon_BR_Creature_Sprite_Earth_Gem_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Earth_Cube_ui_L.webp', Cuac: 'T_Icon_BR_Creature_Sprite_Earth_Quack_ui_L.webp' } },
  { slug: 'fuego', name: 'Fuego', en: 'Fire', rarity: 'Raro', files: { Base: 'T_Icon_BR_Creature_Sprite_Fire_Unvault_Ch7S3_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Fire_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Fire_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Fire_Galaxy_ui_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_Fire_Holofoil_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Fire_Cube_ui_L.webp', Cuac: 'T_Icon_BR_Creature_Sprite_Fire_Quack_ui_L.webp' } },
  { slug: 'pato', name: 'Pato', en: 'Duck', rarity: 'Épico', files: { Base: 'T_Icon_BR_Duck_Default_L.webp', Oro: 'T_Icon_BR_Duck_Gold_L.webp', Golosina: 'T_Icon_BR_Duck_Candy_L.webp', Galaxy: 'T_Icon_BR_Duck_Galaxy_L.webp', Gema: 'T_Icon_BR_Duck_Gem_L.webp' } },
  { slug: 'fantasma', name: 'Fantasma', en: 'Ghost', rarity: 'Épico', files: { Base: 'T_Icon_BR_Creature_Sprite_Ghost_Unvault_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Ghost_Gold_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Ghost_Candy_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Ghost_Galaxy_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_Ghost_Holo_L.webp' } },
  { slug: 'sueno', name: 'Sueño', en: 'Dream', rarity: 'Legendario', files: { Base: 'T_Icon_BR_Creature_Sprite_Sleepy_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Sleepy_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Sleepy_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Sleepy_Galaxy_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Sleepy_Cube_ui_L.webp' } },
  { slug: 'demonio', name: 'Demonio', en: 'Demon', rarity: 'Épico', files: { Base: 'T_Icon_BR_RedDemon_Default_L.webp', Oro: 'T_Icon_BR_RedDemon_Gold_L.webp', Golosina: 'T_Icon_BR_RedDemon_Candy_L.webp', Galaxy: 'T_Icon_BR_RedDemon_Galaxy_L.webp', Gema: 'T_Icon_BR_RedDemon_Gem_L.webp' } },
  { slug: 'punk', name: 'Punk', en: 'Punk', rarity: 'Legendario', files: { Base: 'T_Icon_BR_Creature_Sprite_Punk_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Punk_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Punk_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Punk_Galaxy_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Punk_Cube_ui_L.webp' } },
  { slug: 'rey', name: 'Rey', en: 'King', rarity: 'Épico', files: { Base: 'T_Icon_BR_Creature_Sprite_King_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_King_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_King_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_King_Galaxy_ui_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_King_Holofoil_ui_L.webp' } },
  { slug: 'punto-cero', name: 'Punto Cero', en: 'Zero Point', rarity: 'Mítico', files: { Base: 'T_Icon_BR_Creature_Sprite_ZeroPoint_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Galaxy_ui_L.webp', Gema: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Gem_ui_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Holofoil_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Cube_ui_L.webp', Cuac: 'T_Icon_BR_Creature_Sprite_ZeroPoint_Quack_ui_L.webp' } },
  { slug: 'pez', name: 'Pez', en: 'Fishy', rarity: 'Raro', files: { Base: 'T_Icon_BR_Creature_Sprite_Fishy_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Fishy_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Fishy_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Fishy_Galaxy_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Fishy_Cube_L.webp' } },
  { slug: 'delantero', name: 'Delantero', en: 'Striker', rarity: 'Épico', files: { Base: 'T_Icon_BR_Creature_Sprite_Soccer_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Soccer_Gold_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Soccer_Candy_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Soccer_Galaxy_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_Soccer_Holofoil_L.webp' } },
  { slug: 'aura', name: 'Aura', en: 'Aura', rarity: 'Épico', files: { Base: 'T_Icon_BR_Creature_Sprite_Drifter_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Drifter_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Drifter_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Drifter_Galaxy_ui_L.webp', Gema: 'T_Icon_BR_Creature_Sprite_Drifter_Gem_ui_L.webp' } },
  { slug: 'jefe', name: 'Jefe', en: 'Boss', rarity: 'Legendario', files: { Base: 'T_Icon_BR_Creature_Sprite_Boss_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Boss_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Boss_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Boss_Galaxy_ui_L.webp', Cubo: 'T_Icon_BR_Creature_Sprite_Boss_Cube_ui_L.webp' } },
  { slug: 'parca', name: 'Parca', en: 'Grim', rarity: 'Mítico', files: { Base: 'T_Icon_BR_GrimReaper_Default_L.webp', Oro: 'T_Icon_BR_GrimReaper_Gold_L.webp', Golosina: 'T_Icon_BR_GrimReaper_Candy_L.webp', Galaxy: 'T_Icon_BR_GrimReaper_Galaxy_L.webp', Gema: 'T_Icon_BR_GrimReaper_Gem_L.webp', Holofoil: 'T_Icon_BR_GrimReaper_Holofoil_L.webp', Cubo: 'T_Icon_BR_GrimReaper_Cube_L.webp' } },
  { slug: 'aire', name: 'Aire', en: 'Air', rarity: 'Raro', files: { Base: 'T_Icon_BR_Air_Default_L.webp', Oro: 'T_Icon_BR_Air_Gold_L.webp', Golosina: 'T_Icon_BR_Air_Candy_L.webp', Galaxy: 'T_Icon_BR_Air_Galaxy_L.webp', Holofoil: 'T_Icon_BR_Air_Holo_L.webp' } },
  { slug: 'los-siete', name: 'Los Siete', en: 'Seven', rarity: 'Legendario', files: { Base: 'T_Icon_BR_Creature_Sprite_Seven_ui_L.webp', Oro: 'T_Icon_BR_Creature_Sprite_Seven_Gold_ui_L.webp', Golosina: 'T_Icon_BR_Creature_Sprite_Seven_Candy_ui_L.webp', Galaxy: 'T_Icon_BR_Creature_Sprite_Seven_Galaxy_ui_L.webp', Holofoil: 'T_Icon_BR_Creature_Sprite_Seven_Holofoil_ui_L.webp' } },
  { slug: 'llama-saqueadora', name: 'Llama Saqueadora', en: "Lootin' Llama", rarity: 'Legendario', files: { Base: 'T_Icon_BR_LootinLlama_Default_L.webp', Oro: 'T_Icon_BR_LootinLlama_Gold_L.webp', Golosina: 'T_Icon_BR_LootinLlama_Candy_L.webp', Galaxy: 'T_Icon_BR_LootinLlama_Galaxy_L.webp', Gema: 'T_Icon_BR_LootinLlama_Gem_L.webp' } },
  { slug: 'bananin-fisgon', name: 'Bananín Fisgón', en: 'Peeky Peely', rarity: 'Legendario', files: { Base: 'T_Icon_BR_PeekyPeely_Default_L.webp', Oro: 'T_Icon_BR_PeekyPeely_Gold_L.webp', Golosina: 'T_Icon_BR_PeekyPeely_Candy_L.webp', Galaxy: 'T_Icon_BR_PeekyPeely_Galaxy_L.webp', Holofoil: 'T_Icon_BR_PeekyPeely_Holofoil_L.webp' } }
];

const ALL_VARIANTS = ['Base', 'Oro', 'Golosina', 'Galaxy', 'Gema', 'Holofoil', 'Cubo', 'Cuac'];
const BASE_SUMMON_COST = { Raro: 100, Épico: 2700, Legendario: 4500, Mítico: 6750, Especial: 0 };
const SPECIAL_SUMMON_COST = { Raro: 2700, Épico: 4000, Legendario: 6750, Mítico: 10000, Especial: 0 };

const gen1Items = GEN1_RAW_FAMILIES.flatMap(fam =>
  ALL_VARIANTS.flatMap(variant => {
    const fileName = fam.files[variant];
    if (!fileName) return [];
    return [{
      id: `${fam.slug}-${variant.toLowerCase()}`,
      family: fam.name,
      familyEn: fam.en,
      variant,
      rarity: variant === 'Base' ? fam.rarity : 'Especial',
      summonCost: variant === 'Base' ? BASE_SUMMON_COST[fam.rarity] : SPECIAL_SUMMON_COST[fam.rarity],
      image: `${CDN_BASE}${fileName}`,
      generation: 1,
      ability: 'Colección histórica de Runners · Temporada 3'
    }];
  })
);

// Special Mythic Gen 1 spirits
const SPECIAL_GEN1_SPIRITS = [
  { id: 'john-wick-mitico', family: 'John Wick', familyEn: 'John Wick', variant: 'Mítico', rarity: 'Mítico', summonCost: 6750, image: `${CDN_BASE}T_Icon_BR_JohnWick_Default_L.webp`, generation: 1, ability: 'Espíritu Legendario John Wick' },
  { id: 'vini-jr-mitico', family: 'Vini Jr.', familyEn: 'Vini Jr.', variant: 'Mítico', rarity: 'Mítico', summonCost: 6750, image: `${CDN_BASE}T_Icon_BR_CokeParmesan_Default_L.webp`, generation: 1, ability: 'Espíritu Legendario Vini Jr.' },
  { id: 'cacahuate-quemado-mitico', family: 'Cacahuate Quemado', familyEn: 'Burnt Peanut', variant: 'Mítico', rarity: 'Mítico', summonCost: 6750, image: `${CDN_BASE}T_Icon_BR_Creature_Sprite_BurntPeanut_ui_L.webp`, generation: 1, ability: 'Espíritu Legendario Cacahuate' },
  { id: 'ironmouse-mitico', family: 'Ironmouse', familyEn: 'Ironmouse', variant: 'Mítico', rarity: 'Mítico', summonCost: 6750, image: `${CDN_BASE}T_Icon_BR_Ironmouse_Default_L.webp`, generation: 1, ability: 'Espíritu Legendario Ironmouse' },
  { id: 'pollo-mitico', family: 'Pollo', familyEn: 'Pollo', variant: 'Mítico', rarity: 'Mítico', summonCost: 6750, image: `${CDN_BASE}T_Icon_BR_CompanyStargazer_Default_L.webp`, generation: 1, ability: 'Espíritu Legendario Pollo' }
];

export const GEN1_SPIRITS = [...gen1Items, ...SPECIAL_GEN1_SPIRITS];
