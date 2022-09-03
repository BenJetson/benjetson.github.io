import { navItems, site } from "../lib/meta";
import Link from "next/link";

const Navbar = () => (
  <nav>
    <h1>
      <Link href={"/"}>
        <a>{site.title}</a>
      </Link>
    </h1>
    <ul>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
