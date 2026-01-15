import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import * as Icons from 'lucide-react';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Resolve icon component from string or component
  let Icon = page.data.icon as any;
  if (typeof Icon === 'string') {
    // Map older names if necessary
    const iconMap: Record<string, string> = {
      'AlertCircle': 'CircleAlert',
      'AlertTriangle': 'TriangleAlert',
      'AlertOctagon': 'OctagonAlert',
      'CheckCircle': 'CircleCheck',
      'XCircle': 'CircleX',
      'HelpCircle': 'CircleHelp',
      'PlusCircle': 'CirclePlus',
      'MinusCircle': 'CircleMinus',
    };
    const mappedName = iconMap[Icon] || Icon;
    Icon = (Icons as any)[mappedName];
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {Icon && (
        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-fd-primary/10 p-3 text-fd-primary shadow-sm ring-1 ring-fd-primary/20">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
