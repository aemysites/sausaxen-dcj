/* global WebImporter */

/**
 * Parser for cards-feature block
 *
 * Source: https://dcj.nsw.gov.au/
 * Base Block: cards
 *
 * Block Structure:
 * - Each card becomes a row with 2 columns
 * - First column: image
 * - Second column: heading/link, description text
 *
 * Source HTML Structure (from cleaned.html lines 4362-4395):
 * - Container: .nsw-grid with .nsw-col divs containing .nsw-card
 * - Each card has .nsw-card__image (img) and .nsw-card__content (title link, copy text)
 *
 * Generated: 2025-12-17
 */

export default function parse(element, { document }) {
  // Extract all cards
  // EXTRACTED: Found in cleaned.html lines 4365-4392: .nsw-card elements
  const cards = Array.from(
    element.querySelectorAll('.nsw-card') ||
    element.querySelectorAll('[class*="card"]')
  );

  // Build cells array - each card becomes a row with 2 columns
  const cells = cards.map(card => {
    // Extract image
    // EXTRACTED: Found in cleaned.html line 4367: .nsw-card__image img
    const img = card.querySelector('.nsw-card__image img') ||
                card.querySelector('img');

    // Extract title/link
    // EXTRACTED: Found in cleaned.html line 4371: .nsw-card__title a
    const titleLink = card.querySelector('.nsw-card__title a') ||
                      card.querySelector('.nsw-card__title') ||
                      card.querySelector('[class*="title"] a') ||
                      card.querySelector('a');

    // Extract description
    // EXTRACTED: Found in cleaned.html line 4373: .nsw-card__copy
    const description = card.querySelector('.nsw-card__copy') ||
                        card.querySelector('[class*="copy"]') ||
                        card.querySelector('p');

    // Build content column
    const contentDiv = document.createElement('div');

    if (titleLink) {
      // Clean up external site indicators
      const linkClone = titleLink.cloneNode(true);
      const srOnly = linkClone.querySelectorAll('.sr-only, .material-icons');
      srOnly.forEach(el => el.remove());

      const heading = document.createElement('h3');
      heading.appendChild(linkClone);
      contentDiv.appendChild(heading);
    }

    if (description) {
      contentDiv.appendChild(description.cloneNode(true));
    }

    // Return row with 2 columns: [image, content]
    return [img, contentDiv];
  }).filter(row => row[0] || row[1]); // Only include rows with content

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Feature',
    cells
  });

  element.replaceWith(block);
}
