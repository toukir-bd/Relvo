export const CONTACT_MODAL_EVENT = "relvo:open-contact-modal";

export function openContactModal(
  initialSelectedServices: string[] = [],
  options: { aiServices?: boolean; questionInquiry?: boolean } = {},
) {
  window.dispatchEvent(
    new CustomEvent(CONTACT_MODAL_EVENT, {
      detail: { initialSelectedServices, ...options },
    }),
  );
}
