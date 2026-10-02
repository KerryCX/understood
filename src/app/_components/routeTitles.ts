// Names shown in the breadcrumb trail for each page.
// When you add a page, add its path and title here.
// Any page missing from this list falls back to a name made from its URL.
export const routeTitles: Record<string, string> = {
  "/problems": "Problems",
  "/problems/two-sum": "Two Sum",
  "/problems/group-anagrams": "Group Anagrams",
  "/problems/top-k-frequent-elements": "Top K Frequent Elements",
  "/problems/number-of-1-bits": "Number of 1 Bits",
  "/concepts": "Concepts",
  "/concepts/binary": "Binary",
  "/concepts/big-o": "Big O",
};

// "top-k-frequent-elements" becomes "Top k frequent elements"
export const titleFromSlug = (slug: string): string => {
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};
