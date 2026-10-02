import styles from "./page.module.css";

const findSolution = `function groupAnagramsWithFind(strs) {
  const groups = [];

  strs.forEach((word) => {
    const groupKey = word.split("").sort().join(",");
    const existingGroup = groups.find((group) => group.key === groupKey);

    if (existingGroup) {
      existingGroup.words.push(word);
    } else {
      groups.push({ words: [word], key: groupKey });
    }
  });

  return groups.map((group) => group.words);
}`;

const mapSolution = `function groupAnagramsWithMap(strs) {
  const groups = new Map();

  strs.forEach((word) => {
    const groupKey = word.split("").sort().join(",");

    if (!groups.has(groupKey)) {
      groups.set(groupKey, [word]);
    } else {
      groups.get(groupKey).push(word);
    }
  });

  return Array.from(groups.values());
}`;

const letterCountSolution = `function groupAnagramsWithLetterCount(strs) {
  const groups = new Map();

  strs.forEach((word) => {
    const countArray = new Array(26).fill(0);

    word.split("").forEach((letter) => {
      countArray[letter.charCodeAt(0) - 97] += 1;
    });

    const groupKey = countArray.join(",");

    if (!groups.has(groupKey)) {
      groups.set(groupKey, [word]);
    } else {
      groups.get(groupKey).push(word);
    }
  });

  return Array.from(groups.values());
}`;

