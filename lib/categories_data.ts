export type Subject = {
  name: string
  params: string
  description: string
  link: string
}

export const SUBJECTS: Subject[] = [
  {
    name: 'abstract',
    params: 'abstract',
    description: 'Artwork that does not attempt to represent a visual reality but focuses on shapes, colors, and forms.',
    link: 'subjects/abstract'
  },
  {
    name: 'anatomy',
    params: 'anatomy',
    description: 'Anatomical studies of humans and animals.',
    link: 'subjects/anatomy'
  },
  {
    name: 'animals & wildlife',
    params: 'animals_wildlife',
    description: 'Artwork where the focus is on animals and wildlife, paleoart, zoology, and insects. Emphasis is on real animals (dinosaurs were once real too). Imaginary creatures should go in “Creatures & Monsters”.',
    link: 'subjects/animals_and_wildlife'
  },
  {
    name: 'anime & manga',
    params: 'anime_manga',
    description: 'Anime and manga styled artworks and productions.',
    link: 'subjects/anime_and_manga'
  },
  {
    name: 'architectural concepts',
    params: 'architectural_concepts',
    description: 'Conceptual artwork that explores structures, buildings, and architectural environments.',
    link: 'subjects/architectural_concepts'
  },
  {
    name: 'architectural visualization',
    params: 'architectural_visualization',
    description: '3D visualizations of architectural projects typically focused on photo-realism used to visualize and market construction projects.',
    link: 'subjects/architectural_visualization'
  },
  {
    name: 'automotive',
    params: 'automotive',
    description: 'Artwork related to the design, development, rendering, or simulation of automotive vehicles.',
    link: 'subjects/automotive'
  },
  {
    name: 'board & card game art',
    params: 'board_card_game_art',
    description: 'Art and design work specific to card or board games. Includes cover art, figurines, etc.',
    link: 'subjects/board_and_card_game_art'
  },
  {
    name: 'book illustration',
    params: 'book_illustration',
    description: 'Illustrative artwork intended to be published in books.',
    link: 'subjects/book_illustration'
  },
  {
    name: 'character animation',
    params: 'character_animation',
    description: 'Artwork specialized in the area of bringing a character to life through animation. It should include a video of the character\'s movement or expressions.',
    link: 'subjects/character_animation'
  },
  {
    name: 'character design',
    params: 'character_design',
    description: 'Concept art and visual development focused on original character design.\n' +
      '\n' +
      'If your project is a sculpt of a likeness or concept by another artist, please categorize it in Character Modeling.',
    link: 'subjects/character_design'
  },
  {
    name: 'character modeling',
    params: 'character_modeling',
    description: 'Artwork with a focus on the modeling and sculpting of characters.',
    link: 'subjects/character_modeling'
  },
  {
    name: "children's art",
    params: 'childrens_art',
    description: 'Artwork meant for media to be consumed by children including children’s books, animation, games, and apps.',
    link: 'subjects/childrens_art'
  },
  {
    name: 'comic art',
    params: 'comic_art',
    description: 'Artwork styled or relating to comics and graphic novels.',
    link: 'subjects/comic_art'
  },
  {
    name: 'concept art',
    params: 'concept_art',
    description: 'Artwork used to convey explorations of ideas, (usually for film, games, or other media) before the final product is rendered.',
    link: 'subjects/concept_art'
  },
  {
    name: 'cover art',
    params: 'cover_art',
    description: 'Artworks created specifically for the covers of products such as books, albums, games, magazines, movies, box art, etc.',
    link: 'subjects/cover_art'
  },
  {
    name: 'creatures',
    params: 'creatures',
    description: 'Artwork depicting imaginary creatures or monsters.',
    link: 'subjects/creatures'
  },
  {
    name: 'editorial illustration',
    params: 'editorial_illustration',
    description: 'Artworks created to accompany written text such as magazine articles, newspapers, and online publications.',
    link: 'subjects/editorial_illustration'
  },
  {
    name: 'environmental concept art & design',
    params: 'environmental_concept_art_design',
    description: 'Artwork with a focus on the design or illustration of an environment.',
    link: 'subjects/environmental_concept_art_and_design'
  },
  {
    name: 'fan art',
    params: 'fan_art',
    description: 'Artworks based on existing properties. Remember to credit the copyright owner in your description and do not include their company or franchise logos on your artwork.',
    link: 'subjects/fan_art'
  },
  {
    name: 'fantasy',
    params: 'fantasy',
    description: 'Artwork based on mythological, supernatural or magical themes often set in the past and/or in a far off unknown place.',
    link: 'subjects/fantasy'
  },
  {
    name: 'fashion & costume design',
    params: 'fashion_costume_design',
    description: 'Artwork focused on the clothing, armor, and appearance of characters.',
    link: 'subjects/fashion_and_costume_design'
  },
  {
    name: 'game art',
    params: 'game_art',
    description: 'Artwork created for games including splash illustrations, game concept art, and game production art.',
    link: 'subjects/game_art'
  },
  {
    name: 'gameplay & level design',
    params: 'gameplay_level_design',
    description: 'Projects focused on game interaction and level design for games, covering 2D and 3D artwork. This field showcases the design of player interaction rather than aesthetics.',
    link: 'subjects/gameplay_and_level_design'
  },
  {
    name: 'games & real-time 3D environment art',
    params: 'games_real_time_3d_environment_art',
    description: 'Projects focused on the creation of real-time 3D environment art, predominantly for games.',
    link: 'subjects/games_and_real_time_3d_environment_art'
  },
  {
    name: 'graphic design',
    params: 'graphic_design',
    description: 'Graphic design projects including logos, icon designs, fonts, decals, and graphical elements.',
    link: 'subjects/graphic_design'
  },
  {
    name: 'hard surface',
    params: 'hard_surface',
    description: 'Projects with a focus on hard surface design & modeling.',
    link: 'subjects/hard_surface'
  },
  {
    name: 'horror',
    params: 'horror',
    description: 'Artwork and productions in the horror genre, intending to frighten, scare, disgust, and startle viewers.',
    link: 'subjects/horror'
  },
  {
    name: 'illustration',
    params: 'illustration',
    description: 'Artwork that is designed to be published and created as an interpretation, decoration or visual representation of a text or concept.',
    link: 'subjects/illustration'
  },
  {
    name: 'industrial & product design',
    params: 'industrial_product_design',
    description: 'Designs for physical products meant to be industrially manufactured.',
    link: 'subjects/industrial_and_product_design'
  },
  {
    name: 'lighting',
    params: 'lighting',
    description: 'Artwork that showcases and models the behavior of light.',
    link: 'subjects/lighting'
  },
  {
    name: 'matte painting',
    params: 'matte_painting',
    description: 'Painted representations of a landscape, set, or distant location used to create the illusion of an environment.',
    link: 'subjects/matte_painting'
  },
  {
    name: 'mecha',
    params: 'mecha',
    description: 'Artwork with a focus on the design, illustration or rendering of robots or machines (mechs).',
    link: 'subjects/mecha'
  },
  {
    name: 'mechanical design',
    params: 'mechanical_design',
    description: 'Concept designs that showcase systems, parts, or components of mechanical nature.',
    link: 'subjects/mechanical_design'
  },
  {
    name: 'motion graphics',
    params: 'motion_graphics',
    description: 'Artwork with a focus on animated graphics or text.',
    link: 'subjects/motion_graphics'
  },
  {
    name: 'photogrammetry & 3D scanning',
    params: 'photogrammetry_3d_scanning',
    description: 'Projects that involve 3D scanning or software that uses photographs to map and reconstruct the shape of an object.',
    link: 'subjects/photogrammetry_and_3d_scanning'
  },
  {
    name: 'pixel & voxel art',
    params: 'pixel_voxel_art',
    description: 'Artwork with a low-res or retro look, including but not limited to pixel art using 8 or 16-bit color palettes, modern pixel sprites, and voxel art.',
    link: 'subjects/pixel_and_voxel_art'
  },
  {
    name: 'portraits',
    params: 'portraits',
    description: 'Artistic representations of a character\'s face or expression.',
    link: 'subjects/portraits'
  },
  {
    name: 'props',
    params: 'props',
    description: 'Artwork that contains an illustration, rendering or design of an object to be used for interaction within a scene.',
    link: 'subjects/props'
  },
  {
    name: 'realism',
    params: 'realism',
    description: 'Artwork that pushes a realistic style and attempts to depict true-to-life proportions, shapes, and forms.',
    link: 'subjects/realism'
  },
  {
    name: 'science fiction',
    params: 'science_fiction',
    description: 'Genre depicting imagined future and scientific or technological advances often portraying space, time travel and alien life.',
    link: 'subjects/science_fiction'
  },
  {
    name: 'scientific illustration & visualisation',
    params: 'scientific_illustration_visualisation',
    description: 'Artwork that visually communicates information of a scientific nature.',
    link: 'subjects/scientific_illustration_and_visualisation'
  },
  {
    name: 'scripts & tools',
    params: 'scripts_tools',
    description: 'Showcasing software tools focused on enhancing art workflows.',
    link: 'subjects/scripts_and_tools'
  },
  {
    name: 'sketches',
    params: 'sketches',
    description: 'Rough or unfinished artwork that captures and explores ideas.',
    link: 'subjects/sketches'
  },
  {
    name: 'still life',
    params: 'still_life',
    description: 'Scenes depicting natural or man-made inanimate objects.',
    link: 'subjects/still_life'
  },
  {
    name: 'storyboards',
    params: 'storyboards',
    description: 'A sequence of drawings representing the shots planned for a production.',
    link: 'subjects/storyboards'
  },
  {
    name: 'stylized',
    params: 'stylized',
    description: 'Artwork that pushes a stylized look, often with unrealistic proportions and shapes.',
    link: 'subjects/stylized'
  },
  {
    name: 'technical art',
    params: 'technical_art',
    description: 'Projects with a focus on showcasing the technical aspect of creating production art. Includes rigging, skinning, simulations, shading, effects, and other technical art topics.',
    link: 'subjects/technical_art'
  },
  {
    name: 'textures & materials',
    params: 'textures_materials',
    description: 'Texture and materials to be applied to a 3D object, environment or character. This covers both real-time and offline rendered materials.',
    link: 'subjects/textures_and_materials'
  },
  {
    name: 'toys & collectibles',
    params: 'toys_collectibles',
    description: 'Objects artistically fabricated to be physical toys or collectibles.',
    link: 'subjects/toys_and_collectibles'
  },
  {
    name: 'tutorials',
    params: 'tutorials',
    description: 'Projects that include images or videos that demonstrate a process, intended for education.',
    link: 'subjects/tutorials'
  },
  {
    name: 'user interface (UI) art',
    params: 'user_interface_art',
    description: 'Projects focusing on the art of userMain interfaces such as game UI and in-game/movie UI screens.',
    link: 'subjects/user_interface_art'
  },
  {
    name: 'vehicles',
    params: 'vehicles',
    description: 'Representations of vehicles used for transportation, real or imagined.',
    link: 'subjects/vehicles'
  },
  {
    name: 'VFX for film, TV & animation',
    params: 'vfx_for_film_tv_animation',
    description: 'Rendered visual effects for film & television, animation, and cinematics for both live-action and animation. Includes set extensions, simulations, explosions, crowds, etc.',
    link: 'subjects/vfx_for_film_tv_and_animation'
  },
  {
    name: 'VFX for real-time & games',
    params: 'vfx_for_real_time_games',
    description: 'Real-time and in-game visual effects.',
    link: 'subjects/vfx_for_real_time_and_games'
  },
  {
    name: 'virtual & augmented reality',
    params: 'virtual_augmented_reality',
    description: 'Projects or assets created for virtual or augmented experiences.',
    link: 'subjects/virtual_and_augmented_reality'
  },
  {
    name: 'visual development',
    params: 'visual_development',
    description: 'Creative work used to develop visuals in animation, typically for movies, TV shows, and cinematics.',
    link: 'subjects/visual_development'
  },
  {
    name: 'weapons',
    params: 'weapons',
    description: 'Artwork with a focus on the design, illustration or rendering of an object that is meant to cause injury or damage.',
    link: 'subjects/weapons'
  },
  {
    name: 'web & app design',
    params: 'web_app_design',
    description: 'Designs for web and apps, with a focus on the UI art direction.',
    link: 'subjects/web_and_app_design'
  },
];


type Medium = {
  name: string
  params: string
}
export const MEDIUM: Medium[] = [
  {
    name: 'digital 2d',
    params: 'digital_2d',
  },
  {
    name: 'digital 3d',
    params: 'digital_3d',
  },
  {
    name: 'animation',
    params: 'animation',
  },
  {
    name: 'real-time',
    params: 'real_time',
  },
  {
    name: 'live action cg/vgx',
    params: 'live_action_cgvgx',
  },
  {
    name: 'rd printing',
    params: 'rd_printing',
  },
  {
    name: 'traditional ink',
    params: 'traditional_ink',
  },
  {
    name: 'traditional dry media',
    params: 'traditional_dry_media',
  },
  {
    name: 'traditional paint',
    params: 'traditional_paint',
  },
  {
    name: 'traditional sculpture',
    params: 'traditional_sculpture',
  },
  {
    name: 'mixed media',
    params: 'mixed_media',
  },
];