/* global WebImporter */

/**
 * Parser for columns-promo block
 *
 * Source: https://dcj.nsw.gov.au/
 * Base Block: columns
 *
 * Block Structure:
 * - Single row with 2 columns
 * - First column: text content (heading, paragraph, link)
 * - Second column: image
 *
 * Source HTML Structure (from cleaned.html lines 4296-4331):
 * - Container: .nsw-grid with two .nsw-col divs
 * - Left column: h3, p, a.nsw-button
 * - Right column: img
 *
 * Generated: 2025-12-17
 */

export default function parse(element, { document }) {
  // Find the two column divs
  // EXTRACTED: Found in cleaned.html lines 4297-4330: .nsw-col elements
  const columns = Array.from(
    element.querySelectorAll('.nsw-col') ||
    element.querySelectorAll('[class*="col"]') ||
    element.querySelectorAll(':scope > div')
  );

  let leftColumn = null;
  let rightColumn = null;

  // Process each column
  columns.forEach(col => {
    // Check if column contains an image
    const img = col.querySelector('img');
    if (img) {
      rightColumn = img;
    } else {
      // Text column - extract all content
      const heading = col.querySelector('h3') || col.querySelector('h2, h4');
      const paragraph = col.querySelector('p');
      const link = col.querySelector('a.nsw-button') ||
                   col.querySelector('a') ||
                   col.querySelector('button');

      // Build left column content container
      const contentDiv = document.createElement('div');
      if (heading) contentDiv.appendChild(heading.cloneNode(true));
      if (paragraph) contentDiv.appendChild(paragraph.cloneNode(true));
      if (link) contentDiv.appendChild(link.cloneNode(true));

      leftColumn = contentDiv;
    }
  });

  // Build cells array - single row with 2 columns
  const cells = [
    [leftColumn, rightColumn].filter(item => item)
  ];

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Promo',
    cells
  });

  element.replaceWith(block);
}
