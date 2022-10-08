import {
  FaDraftingCompass,
  FaEnvelope,
  FaFileAlt,
  FaHome,
  FaPenNib,
  FaUserCircle,
} from "react-icons/fa";

export const site = {
  title: "Ben's Realm",
  tagline: "The internet home for all of my personal projects and thoughts.",
};

export const personal = {
  avatar: "https://avatars1.githubusercontent.com/u/10427974?s=460&v=4",
};

class NavItem {
  constructor({ name, href, icon }) {
    this.name = name;
    this.href = href;
    this.icon = icon;
  }
}

export const navItems = [
  new NavItem({ name: "Home", href: "/", icon: FaHome }),
  new NavItem({ name: "About", href: "/about", icon: FaUserCircle }),
  new NavItem({ name: "Resumé", href: "/resume", icon: FaFileAlt }),
  new NavItem({ name: "Blog", href: "/blog", icon: FaPenNib }),
  new NavItem({ name: "Projects", href: "/projects", icon: FaDraftingCompass }),
  new NavItem({ name: "Contact", href: "/contact", icon: FaEnvelope }),
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
