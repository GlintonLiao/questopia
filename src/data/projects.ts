export interface Project {
  title: string
  description: string
  cover: string
  href: string
  kind: 'current' | 'previous'
}

export const currentProjects: Project[] = [
  {
    title: 'King of Bots',
    description: 'AI battle platform supporting PvE and PvP',
    cover: '/imgs/Cover-KOB.jpg',
    href: 'https://github.com/GlintonLiao/king-of-bots',
    kind: 'current',
  },
  {
    title: '[Key: Board]',
    description: 'An iOS keyboard for code editing',
    cover: '/imgs/Cover-Keyboard.jpg',
    href: 'https://github.com/GlintonLiao/Key-Board',
    kind: 'current',
  },
  {
    title: 'Vue Chemistry',
    description: 'Reactified JavaScript functions for Vue',
    cover: '/imgs/vue-chemistry.jpg',
    href: 'https://github.com/vueuse/vue-chemistry',
    kind: 'current',
  },
  {
    title: 'Three.js Starting Template',
    description: 'Three.js starting template based on TS and Vite',
    cover: '/imgs/cover-vithree.jpg',
    href: 'https://github.com/GlintonLiao/threejs-template-typescript',
    kind: 'current',
  },
  {
    title: 'Questopia',
    description: '3D room · Personal website · Online portfolio',
    cover: '/imgs/Cover-Questopia.jpg',
    href: 'https://github.com/GlintonLiao/questopia',
    kind: 'current',
  },
  {
    title: 'Pkg-Desc',
    description: 'List details of all dependencies packages',
    cover: '/imgs/Cover-Pkg.jpg',
    href: 'https://www.npmjs.com/package/pkg-desc',
    kind: 'current',
  },
  {
    title: 'Reactive Numbers Converter',
    description: 'All in one with fully reactivity',
    cover: '/imgs/Cover-Reactive.jpg',
    href: 'https://reactive-numbers-converter.netlify.app',
    kind: 'current',
  },
  {
    title: 'Archibucket',
    description: 'An informative website for the architectural industry',
    cover: '/imgs/Cover-Titong.jpg',
    href: 'https://www.titongpaolu.run/',
    kind: 'current',
  },
  {
    title: 'Layout Visualizer',
    description: 'The console.log() for the CSS',
    cover: '/imgs/Cover-Layout.jpg',
    href: 'https://chrome.google.com/webstore/detail/layout-visualizer/damlicfebbfedlipdokpehkmkpbhgpfi',
    kind: 'current',
  },
  {
    title: 'Hyper UI',
    description: 'Free Open Source Tailwind CSS Components',
    cover: '/imgs/Cover-hyper.jpg',
    href: 'https://www.hyperui.dev/components/application-ui/toggles',
    kind: 'current',
  },
]

export const previousProjects: Project[] = [
  {
    title: 'Pendulum Parking',
    description: 'Maximize the value of idle parking space',
    cover: '/imgs/Cover.png',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Pendulum%20Parking.html',
    kind: 'previous',
  },
  {
    title: 'Archimason',
    description: 'Online architectural design assistant',
    cover: '/imgs/Cover-Archimason.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Archimason.html',
    kind: 'previous',
  },
  {
    title: 'Protect Winterfell',
    description: 'Reconstruction of castle wall defense system',
    cover: '/imgs/Cover-Protect Winterfell.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Protect%20Winterfell.html',
    kind: 'previous',
  },
  {
    title: 'Relevator',
    description: 'Taking elevator in an interesting way',
    cover: '/imgs/Cover-Elevator.png',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Relevator.html',
    kind: 'previous',
  },
  {
    title: 'South of the city',
    description: 'Computational community design',
    cover: '/imgs/Cover-Box.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/South%20of%20the%20city.html',
    kind: 'previous',
  },
  {
    title: 'Digital Artworks',
    description: 'Daily design practice',
    cover: '/imgs/Cover-Artworks.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Artworks.html',
    kind: 'previous',
  },
  {
    title: 'Poetry of Triangle',
    description: 'Contemporary art museum in a historic area',
    cover: '/imgs/Cover-Poetry of Triangle.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Poetry%20of%20triangle.html',
    kind: 'previous',
  },
  {
    title: 'Enhance the UX of Artstation',
    description: 'Create a seamless browsing experience',
    cover: '/imgs/Cover-Artstation.jpg',
    href: 'https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Artstation.html',
    kind: 'previous',
  },
]
