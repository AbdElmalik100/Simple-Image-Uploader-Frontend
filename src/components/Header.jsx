import Logo from "./Logo"
import ThemeMode from "./ThemeMode"


const Header = () => {

    return (
        <header className='py-6 border-b border-border dark:border-surface-dark'>
            <div className="container flex items-center justify-between gap-4">
                <Logo />
                <ThemeMode />
            </div>
        </header>
    )
}

export default Header