"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Menu, Search, User, Home, Star, Bell, ChevronDown, ChevronRight } from "lucide-react"
import styles from "../../community/community.module.css"
import { LanguageSelector } from "@/app/components/languageSelector"
import Image from "next/image"

export default function VideoPage() {

  const router = useRouter();

  const { videoId } = useParams()

  const [agentsExpanded, setAgentsExpanded] = useState(true)
  const [mapsExpanded, setMapsExpanded] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [agentsShowingAll, setAgentsShowingAll] = useState(false)
  const [mapsShowingAll, setMapsShowingAll] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mobileSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mobileSearchOpen])

  return (
    <div className={styles.container}>
      {/* 🔹 Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.button} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </button>
          <div onClick={() => router.push("/community")} className={styles.logo} style={{ cursor: "pointer" }}>
            <div className={styles.logoIcon}>
              <Image
                src="/imgs/favicon.png"
                alt="login"
                width={500}
                height={400}
                className={styles.backgroundImg}
              />
            </div>
            <span className={styles.logoText}>avaHelper</span>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input placeholder="Search..." className={styles.searchInput} />
            <button className={styles.searchButton}>
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              console.log("Searching for:", formData.get("search"))
              setMobileSearchOpen(false)
            }}
            className="flex items-center ml-auto md:hidden"
          >
            <div
              className={`flex items-center overflow-hidden transition-all duration-300 ${
                mobileSearchOpen ? "w-40 opacity-100 mr-2" : "w-0 opacity-0"
              }`}
            >
              <input
                ref={inputRef}
                name="search"
                placeholder="Search..."
                className="bg-gray-800 text-white text-sm px-2 py-1 rounded-md w-full focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-700 transition"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
          </form>

          <div className={`${styles.relative} ${styles.smBlock} ${styles.hidden}`}>
            <LanguageSelector />
          </div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
        </div>
      </header>

      {/* 🔹 Sidebar + Conteúdo */}
      <div className="flex relative">
        {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
          <div className={styles.sidebarContent}>
            <nav className={styles.nav}>
              <button onClick={() => router.push("/community")} className={styles.navButton}>
                <Home className={styles.navIcon} />
                Home
              </button>
              <button className={styles.navButton}>
                <Star className={styles.navIcon} />
                Favorites
              </button>
              <button className={`${styles.navButton} ${styles.relative}`}>
                <Bell className={styles.navIcon} />
                Notifications
                <div className="absolute right-3 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Agents */}
              <div className="pt-4">
                <button
                  className={`${styles.navButton} ${styles.navButtonSecondary} mb-2`}
                  onClick={() => setAgentsExpanded(!agentsExpanded)}
                >
                  {agentsExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  Agents
                </button>
                {agentsExpanded && (
                  <div className="ml-6 space-y-1">
                    <button
                      type="button"
                      className={`${styles.navButton} ${styles.navButtonSecondary}`}
                      onClick={() => setAgentsShowingAll(!agentsShowingAll)}
                    >
                      <ChevronDown
                        className="h-3 w-3 mr-3"
                        style={{
                          transform: agentsShowingAll ? "rotate(180deg)" : "none",
                          transition: "transform 0.18s ease",
                        }}
                      />
                      {agentsShowingAll ? "Show less" : "Show all"}
                    </button>
                  </div>
                )}
              </div>

              {/* Maps */}
              <div className="pt-4">
                <button
                  className={`${styles.navButton} ${styles.navButtonSecondary} mb-2`}
                  onClick={() => setMapsExpanded(!mapsExpanded)}
                >
                  {mapsExpanded ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  Maps
                </button>
                {mapsExpanded && (
                  <div className="ml-6 space-y-1">
                    <button
                      type="button"
                      className={`${styles.navButton} ${styles.navButtonSecondary}`}
                      onClick={() => setMapsShowingAll(!mapsShowingAll)}
                    >
                      <ChevronDown
                        className="h-3 w-3 mr-3"
                        style={{
                          transform: mapsShowingAll ? "rotate(180deg)" : "none",
                          transition: "transform 0.18s ease",
                        }}
                      />
                      {mapsShowingAll ? "Show less" : "Show all"}
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </aside>

        {/* 🔹 Conteúdo principal (vídeo + comentários) */}
        <main className={styles.main}>
          <div className="flex flex-col max-w-4xl mx-auto p-4 space-y-6">
            {/* Player */}
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Comentários */}
            <div>
              <h2 className="text-xl font-bold">Comentários</h2>
              <form className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Escreva um comentário..."
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Enviar
                </button>
              </form>

              <div className="mt-4 space-y-3">
                <div className="border-b pb-2">
                  <p className="font-semibold">Usuário1</p>
                  <p>Gostei muito desse spot 👌</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Usuário2</p>
                  <p>Funcionou perfeito em ranked!</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
