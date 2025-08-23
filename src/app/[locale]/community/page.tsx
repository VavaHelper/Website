"use client"

import type React from "react"
import { useState } from "react"
import { Menu, Search, Globe, User, Home, Star, Bell, ChevronDown, ChevronRight, X } from "lucide-react"
import styles from "./community.module.css"
import { useRouter, usePathname } from "next/navigation";
import { language } from "../../../../constants/language"

export default function DashboardPage() {
    const [agentsExpanded, setAgentsExpanded] = useState(true)
    const [mapsExpanded, setMapsExpanded] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showLanguages, setShowLanguages] = useState(false)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

    const agents = ["Duan", "Neon", "Cline", "Fade"]
    const maps = ["Lotus", "Sunset", "Haven", "Breeze"]

    const contentCards = [
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "dQw4w9WgXcQ",
        },
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "9bZkp7q19f0",
        },
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "kJQP7kiw5Fk",
        },
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "L_jWHffIx5E",
        },
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "fJ9rUzIMcZQ",
        },
        {
        title: "Duan - Eliminate 4 - Breeze - Sunset",
        views: "2.5k views",
        date: "2024",
        videoId: "ZZ5LpwO-An4",
        },
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
        {mobileSearchOpen && (
            <div className={styles.mobileSearchOverlay}>
            <div className={styles.mobileSearchHeader}>
                <h2 className="text-lg font-semibold text-white">Search</h2>
                <button className={styles.button} onClick={() => setMobileSearchOpen(false)}>
                <X className="h-5 w-5" />
                </button>
            </div>
            <div className={styles.mobileSearchContent}>
                <form onSubmit={handleMobileSearch} className={styles.relative}>
                <input name="search" placeholder="Search videos..." className={styles.searchInput} autoFocus />
                <button type="submit" className={styles.searchButton}>
                    <Search className="h-4 w-4" />
                </button>
                </form>
            </div>
            </div>
        )}

        <header className={styles.header}>
            <div className={styles.headerLeft}>
            <button className={styles.button} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
            </button>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                <span className="text-white text-xs sm:text-sm font-bold">D</span>
                </div>
                <span className={styles.logoText}>VavaHelper</span>
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
            <button className={`${styles.button} ${styles.mdHidden}`} onClick={() => setMobileSearchOpen(true)}>
                <Search className="h-4 w-4" />
            </button>
            <div className={`${styles.relative} ${styles.smBlock} ${styles.hidden}`}>
                <button className={styles.button} onClick={toggleLanguages}>
                <Globe className="h-5 w-5 text-red-500" />
                </button>
                {showLanguages && (
                <ul className={styles.languageDropdown}>
                    <li onClick={() => changeLocale("en")} className={styles.languageItem}>
                    🇺🇸 English
                    </li>
                    <li onClick={() => changeLocale("pt")} className={styles.languageItem}>
                    🇧🇷 Português
                    </li>
                    <li onClick={() => changeLocale("es")} className={styles.languageItem}>
                    🇪🇸 Español
                    </li>
                    <li onClick={() => changeLocale("fr")} className={styles.languageItem}>
                    🇫🇷 Français
                    </li>
                    <li onClick={() => changeLocale("de")} className={styles.languageItem}>
                    🇩🇪 Deutsch
                    </li>
                    <li onClick={() => changeLocale("it")} className={styles.languageItem}>
                    🇮🇹 Italiano
                    </li>
                    <li onClick={() => changeLocale("zh")} className={styles.languageItem}>
                    🇨🇳 中文
                    </li>
                    <li onClick={() => changeLocale("ja")} className={styles.languageItem}>
                    🇯🇵 日本語
                    </li>
                    <li onClick={() => changeLocale("ko")} className={styles.languageItem}>
                    🇰🇷 한국어
                    </li>
                </ul>
                )}
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
                        {agents.map((agent) => (
                        <button key={agent} className={styles.navButton}>
                            <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
                            {agent}
                        </button>
                        ))}
                        <button className={`${styles.navButton} ${styles.navButtonSecondary}`}>
                        <ChevronDown className="h-3 w-3 mr-3" />
                        Show all
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
                        {maps.map((map) => (
                        <button key={map} className={styles.navButton}>
                            <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
                            {map}
                        </button>
                        ))}
                        <button className={`${styles.navButton} ${styles.navButtonSecondary}`}>
                        <ChevronDown className="h-3 w-3 mr-3" />
                        Show all
                        </button>
                    </div>
                    )}
                </div>
                </nav>
            </div>
            </aside>

            <main className={styles.main}>
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
