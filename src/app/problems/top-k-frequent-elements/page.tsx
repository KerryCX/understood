import styles from "./page.module.css";

const sortSolution = `function topKBySortRefined(nums, k) {
  const countOf = new Map();
  nums.forEach((n) => {
    countOf.set(n, (countOf.get(n) ?? 0) + 1);
  });

  return [...countOf]
    .sort((pairA, pairB) => pairB[1] - pairA[1])
    .slice(0, k)
    .map((pair) => pair[0]);
}`;

const bucketSolution = `function topKBucketSort(nums, k) {
  const countOf = new Map();
  nums.forEach((n) => {
    countOf.set(n, (countOf.get(n) ?? 0) + 1);
  });

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  countOf.forEach((count, num) => {
    buckets[count].push(num);
  });

  const result = [];
  for (let i = buckets.length - 1; i > 0; i--) {
    result.push(...buckets[i]);
    if (result.length === k) {
      return result;
    }
  }
  return result;
}`;

export default function TopKFrequentElementsPage() {
  return (
    <main className='page'>
      <h1>Top K Frequent Elements</h1>
      <div className='tags'>
        <div className='tag tagMedium'>Medium</div>
        <div className='tag tagHashMap'>Hash Map</div>
        <div className='tag tagArray'>Array</div>
      </div>

      <section className={styles.problemCard} aria-labelledby='problem'>
        <h2 id='problem' className={styles.sectionLabel}>
          The Problem
        </h2>
        <p>
          Given an array of numbers and a number k, return the k numbers that
          appear most often. The answer can be in any order.
        </p>
        <p>
          <strong>Example:</strong> nums = [1, 1, 1, 2, 2, 3], k = 2 → [1, 2]
        </p>
        <p>
          <strong>Constraints:</strong> up to 100,000 numbers, which can be
          negative. k is between 1 and the number of unique values, and the
          answer is guaranteed to be unique.
        </p>
        <p>
          <strong>Follow-up:</strong> can you do better than O(n log n)?
        </p>
        <a
          href='https://leetcode.com/problems/top-k-frequent-elements/'
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          View on LeetCode
        </a>
      </section>

      <section className={styles.problemCard} aria-labelledby='big-idea'>
        <h2 id='big-idea' className={styles.sectionLabel}>
          The Big Idea
        </h2>
        <p>
          There are two steps: count how often each number appears, then pick
          out the k biggest counts.
        </p>
        <p>
          Counting is the same pattern as Group Anagrams: a hash map where the
          key is the number and the value is how many times I&apos;ve seen it.
          The interesting part is the second step, and how to get the top k
          without sorting.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='sort'>
        <h2 id='sort' className={styles.sectionLabel}>
          Solution 1: Count, then sort
        </h2>
        <h3 className={styles.solutionTitle}>Map of counts, sorted by count</h3>
        <p className={styles.complexity}>Time: O(n log n)</p>
        <pre className={styles.code} tabIndex={0} aria-label='Count and sort solution code'>
          <code>{sortSolution}</code>
        </pre>
        <p>
          A Map can&apos;t be sorted, so I spread it into an array of{" "}
          <code className={styles.inlineCode}>[number, count]</code> pairs and
          sort by index 1, highest first. Then I keep the first k pairs and turn
          each one into just the number.
        </p>
        <p>
          My first version mapped every pair and then sliced. Slicing first
          means <code className={styles.inlineCode}>map()</code> only does k
          items. Counting is O(n), but the sort is the expensive part, so it
          sets the Big O.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='follow-up'>
        <h2 id='follow-up' className={styles.sectionLabel}>
          Follow-up: Can you do better than O(n log n)?
        </h2>
        <h3 className={styles.solutionTitle}>Bucket sort</h3>
        <p className={styles.complexity}>Time: O(n)</p>
        <pre className={styles.code} tabIndex={0} aria-label='Bucket sort solution code'>
          <code>{bucketSolution}</code>
        </pre>
        <p>
          No number can appear more than nums.length times, so the counts have a
          known maximum. That means I can use them as array indexes. I make an
          array where the index is the count, and each slot holds the numbers
          that appeared that many times.
        </p>
        <p>
          For [1, 1, 1, 2, 2, 3] the buckets are{" "}
          <code className={styles.inlineCode}>[[], [3], [2], [1], [], [], []]</code>.
          The positions already keep the counts in order, so I walk backwards
          from the end and collect numbers until I have k. Nothing gets
          compared, so it&apos;s O(n). It&apos;s like sorting post into numbered
          pigeonholes instead of shuffling a pile of letters into order.
        </p>
        <p>
          I can add a whole bucket at a time because the problem guarantees a
          unique answer. If a bucket ever went past k, there would be more than
          one correct answer.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='real-world'>
        <h2 id='real-world' className={styles.sectionLabel}>
          Where This Shows Up
        </h2>
        <ul className={styles.list}>
          <li>
            <strong>Trending and popular lists.</strong> Trending hashtags,
            most-searched terms, or the best-selling products this week. Sites
            like these count millions of items, which is when O(n) instead of
            O(n log n) starts to matter.
          </li>
          <li>
            <strong>Autocomplete.</strong> Showing the few suggestions people
            pick most often for what you&apos;ve typed so far.
          </li>
          <li>
            <strong>Review summaries.</strong> The bar chart of 1 to 5 star
            ratings on a product page is bucket sort in miniature: the ratings
            have a known maximum, so each one drops straight into its bucket.
          </li>
        </ul>
        <p>
          The pattern: count with a hash map, and when the values have a known
          maximum, use them as array indexes instead of sorting.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='explain-back'>
        <h2 id='explain-back' className={styles.sectionLabel}>
          Explain-back Notes
        </h2>
        <h3 className={styles.solutionTitle}>What tripped me up</h3>
        <ul className={styles.list}>
          <li>
            At first I read the problem as &quot;return numbers that appear at
            least k times&quot;. k is how many numbers to return, like a top 3
            chart. The first example gives the same answer either way, which
            made it easy to misread.
          </li>
          <li>
            I first filled the buckets array with{" "}
            <code className={styles.inlineCode}>0</code>, one slot too short.
            Each slot needs its own empty array, and{" "}
            <code className={styles.inlineCode}>fill([])</code> would have put
            the same array in every slot. A test where every number is the same
            lands in the very last bucket, so it catches the length mistake.
          </li>
          <li>
            In the loop I started at{" "}
            <code className={styles.inlineCode}>length + 1</code> instead of{" "}
            <code className={styles.inlineCode}>length - 1</code>, and pushed
            whole buckets into the result instead of the numbers inside them.
            The spread in{" "}
            <code className={styles.inlineCode}>push(...buckets[i])</code> fixed
            the second one.
          </li>
        </ul>
        <h3 className={styles.solutionTitle}>What clicked</h3>
        <ul className={styles.list}>
          <li>
            Maps don&apos;t have a sort method, so to rank by count I spread the
            Map into <code className={styles.inlineCode}>[number, count]</code>{" "}
            pairs first. That turns &quot;sort a Map&quot; into &quot;sort an
            array&quot;, which I already know how to do.
          </li>
          <li>
            <code className={styles.inlineCode}>Map.forEach</code> gives the
            value first, then the key.
          </li>
          <li>
            A classic <code className={styles.inlineCode}>for</code> loop is the
            right tool when I need to go backwards or stop early.{" "}
            <code className={styles.inlineCode}>forEach</code> can do neither.
          </li>
          <li>
            Constraints aren&apos;t just limits. &quot;The answer is
            unique&quot; is what makes adding a whole bucket safe.
          </li>
          <li>
            The pattern: when values have a known maximum, use them as array
            indexes instead of sorting.
          </li>
        </ul>
      </section>
    </main>
  );
}
