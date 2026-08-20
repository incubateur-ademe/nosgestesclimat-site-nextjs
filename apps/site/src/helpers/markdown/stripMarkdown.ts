/**
 * Strips basic markdown syntax from a string, returning plain text.
 *
 * Handles headings, bold/italic, strikethrough, inline code and fenced
 * code blocks, links and images, blockquotes, list markers, horizontal
 * rules and raw HTML tags. It is intentionally lightweight: it does not
 * parse markdown, only removes the common delimiter characters.
 */
export function stripMarkdown(input: string): string {
  return (
    input
      // Fenced code blocks (``` or ~~~), keeping their content. The opening
      // fence may carry a language identifier (e.g. ```js) which is dropped.
      .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, (block) =>
        block
          .replace(/^(```+|~~~+)[^\n]*\n/, '')
          .replace(/\n(```+|~~~+)[^\n]*$/, '')
          .trim()
      )
      // Images: ![alt](url) -> alt
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      // Links: [text](url) -> text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // Reference links: [text][ref] -> text
      .replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1')
      // Headings: leading #'s and trailing '#''s.
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\s+#+\s*$/gm, '')
      // Bold: **text** or __text__
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      // Italic: *text* or _text_
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Strikethrough: ~~text~~
      .replace(/~~([^~]+)~~/g, '$1')
      // Inline code: `text`
      .replace(/`([^`]+)`/g, '$1')
      // Blockquotes: leading '> '
      .replace(/^>\s?/gm, '')
      // Unordered list markers: '- ', '* ', '+ '
      .replace(/^[-*+]\s+/gm, '')
      // Ordered list markers: '1. '
      .replace(/^\d+\.\s+/gm, '')
      // Horizontal rules: ---, ***, ___ on their own line
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Raw HTML tags
      .replace(/<[^>]+>/g, '')
      // Collapse whitespace left behind by removed markers.
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}
