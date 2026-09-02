import DOMPurify from 'dompurify';

// Perfil HTML: es lo que generan react-quill / CKEditor y lo que muestra el portal.
// Debe ser compatible con la lista de etiquetas que el backend permite en
// muniweb_back/muniweb_backend/sanitize.py (doble capa: servidor + cliente).
const CONFIG = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ['target', 'dir', 'class', 'style'],
  FORBID_TAGS: ['form', 'input', 'iframe', 'object', 'embed', 'style', 'script'],
  FORBID_ATTR: ['srcdoc'],
};

// Enlaces con target="_blank" siempre con rel noopener (igual que el backend).
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.target === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

export const sanitizeHtml = (html) => DOMPurify.sanitize(html ?? '', CONFIG);
