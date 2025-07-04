import { useContext, useEffect } from "react"
import Store from "../context"

const ThemeMode = () => {
    const { themeMode, setThemeMode } = useContext(Store)

    const toggleThemeMode = () => {
        const newThemeMode = themeMode === 'dark' ? "light" : "dark"
        setThemeMode(newThemeMode)
        localStorage.setItem("themeMode", newThemeMode)
        document.body.classList.toggle("dark", newThemeMode === 'dark')
    }

    useEffect(() => {
        if (localStorage.getItem("themeMode")) {
            setThemeMode(localStorage.getItem("themeMode"))
            document.body.classList.add(localStorage.getItem("themeMode"))
        }
    }, [])

    return (
        <button className="w-10 h-10 grid place-items-center bg-white dark:bg-surface-dark border border-border dark:border-text-muted shadow-lg shadow-overlay-light dark:shadow-none hover:bg-overlay-light dark:hover:bg-text-muted" onClick={toggleThemeMode}>
            <img src={themeMode === 'light' ? "/images/Moon_fill.svg" : '/images/Sun_fill.svg'} alt="Light Mode Icon" />
        </button>
    )
}

export default ThemeMode