/* global WebImporter */

/**
 * Transformer for DCJ (Department of Communities and Justice) website cleanup
 * Purpose: Remove translation widgets, tracking elements, and non-content components
 * Applies to: dcj.nsw.gov.au (all templates)
 * Generated: 2025-12-17
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow for https://dcj.nsw.gov.au/
 * - cleaned.html file analyzed in migration-work directory
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove Google Translate widget
    // EXTRACTED: Found in cleaned.html line 2: <div class="skiptranslate">
    // EXTRACTED: Found in cleaned.html line 3: <iframe id=":1.container" class="VIpgJd-ZVi9od-ORHb-OEVmcd skiptranslate">
    // EXTRACTED: Found in cleaned.html line 129: <div class="skiptranslate goog-te-gadget">
    WebImporter.DOMUtils.remove(element, [
      '.skiptranslate',
      '.goog-te-gadget',
      'iframe.VIpgJd-ZVi9od-ORHb-OEVmcd'
    ]);

    // Remove ReadSpeaker widget
    // EXTRACTED: Found in cleaned.html line 56: <div id="readspeaker_button1">
    // EXTRACTED: Found in cleaned.html line 55: <div id="listenbutton">
    WebImporter.DOMUtils.remove(element, [
      '#listenbutton',
      '#readspeaker_button1',
      '.rs_skip',
      '.rsbtn'
    ]);

    // Remove skip links (navigation aid, not content)
    // EXTRACTED: Found in cleaned.html line 10: <div class="skiplink-container">
    WebImporter.DOMUtils.remove(element, [
      '.skiplink-container',
      '.skiplink'
    ]);

    // Remove quick exit functionality
    // EXTRACTED: Found in cleaned.html line 28: <div class="quick-exit">
    WebImporter.DOMUtils.remove(element, [
      '.quick-exit'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove all iframes (embeds, tracking, reCAPTCHA)
    // EXTRACTED: Found multiple iframes in cleaned.html (lines 3, 4792-4799)
    WebImporter.DOMUtils.remove(element, [
      'iframe'
    ]);

    // Remove noindex comments and their containers
    // Standard HTML cleanup - noscript, link elements
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link'
    ]);

    // Clean up AEM-specific classes that shouldn't be in final output
    // EXTRACTED: Found throughout cleaned.html - AEM Grid classes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      // Remove AEM authoring classes
      if (el.className && typeof el.className === 'string') {
        el.className = el.className
          .replace(/aem-Grid[^\s]*/g, '')
          .replace(/aem-GridColumn[^\s]*/g, '')
          .replace(/responsivegrid/g, '')
          .trim();

        if (el.className === '') {
          el.removeAttribute('class');
        }
      }
    });
  }
}
