function Header() {
    return (
        <div className="p-4 justify-items-center">
            <div className="flex justify-between items-center">
                <nav>
                    <ul className="flex gap-4 text-white">
                        <li><a href="/" className="text-white hover:underline">Home</a></li>
                        <li><a href="/" className="text-white hover:underline">About</a></li>
                        <li><a href="/" className="text-white hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;