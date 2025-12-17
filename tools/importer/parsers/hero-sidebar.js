/* global WebImporter */

/**
 * Parser for hero-sidebar block
 *
 * Source: https://dcj.nsw.gov.au/
 * Base Block: hero
 *
 * Block Structure:
 * - Single row with all content in one column
 * - Contains: heading, intro paragraph, and sidebar with emergency contacts
 *
 * Source HTML Structure (from cleaned.html lines 4127-4159):
 * - Container: .nsw-hero-banner
 * - Content: .nsw-hero-banner__content (h1.headline-White, p.nsw-intro)
 * - Sidebar: .nsw-hero-banner__links with .nsw-hero-banner__sub-title and ul
 *
 * Generated: 2025-12-17
 */

export default function parse(element, { document }) {
  // Extract main heading
  // EXTRACTED: Found in cleaned.html line 4131: <h1 class="headline-White">
  const heading = element.querySelector('h1.headline-White') ||
                  element.querySelector('h1') ||
                  element.querySelector('[class*="headline"]');

  // Extract intro paragraph
  // EXTRACTED: Found in cleaned.html line 4132: <p class="nsw-intro">
  const intro = element.querySelector('p.nsw-intro') ||
                element.querySelector('.nsw-hero-banner__content p') ||
                element.querySelector('p');

  // Extract sidebar section
  // EXTRACTED: Found in cleaned.html line 4134-4151: .nsw-hero-banner__links structure
  const sidebarSection = element.querySelector('.nsw-hero-banner__links');

  let sidebarContent = '';
  if (sidebarSection) {
    // Extract sidebar title
    // EXTRACTED: Found in cleaned.html line 4136: .nsw-hero-banner__sub-title
    const sidebarTitle = sidebarSection.querySelector('.nsw-hero-banner__sub-title') ||
                         sidebarSection.querySelector('[class*="sub-title"]');

    // Extract emergency contact list
    // EXTRACTED: Found in cleaned.html lines 4137-4149: ul with li items containing links
    const contactList = sidebarSection.querySelector('ul');

    // Build sidebar content as a container div
    const sidebarDiv = document.createElement('div');

    if (sidebarTitle) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = sidebarTitle.textContent.trim();
      sidebarDiv.appendChild(titleEl);
      sidebarDiv.appendChild(document.createElement('br'));
      sidebarDiv.appendChild(document.createElement('br'));
    }

    if (contactList) {
      const listItems = contactList.querySelectorAll('li');
      listItems.forEach(li => {
        // Create list item text
        const itemDiv = document.createElement('div');
        itemDiv.textContent = '- ' + li.textContent.trim().replace(/\s+/g, ' ');
        sidebarDiv.appendChild(itemDiv);
      });
    }

    sidebarContent = sidebarDiv;
  }

  // Build cells array - single row with all content
  const cells = [
    [heading, intro, sidebarContent].filter(item => item)
  ];

  // Create block and replace element
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero-Sidebar',
    cells
  });

  element.replaceWith(block);
}
