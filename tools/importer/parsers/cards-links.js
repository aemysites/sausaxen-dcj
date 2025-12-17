/* global WebImporter */

/**
 * Parser for cards-links block
 *
 * Source: https://dcj.nsw.gov.au/
 * Base Block: cards
 *
 * Block Structure:
 * - Each link becomes a row with 1 column containing the link
 * - No images, just link text
 *
 * Source HTML Structure (from cleaned.html lines 4229-4262):
 * - Container: .button-link-list
 * - Title: h2.buttonlinklist-title (not part of block, default content before)
 * - List: ul.buttonlinklist with li > a.buttonlinklist-link
 *
 * Generated: 2025-12-17
 */

export default function parse(element, { document }) {
  // Extract all link items
  // EXTRACTED: Found in cleaned.html lines 4233-4262: ul.buttonlinklist with li > a
  const links = Array.from(
    element.querySelectorAll('ul.buttonlinklist a.buttonlinklist-link') ||
    element.querySelectorAll('.button-link-list a') ||
    element.querySelectorAll('ul.nsw-list a') ||
    element.querySelectorAll('a')
  );

  // Build cells array - each link becomes a row
  const cells = links.map(link => {
    // Clean up link text (remove external site indicators)
    const linkClone = link.cloneNode(true);

    // Remove screen reader only text and icons
    // EXTRACTED: Found in cleaned.html lines 4244-4245, 4258-4259: .sr-only and .is-external__icon
    const srOnly = linkClone.querySelectorAll('.sr-only, .material-icons');
    srOnly.forEach(el => el.remove());

    return [linkClone];
  });

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Links',
    cells
  });

  element.replaceWith(block);
}
