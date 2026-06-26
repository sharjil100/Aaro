import { hashIndex } from "./utils";

/* ----------------------------------------------------------------------------
   Lively imagery for Phase 0. We pull free, keyword-relevant photos from
   loremflickr (primary) with a picsum fallback, keyed deterministically by a
   seed so each card stays stable. In Phase 1 these are replaced by real
   product/seller images from Cloudflare R2.
---------------------------------------------------------------------------- */

const categoryKeyword: Record<string, string> = {
  fashion: "fashion,clothing",
  beauty: "cosmetics,skincare",
  gadgets: "gadget,electronics",
  "home-lifestyle": "home,interior",
  accessories: "accessory,watch",
  kids: "children,clothing",
  grocery: "grocery,food",
  sports: "fitness,sport",
};

export function productKeyword(categorySlug: string): string {
  return categoryKeyword[categorySlug] ?? "product";
}

export const SHOP_KEYWORD = "boutique,store";

/** Relevant keyword photo (primary source). */
export function loremflickrUrl(query: string, seed: string, size = 600): string {
  const lock = hashIndex(seed, 100000);
  return `https://loremflickr.com/${size}/${size}/${query}?lock=${lock}`;
}

/** Reliable generic photo (fallback source). */
export function picsumUrl(seed: string, size = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${size}/${size}`;
}
