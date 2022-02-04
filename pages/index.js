import Head from 'next/head'
import Image from 'next/image'
import swr from '../lib/swr';

const items = [
  { icon: 'fab fa-spotify', link: 'https://open.spotify.com/user/2ln4q9hmq16bji4c1uva0ntgc' },
  { icon: 'fab fa-instagram', link: 'https://instagram.com/this.clqu' },
  { icon: 'fab fa-github', link: 'https://github.com/clqu' },
  { icon: 'fab fa-discord', link: 'https://discord.com/users/714451348212678658' },
]

export default function Home() {
  const { data: _profile } = swr('https://linkcord.swoth.xyz/api/v1/user/714451348212678658');
  const profile = _profile ? _profile.data : null;

  const { data: _projects } = swr('/api/projects');
  const projects = _projects ? _projects : null;

  const { data: _repositories } = swr('/api/repos');
  const repositories = _repositories ? _repositories : null;

  const { data: _technologies } = swr('/api/techs');
  const technologies = _technologies ? _technologies : null;

  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center md:justify-between border-b-2 border-neutral-800/20 pb-2">
        <p className="font-semibold font-Poppins text-xl">clqu</p>
        <div className="flex items-center space-x-2">
          {items.map(item => (
            <a key={item.link} href={item.link} target="_blank" rel="noreferrer" className="flex items-center justify-center hover:bg-neutral-700/20 rounded-xl transition-all duration-150 p-2 px-3">
              <i className={`${item.icon} text-3xl`} />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-neutral-800/20 shadow-xl rounded-lg w-full h-auto mt-6">
        {_profile ? (
          profile ? (
          <div className="relative">
            <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
              <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                <div className="flex items-center">
                <p className="flex items-center text-white text-4xl font-semibold">
                  clqu
                </p>
                {profile.user.status !== "offline" && (
                    <span className="ml-2 bg-black/20 text-red-500 border border-red-500/20 px-2 py-1 font-normal rounded-md text-sm">
                      Online on Discord
                    </span>
                )}
                </div>
                <p className="text-white/50 text-md mt-3">
                  Hi, I`m clqu. I am a 2nd year high school student and I have been spending time with codes for about 1-2 years. I really dont know anything more about me. Thanks for reading :)
                </p>
              </div>
              <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                <Image alt="clqu" src={`https://cdn.discordapp.com/avatars/${profile.user.id}/${profile.user.avatar}`} width="160" height="160" className="bg-neutral-700 w-[160px] h-[160px] rounded-full" />
                <div className={`${profile.user.status !== "offline" ? 'bg-red-700' : 'bg-neutral-700'} absolute bottom-0 right-4 border-[5px] border-neutral-800/20 w-[32px] h-[32px] rounded-full`} />
              </div>
            </div>
            <span style={{ zIndex: '-1' }} className="text-red-500/5 absolute top-5 left-5 text-6xl font-semibold">Full-stack Web Developer</span>
          </div>
          ) : (
            <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
              <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
                <div className="bg-neutral-700/30 animate-pulse w-1/2 h-[24px] rounded-md" />
                <div className="mt-2 bg-neutral-700 animate-pulse w-[95%] h-[96px] rounded-md" />
              </div>
              <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
                <div className="bg-neutral-700/30 animate-pulse w-[160px] h-[160px] rounded-full" />
                <div className="absolute bottom-1 right-5 bg-neutral-700 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
            <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
              <div className="bg-neutral-700/30 animate-pulse w-1/2 h-[24px] rounded-md" />
              <div className="mt-2 bg-neutral-700/30 animate-pulse w-[95%] h-[96px] rounded-md" />
            </div>
            <div className="order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] rounded-full">
              <div className="bg-neutral-700/30 animate-pulse w-[160px] h-[160px] rounded-full" />
              <div className="absolute bottom-1 right-5 bg-neutral-700 border-4 border-neutral-800 animate-pulse w-[32px] h-[32px] rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="py-20">
        <p className="text-3xl text-white font-semibold">My Projects</p>
        <p className="text-xl text-white/50 font-normal">The projects i am actively working on take place in this area.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 items-center mt-2">
          {_projects ? (
            projects ? (
              projects.map((_, __) => (
                <a href={_.link} target="_blank" rel="noreferrer" key={__} className="bg-neutral-800/20 p-4 hover:bg-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full">
                  <div className="flex-shrink-0 w-full h-[200px] md:h-auto">
                    <Image alt="clqu" src={_.image} width="1024" className="rounded-lg" height="512" />
                  </div>
                  <p className="text-xl font-semibold mt-5">{_.name}</p>
                  <p className="text-md font-normal text-white/50 h-24">{_.description}</p>
                </a>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, __) => (
                <div key={__} className="bg-neutral-800/20 p-4 rounded-lg w-full">
                  <div className="flex-shrink-0 w-[100%] h-[8.6rem]">
                    <div className="w-full h-full bg-neutral-700/30 rounded-lg animate-pulse" />
                  </div>
                  <div className="bg-neutral-700/30 animate-pulse w-1/2 h-[24px] rounded-md mt-5" />
                  <div className="mt-2 bg-neutral-700/30 animate-pulse w-full h-[96px] rounded-md" />
                </div>
              ))
            )
          ) : (
            Array.from({ length: 3 }).map((_, __) => (
              <div key={__} className="bg-neutral-800/20 p-4 rounded-lg w-full">
                <div className="flex-shrink-0 w-[100%] h-[8.6rem]">
                  <div className="w-full h-full bg-neutral-700/30 rounded-lg animate-pulse" />
                </div>
                <div className="bg-neutral-700/30 animate-pulse w-1/2 h-[24px] rounded-md mt-5" />
                <div className="mt-2 bg-neutral-700/30 animate-pulse w-full h-[96px] rounded-md" />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="py-20">
        <p className="text-3xl text-white font-semibold">Technologies I use</p>
        <p className="text-xl text-white/50 font-normal">The technologies I use are listed here.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 items-center mt-2">
          {_technologies ? (
            technologies ? (
              technologies.map((_, __) => (
                <div key={__} className="bg-neutral-800/20 p-4 hover:bg-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-shrink-0 w-[24px] h-[24px]">
                      <Image alt="clqu" src={_.src} className="" width="24" height="24" />
                    </div>
                    <p className="text-md font-semibold">{_.name}</p>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, __) => (
                <div key={__} className="bg-neutral-800/20 p-4 hover:bg-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-shrink-0 w-[36px] h-[36px]">
                      <div className="bg-neutral-700/30 w-[36px] h-[36px] rounded-md animate-pulse" />
                    </div>
                    <div className="bg-neutral-700/30 w-44 h-[36px] rounded-md animate-pulse" />
                  </div>
                </div>
              ))
            )
          ) : (
            Array.from({ length: 3 }).map((_, __) => (
              <div key={__} className="bg-neutral-800/20 p-4 hover:bg-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex-shrink-0 w-[36px] h-[36px]">
                    <div className="bg-neutral-700/30 w-[36px] h-[36px] rounded-md animate-pulse" />
                  </div>
                  <div className="bg-neutral-700/30 w-44 h-[36px] rounded-md animate-pulse" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="py-20">
        <p className="text-3xl text-white font-semibold">Repositories</p>
        <p className="text-xl text-white/50 font-normal">My open source codes on Github.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 items-center mt-2">
          {_repositories ? (
            repositories ? (
              repositories.sort((a, b) => b.stargazers_count - a.stargazers_count).map((_, __) => (
                <a key={__} href={`https://github.com/${_.full_name}`} target="_blank" rel="noreferrer" className="bg-neutral-800/20 p-4 hover:bg-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full">
                  <p className="text-md text-red-500">{_.full_name}</p>

                  <div className="flex justify-between w-full mt-2">
                    <p className="font-medium">Stars:</p>
                    <p>{_.stargazers_count}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="font-medium">Forks:</p>
                    <p>{_.forks}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="font-medium">Language:</p>
                    <p>{_.language}</p>
                  </div>
                </a>
              ))
            ) : (
              Array.from({ length: 3 }).map((_, __) => (
                <div key={__} className="bg-neutral-800/20 p-4 rounded-lg w-full">
                  <div className="bg-neutral-700/30 animate-pulse w-full h-[28px] rounded-md" />
                  <div className="flex justify-between w-full mt-2 space-x-4">
                    <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                    <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                  </div>
                  <div className="flex justify-between w-full mt-2 space-x-4">
                    <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                    <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                  </div>
                  <div className="flex justify-between w-full mt-2 space-x-4">
                    <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                    <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                  </div>
                </div>
              ))
            )
          ) : (
            Array.from({ length: 3 }).map((_, __) => (
              <div key={__} className="bg-neutral-800/20 p-4 rounded-lg w-full">
                <div className="bg-neutral-700/30 animate-pulse w-full h-[28px] rounded-md" />
                <div className="flex justify-between w-full mt-2 space-x-4">
                  <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                  <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                </div>
                <div className="flex justify-between w-full mt-2 space-x-4">
                  <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                  <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                </div>
                <div className="flex justify-between w-full mt-2 space-x-4">
                  <div className="bg-neutral-700/30 animate-pulse w-24 h-[24px] rounded-md" />
                  <div className="bg-neutral-700/30 animate-pulse w-12 h-[24px] rounded-md" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
