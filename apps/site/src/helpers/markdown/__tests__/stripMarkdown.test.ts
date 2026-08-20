import { describe, expect, it } from 'vitest'
import { stripMarkdown } from '../stripMarkdown'

describe('stripMarkdown', () => {
  it('returns plain text unchanged', () => {
    expect(stripMarkdown('Hello world')).toBe('Hello world')
  })

  it('strips headings', () => {
    expect(stripMarkdown('# Title')).toBe('Title')
    expect(stripMarkdown('### Subtitle')).toBe('Subtitle')
  })

  it('strips closing heading hashes', () => {
    expect(stripMarkdown('# Title #')).toBe('Title')
  })

  it('strips bold', () => {
    expect(stripMarkdown('**bold** text')).toBe('bold text')
    expect(stripMarkdown('__bold__ text')).toBe('bold text')
  })

  it('strips italic', () => {
    expect(stripMarkdown('*italic* text')).toBe('italic text')
    expect(stripMarkdown('_italic_ text')).toBe('italic text')
  })

  it('strips strikethrough', () => {
    expect(stripMarkdown('~~deleted~~ text')).toBe('deleted text')
  })

  it('strips inline code but keeps content', () => {
    expect(stripMarkdown('use `npm test` to run')).toBe('use npm test to run')
  })

  it('strips fenced code block fences but keeps content', () => {
    expect(stripMarkdown('```\ncode line\n```')).toBe('code line')
  })

  it('strips links but keeps the label', () => {
    expect(stripMarkdown('[NGC](https://nosgestesclimat.fr)')).toBe('NGC')
  })

  it('strips images but keeps the alt text', () => {
    expect(stripMarkdown('![logo](/logo.png)')).toBe('logo')
  })

  it('strips reference links but keeps the label', () => {
    expect(stripMarkdown('[NGC][1]')).toBe('NGC')
  })

  it('strips blockquote markers', () => {
    expect(stripMarkdown('> quoted line')).toBe('quoted line')
  })

  it('strips unordered list markers', () => {
    expect(stripMarkdown('- item')).toBe('item')
    expect(stripMarkdown('* item')).toBe('item')
    expect(stripMarkdown('+ item')).toBe('item')
  })

  it('strips ordered list markers', () => {
    expect(stripMarkdown('1. first')).toBe('first')
    expect(stripMarkdown('42. answer')).toBe('answer')
  })

  it('strips horizontal rules', () => {
    expect(stripMarkdown('before\n---\nafter')).toBe('before\n\nafter')
  })

  it('strips raw HTML tags', () => {
    expect(stripMarkdown('<strong>bold</strong>')).toBe('bold')
  })

  it('handles a mixed document', () => {
    const md = [
      '# Heading',
      '',
      'A paragraph with **bold** and *italic* and a [link](https://example.com).',
      '',
      '> A quote',
      '',
      '- list item',
      '1. ordered item',
      '',
      '```js',
      'const x = 1',
      '```',
    ].join('\n')

    const expected = [
      'Heading',
      '',
      'A paragraph with bold and italic and a link.',
      '',
      'A quote',
      '',
      'list item',
      'ordered item',
      '',
      'const x = 1',
    ].join('\n')

    expect(stripMarkdown(md)).toBe(expected)
  })
})
