import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Card, Cards } from 'fumadocs-ui/components/card';
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
  ClipboardList
} from 'lucide-react';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Card,
    Cards,
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
    ...components,
  };
}
