export const site = {
  title: "Ben's Realm",
  tagline: "The internet home for all of my personal projects and thoughts.",
};

export const personal = {
  avatar: "https://avatars1.githubusercontent.com/u/10427974?s=460&v=4",
};

class NavItem {
  constructor({ name, href }) {
    this.name = name;
    this.href = href;
  }
}

export const navItems = [
  new NavItem({ name: "Home", href: "/" }),
  new NavItem({ name: "About", href: "/about" }),
  new NavItem({ name: "Resumé", href: "/resume" }),
  new NavItem({ name: "Blog", href: "/blog" }),
  new NavItem({ name: "Projects", href: "/projects" }),
  new NavItem({ name: "Contact", href: "/contact" }),
];

class SocialProvider {
  constructor({ name, urlPrefix, username }) {
    this.name = name;
    this.url = urlPrefix + username;
    this.username = username;
  }
}

export const socials = {
  twitter: new SocialProvider({
    name: "Twitter",
    urlPrefix: "https://twitter.com/",
    username: "BenJetson",
  }),
  instagram: new SocialProvider({
    name: "Instagram",
    urlPrefix: "https://instagram.com/",
    username: "bfgodfr",
  }),
  github: new SocialProvider({
    name: "GitHub",
    urlPrefix: "https://github.com/",
    username: "BenJetson",
  }),
  linkedin: new SocialProvider({
    name: "LinkedIn",
    urlPrefix: "https://linkedin.com/in/",
    username: "bfgodfrey",
  }),
};
