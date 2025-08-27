"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Menu, Search, User, Home, Star, Bell, ChevronDown, ChevronRight } from "lucide-react"
import styles from "./community.module.css"
import { useRouter, usePathname } from "next/navigation";
import { language } from "../../../../constants/language"
import { LanguageSelector } from "@/app/components/languageSelector"
import Image from 'next/image';
import MapSelector from "@/app/components/mapSelector"

export default function DashboardPage() {
    const [agentsExpanded, setAgentsExpanded] = useState(true)
    const [mapsExpanded, setMapsExpanded] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showLanguages, setShowLanguages] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

    // new states for "Show all"
    const [agentsShowingAll, setAgentsShowingAll] = useState(false)
    const [mapsShowingAll, setMapsShowingAll] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (mobileSearchOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [mobileSearchOpen])

    // show a short list by default
    const agents = ["Duan", "Neon"]
    // full lists (for "Show all")
    const allAgents = ["Duan", "Neon", "Cline", "Fade", "Omen", "Viper", "Sova", "Jett"]

    const maps = ["Lotus", "Sunset"]
    const allMaps = ["Lotus", "Sunset", "Haven", "Breeze", "Ascent", "Split", "Bind", "Icebox"]

    const contentCards = [
        { title: "Omen - Bombsite A - Breeze", views: "2.5k views", date: "2024", videoId: "dQw4w9WgXcQ" },
        { title: "Omen - Bombsite C - Haven", views: "2.5k views", date: "2024", videoId: "9bZkp7q19f0" },
        { title: "Omen - Bombsite B - Sunset", views: "2.5k views", date: "2024", videoId: "kJQP7kiw5Fk" },
        { title: "Omen - Bombsite A - Breeze - Sunset", views: "2.5k views", date: "2024", videoId: "L_jWHffIx5E" },
        { title: "Omen - Bombsite A - Breeze - Sunset", views: "2.5k views", date: "2024", videoId: "fJ9rUzIMcZQ" },
        { title: "Omen - Bombsite C - Lotus - Sunset", views: "2.5k views", date: "2024", videoId: "ZZ5LpwO-An4" },
    ]

    const router = useRouter();
    const pathname = usePathname();
    const supportedLocales = language;

    const toggleLanguages = () => {
        setShowLanguages(!showLanguages)
    }

    const changeLocale = (locale: string) => {
        const segments = pathname.split('/').filter(Boolean);
        const isLocale = supportedLocales.includes(segments[0]);
        const restOfPath = isLocale ? segments.slice(1) : segments;
        const newPath = `/${locale}/${restOfPath.join('/')}`;
        router.replace(newPath);
        setShowLanguages(false);
    };

    const handleMobileSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchTerm = formData.get("search") as string
        console.log("Searching for:", searchTerm)
        setMobileSearchOpen(false)
    }

    return (
        <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.headerLeft}>
            <button className={styles.button} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
            </button>
            <div className={styles.logo}>
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

            {/* Desktop search */}
            <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
                <input placeholder="Search..." className={styles.searchInput} />
                <button className={styles.searchButton}>
                <Search className="h-4 w-4" />
                </button>
            </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1 sm:gap-2">
                {/* 🔹 Mobile search animado */}
                {/* SEARCH MOBILE */}
                <form
                onSubmit={handleMobileSearch}
                className="flex items-center ml-auto md:hidden"
                >
                    {/* container do input */}
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

                    {/* botão de abrir/fechar */}
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

        <div className="flex relative">
            {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
            <div className={styles.sidebarContent}>
                <nav className={styles.nav}>
                <button className={styles.navButton}>
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
                        {(agentsShowingAll ? allAgents : agents).map((agent) => (
                        <button key={agent} className={styles.navButton}>
                            <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
                            {agent}
                        </button>
                        ))}
                        <button
                          type="button"
                          className={`${styles.navButton} ${styles.navButtonSecondary}`}
                          onClick={() => setAgentsShowingAll(!agentsShowingAll)}
                        >
                          <ChevronDown
                            className="h-3 w-3 mr-3"
                            // rotate visually to indicate toggle; inline style works without Tailwind
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

                <div className="pt-4">
                    <button
                    className={`${styles.navButton} ${styles.navButtonSecondary} mb-2`}
                    onClick={() => setMapsExpanded(!mapsExpanded)}
                    >
                    {mapsExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                    Maps
                    </button>
                    {mapsExpanded && (
                    <div className="ml-6 space-y-1">
                        {(mapsShowingAll ? allMaps : maps).map((map) => (
                        <button key={map} className={styles.navButton}>
                            <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
                            {map}
                        </button>
                        ))}
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

            <main className={styles.main}>
            <MapSelector/>
            <div className={`${styles.grid} ${sidebarOpen ? "" : styles.gridExpanded}`}>
                {contentCards.map((card, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.aspectVideo}>
                    <iframe
                        src={`https://www.youtube.com/embed/${card.videoId}`}
                        title={card.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    </div>
                    <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.avatar}>
                            <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <div className={`${styles.flex1} ${styles.minW0}`}>
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <p className={styles.cardMeta}>
                            {card.views} • {card.date}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </main>
        </div>
        </div>
    )
}
