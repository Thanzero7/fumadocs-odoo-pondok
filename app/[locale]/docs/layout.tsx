// app/[locale]/docs/layout.tsx
import { getSortedPageTree } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import SidebarStyle from '@/components/SidebarStyle';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { nav, ...base } = baseOptions();

  return (
    <DocsLayout
      // getSortedPageTree(locale) mengambil tree lalu menyortirnya berdasarkan frontmatter `order`.
      tree={getSortedPageTree(locale)}
      {...base}
      nav={{ ...nav, mode: "top" }}
      sidebar={{
        tabs: [
          {
            title: "Bahasa Indonesia",
            url: "/id/docs", // Pastikan format URL sesuai dengan route Next.js Anda
          },
          {
            title: "English",
            url: "/en/docs",
          },
        ],
      }}

    >
      {/* Inject runtime sidebar styles (client) to avoid build-time CSS parsing bugs */}
      <SidebarStyle />
      {children}
    </DocsLayout>
  );
}
