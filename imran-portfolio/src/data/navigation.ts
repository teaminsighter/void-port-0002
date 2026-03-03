export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#projects' },
  { label: 'Skills', href: '/#tech-stack' },
  { label: 'Contact', href: '/#contact' },
];

export const mobileNavLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#projects' },
  { label: 'Skills', href: '/#tech-stack' },
  { label: 'Contact', href: '/#contact' },
];
