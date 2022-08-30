import { navItems, site } from "../lib/meta";
import Link from "next/link";

const Navbar = () => (
  <nav>
    <h1>
      <Link href={"/"}>{site.title}</Link>
    </h1>
    <ul>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
