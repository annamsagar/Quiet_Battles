import { useEffect } from 'react';

/**
 * Update document title dynamically with brand suffix
 * @param {string} title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const brandName = 'QUIET BATTLES™';
    if (title) {
      document.title = `${title} | ${brandName}`;
    } else {
      document.title = `${brandName} | WEAR YOUR BATTLES`;
    }
  }, [title]);
}