export default function GroupAnagramsPage() {
  return (
    <main className='page'>
      <h1>Group Anagrams</h1>
      <div className='tags'>
        <div className='tag tagMedium'>Medium</div>
        <div className='tag tagHashMap'>Hash Map</div>
        <div className='tag tagString'>String</div>
      </div>

      <section className={styles.problemCard} aria-labelledby='problem'>
        <h2 id='problem' className={styles.sectionLabel}>
          The Problem
        </h2>
        <p>
          Given an array of strings, group together the words that are anagrams
          of each other. Return the groups in any order.
        </p>
        <p>
          An anagram is a word made by rearranging the letters of another word,
          using every letter exactly once.
        </p>
        <p>
          <strong>Example:</strong> [&quot;eat&quot;, &quot;tea&quot;,
          &quot;tan&quot;, &quot;ate&quot;, &quot;nat&quot;, &quot;bat&quot;] →
          [[&quot;bat&quot;], [&quot;nat&quot;, &quot;tan&quot;],
          [&quot;ate&quot;, &quot;eat&quot;, &quot;tea&quot;]]
        </p>
        <p>
          <strong>Constraints:</strong> up to 10,000 words, each up to 100
          characters, lowercase English letters only. Empty strings are
          allowed.
        </p>
        <a
          href='https://leetcode.com/problems/group-anagrams/'
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
          Anagrams have exactly the same letters, just in a different order. If
          I sort the letters of each word, every anagram comes out as the same
          string: &quot;eat&quot;, &quot;tea&quot; and &quot;ate&quot; all
          become &quot;aet&quot;.
        </p>
        <p>
          That sorted string works as a label, or key, for the group. I never
          need to compare words against each other. I just work out each
          word&apos;s key and drop the word into the bucket for that key.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='brute-force'>
        <h2 id='brute-force' className={styles.sectionLabel}>
          Solution 1: Brute Force
        </h2>
        <h3 className={styles.solutionTitle}>Array of groups, searched with find()</h3>
        <p className={styles.complexity}>Time: O(n²) worst case</p>
        <pre className={styles.code} tabIndex={0} aria-label='Brute force solution code'>
          <code>{findSolution}</code>
        </pre>
        <p>
          For every word, <code className={styles.inlineCode}>find()</code> may
          have to check every group made so far. If all 10,000 words are
          different, that&apos;s roughly 50 million checks. It&apos;s the
          &quot;compare everything to everything&quot; problem, just hidden
          inside <code className={styles.inlineCode}>find()</code>.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='optimised'>
        <h2 id='optimised' className={styles.sectionLabel}>
          Solution 2: Optimised
        </h2>
        <h3 className={styles.solutionTitle}>Hash map using a Map</h3>
        <p className={styles.complexity}>Time: O(n · k log k)</p>
        <pre className={styles.code} tabIndex={0} aria-label='Optimised solution code'>
          <code>{mapSolution}</code>
        </pre>
        <p>
          Swapping the array for a hash map removes the search entirely.{" "}
          <code className={styles.inlineCode}>has()</code>,{" "}
          <code className={styles.inlineCode}>get()</code> and{" "}
          <code className={styles.inlineCode}>set()</code> are all instant
          lookups, so the only real cost left is sorting each word (k log k,
          where k is the word length).
        </p>
        <p>
          I also wrote a version with a plain object, which has the same
          complexity. A Map is built specifically for key/value storage and
          avoids clashes with built-in object keys like &quot;constructor&quot;.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='follow-up'>
        <h2 id='follow-up' className={styles.sectionLabel}>
          Follow-up: Can you do better than sorting?
        </h2>
        <h3 className={styles.solutionTitle}>Count the letters instead</h3>
        <p className={styles.complexity}>Time: O(n · k)</p>
        <pre className={styles.code} tabIndex={0} aria-label='Letter count solution code'>
          <code>{letterCountSolution}</code>
        </pre>
        <p>
          Instead of sorting, count how many of each letter the word has, using
          26 slots. Sorting compares letters against each other, but counting
          only looks at each letter once. The 26 slots are a fixed cost, so
          they don&apos;t affect the Big O.
        </p>
        <p>
          The commas in <code className={styles.inlineCode}>join(&quot;,&quot;)</code>{" "}
          matter here. Without them, counts of 11 and 1 would give
          &quot;111&quot;, the same as 1 and 11.
        </p>
        <p>
          With words capped at 100 letters, the real-world difference is small
          and the built-in sort is very fast. But fewer lines of code
          doesn&apos;t mean faster: it&apos;s about how many times you touch the
          data.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='real-world'>
        <h2 id='real-world' className={styles.sectionLabel}>
          Where This Shows Up
        </h2>
        <ul className={styles.list}>
          <li>
            <strong>Cleaning up data.</strong> Treating &quot;Bristol&quot;,
            &quot;bristol &quot; and &quot;BRISTOL&quot; as the same place, or
            spotting duplicate contacts. Each entry gets a normalised key
            (trimmed, lowercased) and anything with the same key is grouped.
          </li>
          <li>
            <strong>Grouping results.</strong> Showing one product with all its
            sizes and colours, or grouping search results that point at the
            same thing.
          </li>
          <li>
            <strong>Word game helpers.</strong> A Scrabble helper sorts the
            letters on your rack and looks up every word with the same sorted
            key, which is exactly this problem.
          </li>
        </ul>
        <p>
          The pattern: work out a key from each item on its own, then let a
          hash map do the grouping.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='explain-back'>
        <h2 id='explain-back' className={styles.sectionLabel}>
          Explain-back Notes
        </h2>
        <h3 className={styles.solutionTitle}>What tripped me up</h3>
        <ul className={styles.list}>
          <li>
            My instinct was to jump straight into a loop. Filtering by word
            length was valid but only ruled things out, so I&apos;d still have
            been comparing words to each other.
          </li>
          <li>
            In my first version, I pushed a new group every time a group
            didn&apos;t match, inside the loop, which created duplicates.{" "}
            <code className={styles.inlineCode}>find()</code> fixed it by
            checking all the groups first, then deciding.
          </li>
          <li>
            In the letter count version I wrote{" "}
            <code className={styles.inlineCode}>= 1</code> instead of{" "}
            <code className={styles.inlineCode}>+= 1</code>. My tests all passed
            because none of the words repeated a letter. Adding
            &quot;aab&quot;, &quot;abb&quot;, &quot;aba&quot; as a test caught
            it.
          </li>
        </ul>
        <h3 className={styles.solutionTitle}>What clicked</h3>
        <ul className={styles.list}>
          <li>
            Asking &quot;what do all the items in one group have in common that
            I can calculate from each one on its own?&quot; That question turns
            a comparison problem into a grouping problem.
          </li>
          <li>
            <code className={styles.inlineCode}>find()</code> and{" "}
            <code className={styles.inlineCode}>Map.get()</code> return a
            reference to the real object or array, not a copy, so pushing to it
            updates the original.
          </li>
          <li>
            The pattern: when a problem says &quot;group&quot;, &quot;find
            duplicates&quot; or &quot;count&quot;, think hash map with a
            computed key.
          </li>
        </ul>
      </section>
    </main>
  );
}
