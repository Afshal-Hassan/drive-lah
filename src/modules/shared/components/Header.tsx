import List from "./List";

function Hamburger() {
  return (
    <button className="header__hamburger" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

function Logo() {
  return (
    <div className="header__logo">
      <a href="/" className="header__logo-link" aria-label="Drive lah">
        <img
          loading="eager"
          decoding="async"
          className="header__logo-icon"
          src="https://www.drivelah.sg/static/media/newLogo.17a5a13f.png"
          alt="Drive lah"
        />
      </a>
    </div>
  );
}

function NavLinks() {
  const navItems: {
    label: string;
    href: string;
  }[] = [
    { label: "Learn more", href: "#learn-more" },
    { label: "List your car", href: "#list-car" },
    { label: "Inbox", href: "#inbox" },
  ];

  return (
    <List
      items={navItems}
      renderItem={(item) => (
        <a key={item.href} href={item.href} className="header__nav-link">
          {item.label}
        </a>
      )}
    />
  );
}

function ProfilePic() {
  return (
    <button className="header__profile" aria-label="Profile Pic">
      <img
        loading="lazy"
        decoding="async"
        alt="Profile Pic"
        className="header__profile-img"
        src="https://picsum.photos/50/50"
      />
    </button>
  );
}

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Hamburger />
        <Logo />
        <nav className="header__nav" aria-label="Navigation">
          <NavLinks />
          <ProfilePic />
        </nav>
      </div>
    </header>
  );
}
