import renderHTML from "react-render-html";
import DOMPurify from "dompurify";

export const cleanHtml = (html: string) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
  return renderHTML(cleanHtml);
};
