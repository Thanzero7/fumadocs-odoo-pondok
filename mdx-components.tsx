import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Card, Cards } from 'fumadocs-ui/components/card';
import Link from 'next/link';
import {
  LayoutDashboard,
  Monitor,
  Album,
  Database,
  Activity,
  FileText,
  History,
  UserCheck,
  Settings,
  Wrench,
  Home,
  BookOpen,
  CreditCard,
  Box,
  ClipboardList,
  ChevronRight,
  CircleHelp,
  ShieldCheck,
  GraduationCap,
  Users
} from 'lucide-react';

const CardButton = ({ href, icon, children }: { href: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group flex items-center justify-between rounded-lg border border-fd-border bg-fd-card p-3 text-sm font-medium transition-all hover:border-fd-primary hover:bg-fd-primary/5 hover:text-fd-primary no-underline!"
  >
    <div className="flex items-center gap-2.5">
      {icon && <div className="text-fd-muted-foreground group-hover:text-fd-primary transition-colors [&_svg]:size-[18px]">{icon}</div>}
      <span>{children}</span>
    </div>
    <ChevronRight size={16} className="text-fd-muted-foreground group-hover:text-fd-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
  </Link>
);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Card,
    Cards,
    CardButton,
    LayoutDashboard,
    Monitor,
    Album,
    Database,
    Activity,
    FileText,
    History,
    UserCheck,
    Settings,
    Wrench,
    Home,
    BookOpen,
    CreditCard,
    Box,
    ClipboardList,
    ChevronRight,
    CircleHelp,
    ShieldCheck,
    GraduationCap,
    Users,
    ...components,
  };
}
