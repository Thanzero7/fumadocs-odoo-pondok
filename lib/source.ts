import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}

function extractOrder(node: any) {
  // try multiple potential locations for an order/weight field
  if (!node) return undefined;
  const page = node.page || node;
  return (
    page?.data?.order ??
    page?.data?.weight ??
    page?.data?.meta?.order ??
    page?.data?.frontmatter?.order ??
    page?.order
  );
}

function sortTreeRecursive(node: any) {
  if (!node || !Array.isArray(node.children)) return node;

  node.children.sort((a: any, b: any) => {
    const ao = extractOrder(a);
    const bo = extractOrder(b);

    if (ao != null && bo != null) return Number(ao) - Number(bo);
    if (ao != null) return -1;
    if (bo != null) return 1;

    // fallback to title or path
    const at = a?.page?.data?.title ?? a?.title ?? a?.name ?? '';
    const bt = b?.page?.data?.title ?? b?.title ?? b?.name ?? '';
    return String(at).localeCompare(String(bt));
  });

  for (const child of node.children) sortTreeRecursive(child);

  return node;
}

export function getSortedPageTree(locale: string) {
  const tree = (source as any).getPageTree(locale);

  if (tree && typeof (tree as any).then === 'function') {
    return (tree as Promise<any>).then((t) => sortTreeRecursive(t));
  }

  return sortTreeRecursive(tree);
}
