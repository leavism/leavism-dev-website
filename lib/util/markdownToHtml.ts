import type { VFileCompatible } from 'vfile'
import { remark } from 'remark'
import html from 'remark-html'
import remarkImages from 'remark-images'
import remarkGfm from 'remark-gfm'


// TODO Replace remark with react-markdown
export default async function markdownToHtml(markdown: VFileCompatible) {
  const result = await remark()
    .use(html)
    .use(remarkImages)
    .use(remarkGfm)
    .process(markdown)
  return result.toString()
}
