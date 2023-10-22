export type Subject = {
  name: string,
  description: string,
  link: string
}

export const subject: Subject[] = [
  {
    name: 'abstract',
    description: 'Artwork that does not attempt to represent a visual reality but focuses on shapes, colors, and forms.',
    link: '/subject/abstract'
  },
  {
    name: 'anatomy',
    description: 'Anatomical studies of humans and animals.',
    link: '/subject/anatomy'
  },
  {
    name: 'animals & wildlife',
    description: 'Artwork where the focus is on animals and wildlife, paleoart, zoology, and insects. Emphasis is on real animals (dinosaurs were once real too). Imaginary creatures should go in “Creatures & Monsters”.',
    link: '/'
  },
  {name: 'anime & manga', description: '', link: '/'},
  {name: 'architectural concepts', description: '', link: '/'},
  {name: 'architectural visualization', description: '', link: '/'},
  {name: 'automotive', description: '', link: '/'},
  {name: 'board & card game art', description: '', link: '/'},
  {name: 'book illustration', description: '', link: '/'},
  {name: 'character animation', description: '', link: '/'},
  {name: 'character design', description: '', link: '/'},
  {name: 'character modeling', description: '', link: '/'},
  {name: "children's art", description: '', link: '/'},
  {name: 'comic art', description: '', link: '/'},
  {name: 'concept art', description: '', link: '/'},
  {name: 'cover art', description: '', link: '/'},
  {name: 'creatures', description: '', link: '/'},
  {name: 'editorial illustration', description: '', link: '/'},
  {
    name: 'environmental concept art & design',
    description: '',
    link: '/'
  },
  {name: 'fan art', description: '', link: '/'},
  {name: 'fantasy', description: '', link: '/'},
  {name: 'fashion & costume design', description: '', link: '/'},
  {name: 'game art', description: '', link: '/'},
  {name: 'gameplay & level design', description: '', link: '/'},
  {name: 'games and real-time 3d', description: '', link: '/'},
  {name: 'graphic design', description: '', link: '/'},
  {name: 'hard surface', description: '', link: '/'},
  {name: 'horror', description: '', link: '/'}
];


type Medium = string[]
export const medium: Medium = ['digital 2d', 'digital 3d', 'animation', 'real-time', 'live action cg/vgx', 'rd printing', 'traditional ink', 'traditional dry media', 'traditional paint', 'traditional sculpture', 'mixed media',];