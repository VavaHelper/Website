'use client'

const contributors = [
  {
    name: 'André Felipe',
    github: 'https://github.com/andrefelipebarros',
    avatar: 'https://github.com/andrefelipebarros.png',
  },
  {
    name: 'Gabriel Alves',
    github: 'https://github.com/Gabriel1000000',
    avatar: 'https://github.com/Gabriel1000000.png',
  },
  {
    name: 'Juliana Nadruz',
    github: 'https://github.com/Nadruz',
    avatar: 'https://github.com/Nadruz.png',
  },
  {
    name: 'Rafael Sartorio',
    github: 'https://github.com/RafaelSartorio',
    avatar: 'https://github.com/RafaelSartorio.png',
  },
  {
    name: 'Matheus Rocha',
    github: 'https://github.com/matheus-rmds',
    avatar: 'https://github.com/matheus-rmds.png',
  },
  {
    name: 'Bitwise Star',
    github: 'https://github.com/bitwise-star',
    avatar: 'https://github.com/bitwise-star.png',
  },
  {
    name: 'Erik Devel',
    github: 'https://github.com/erikdevel0per',
    avatar: 'https://github.com/erikdevel0per.png',
  },
  {
    name: 'Igor Araujo',
    github: 'https://github.com/IGR-cK',
    avatar: 'https://github.com/IGR-cK.png',
  },
  {
    name: 'Rafael Gomes',
    github: 'https://github.com/rRafaelGomes',
    avatar: 'https://github.com/rRafaelGomes.png',
  },
];

export function Footer() {
  return (
    <footer className="bg-transparent text-white border-t border-neutral-950">
      <div className="container mx-auto px-4 md:px-10 md:pl-[150px] py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: text block */}
          <div className="w-full md:w-2/3 max-w-2xl">
            <p className="text-sm text-neutral-400">
              Contato:{' '}
              <a href="mailto:vavahelper@gmail.com" className="text-red-400 hover:underline">vavahelper@gmail.com</a>
            </p>

            <p className="mt-4 text-xs text-neutral-500">
              Este é um projeto feito por fãs para a comunidade de Valorant. Todas as marcas
              registradas, nomes de personagens, imagens e outros elementos relacionados ao jogo
              são de propriedade da Riot Games, Inc. Este site não é afiliado, endossado ou
              patrocinado pela Riot Games de nenhuma forma.
            </p>

            <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} VavaHelper. Todos os direitos reservados.</p>
          </div>

          {/* Right: contributors - avatars first, title below */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-center">
            {/* Avatars: closer spacing, can overlap slightly with -space-x-2 on larger screens */}
            <div className="flex items-center gap-1 md:gap-2 md:-space-x-2 md:justify-center flex-wrap">
              {contributors.map((c) => (
                <a
                  key={c.github}
                  href={c.github}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 z-10 md:z-auto"
                  aria-label={c.name}
                  title={c.name}
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-transparent object-cover transition-transform duration-200 transform group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:border-red-500 group-focus:border-red-500"
                  />

                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded px-2 py-1 text-xs font-medium bg-neutral-900 text-neutral-100 shadow-lg opacity-0 scale-95 transform transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100">{c.name}</span>
                </a>
              ))}
            </div>

            {/* Title under icons */}
            <h2 className="text-sm font-medium mt-2 text-neutral-300">Contribuidores</h2>

            {/* Mobile hint */}
            <div className="mt-3 w-full md:hidden">
              <p className="text-[10px] text-neutral-500">Toque/pausar em um avatar para ver o nome.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
