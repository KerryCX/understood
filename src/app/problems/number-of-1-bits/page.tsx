import Link from "next/link";
import styles from "./page.module.css";

const stringSolution = `function hammingWeight(n) {
  let remainder;
  let binary = "";
  while (n > 0) {
    remainder = n % 2;
    binary = remainder + binary;
    n = Math.floor(n / 2);
  }

  let numberOf1s = 0;
  binary.split("").forEach((bit) => {
    if (bit === "1") {
      numberOf1s += 1;
    }
  });
  return numberOf1s;
}`;

const countSolution = `function hammingWeightCount(n) {
  let numberOf1s = 0;
  while (n > 0) {
    const remainder = n % 2;
    numberOf1s += remainder;
    n = Math.floor(n / 2);
  }
  return numberOf1s;
}`;

const bitwiseSolution = `function hammingWeightBitwise(n) {
  let numberOf1s = 0;
  while (n > 0) {
    n = n & (n - 1);
    numberOf1s += 1;
  }
  return numberOf1s;
}`;

const lookupSolution = `const buildTable = (n) => {
  const table = [];
  for (let i = 0; i < n; i++) {
    table[i] = hammingWeightBitwise(i);
  }
  return table;
};
const table = buildTable(256);

function hammingWeightLookup(n) {
  let count = 0;
  while (n > 0) {
    count += table[n % 256];
    n = Math.floor(n / 256);
  }
  return count;
}`;

const bitwiseTrace = `n = 1100 (12)   n - 1 = 1011   n & (n - 1) = 1000   tally: 1
n = 1000 (8)    n - 1 = 0111   n & (n - 1) = 0000   tally: 2
n is 0, so stop. Answer: 2`;

const zones = [
  { label: "n (12)", left: "1", rightmost: "1", right: "00" },
  { label: "n − 1 (11)", left: "1", rightmost: "0", right: "11" },
  { label: "n & (n − 1)", left: "1", rightmost: "0", right: "00" },
];

export default function NumberOf1BitsPage() {
  return (
    <main className='page'>
      <h1>Number of 1 Bits</h1>
      <div className='tags'>
        <div className='tag tagEasy'>Easy</div>
        <div className='tag tagBitManipulation'>Bit Manipulation</div>
      </div>

      <section className={styles.problemCard} aria-labelledby='problem'>
        <h2 id='problem' className={styles.sectionLabel}>
          The Problem
        </h2>
        <p>
          Given a positive whole number n, return how many 1s appear in its
          binary form. This count is also called the Hamming weight.
        </p>
        <p>
          <strong>Example:</strong> n = 11 → 3 (11 in binary is 1011)
        </p>
        <p>
          <strong>Constraints:</strong> n is between 1 and 2<sup>31</sup> − 1,
          so it never has more than 31 bits.
        </p>
        <p>
          <strong>Follow-up:</strong> if the function is called many times, how
          would you optimise it?
        </p>
        <a
          href='https://leetcode.com/problems/number-of-1-bits/'
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
          Look at each bit of n and count the ones that are 1. The interesting
          part is how few bits you can get away with looking at.
        </p>
        <p>
          This one needs binary, so my{" "}
          <Link href='/concepts/binary' className={`link ${styles.inlineLink}`}>
            Binary notes
          </Link>{" "}
          cover the conversion, and my{" "}
          <Link href='/concepts/big-o' className={`link ${styles.inlineLink}`}>
            Big O notes
          </Link>{" "}
          explain where the log n comes from.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='brute-force'>
        <h2 id='brute-force' className={styles.sectionLabel}>
          Solution 1: Brute Force
        </h2>
        <h3 className={styles.solutionTitle}>
          Build the binary string, then count
        </h3>
        <p className={styles.complexity}>Time: O(log n), Space: O(log n)</p>
        <pre
          className={styles.code}
          tabIndex={0}
          aria-label='Brute force solution code'
        >
          <code>{stringSolution}</code>
        </pre>
        <p>
          Convert n to binary by dividing by 2 and keeping the remainders. They
          arrive right to left, so each one goes on the front of the string.
          Then go through the string and count the{" "}
          <code className={styles.inlineCode}>&quot;1&quot;</code>s.
        </p>
        <p>
          A number n has about log<sub>2</sub> n binary digits, and the loop
          runs once per digit, so it&apos;s O(log n). The string also holds one
          character per digit, so the space is O(log n) too.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='count'>
        <h2 id='count' className={styles.sectionLabel}>
          Solution 2: Count As You Go
        </h2>
        <h3 className={styles.solutionTitle}>No string needed</h3>
        <p className={styles.complexity}>Time: O(log n), Space: O(1)</p>
        <pre
          className={styles.code}
          tabIndex={0}
          aria-label='Count as you go solution code'
        >
          <code>{countSolution}</code>
        </pre>
        <p>
          Each <code className={styles.inlineCode}>n % 2</code> already tells me
          whether that bit is a 1, so I count it straight away and skip the
          string. The remainder is the number 0 or 1, so adding it on is the
          same as &quot;add 1 if it&apos;s a 1&quot;, with no{" "}
          <code className={styles.inlineCode}>if</code> needed.
        </p>
        <p>
          The time is the same as Solution 1, because it&apos;s still once per
          bit. The space drops to O(1), because there&apos;s only a counter.
          It&apos;s a tidy-up rather than a new idea.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='bitwise'>
        <h2 id='bitwise' className={styles.sectionLabel}>
          Solution 3: Remove One 1 at a Time
        </h2>
        <h3 className={styles.solutionTitle}>The n &amp; (n − 1) trick</h3>
        <p className={styles.complexity}>
          Time: O(k), where k is the number of 1s. Space: O(1)
        </p>
        <pre
          className={styles.code}
          tabIndex={0}
          aria-label='Bitwise solution code'
        >
          <code>{bitwiseSolution}</code>
        </pre>
        <p>
          Subtracting 1 flips the rightmost 1 to a 0, and flips the 0s to its
          right into 1s. Everything to its left stays the same. It&apos;s
          borrowing, like 300 − 1 = 299 in decimal, except binary&apos;s biggest
          digit is 1, not 9.
        </p>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='Why n and n minus 1 removes the rightmost 1'
        >
          <table className={styles.table}>
            <caption>12 &amp; 11, split into three zones</caption>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>Left</th>
                <th scope='col'>Rightmost 1</th>
                <th scope='col'>Right</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((row) => (
                <tr key={row.label}>
                  <th scope='row'>{row.label}</th>
                  <td>{row.left}</td>
                  <td>{row.rightmost}</td>
                  <td>{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <code className={styles.inlineCode}>&amp;</code> keeps a 1 only where
          both numbers have one. The left part is the same in both, so it stays.
          The rightmost 1 and everything to its right become 0. So{" "}
          <code className={styles.inlineCode}>n &amp; (n - 1)</code> removes
          exactly one 1.
        </p>
        <pre
          className={styles.code}
          tabIndex={0}
          aria-label='Trace of the bitwise solution for 12'
        >
          <code>{bitwiseTrace}</code>
        </pre>
        <p>
          The loop only runs once per 1, skipping the 0s. For 128 (10000000)
          that&apos;s 1 step instead of 8. If every bit is a 1 it&apos;s no
          faster than Solution 2, which is why it&apos;s O(k) and not better in
          the worst case.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='follow-up'>
        <h2 id='follow-up' className={styles.sectionLabel}>
          Follow-up: Called Many Times?
        </h2>
        <h3 className={styles.solutionTitle}>A lookup table of bytes</h3>
        <p className={styles.complexity}>Time: O(1) per call, Space: O(1)</p>
        <pre
          className={styles.code}
          tabIndex={0}
          aria-label='Lookup table solution code'
        >
          <code>{lookupSolution}</code>
        </pre>
        <p>
          Do the slow work once, up front. The table has one slot for every
          possible byte (0 to 255), and the index is the number, so{" "}
          <code className={styles.inlineCode}>table[5]</code> is 2. It&apos;s
          built once when the file loads, not on every call.
        </p>
        <p>
          A table for every possible n would need over 2 billion slots, so
          instead I split n into bytes and look each one up. It&apos;s the same
          loop as Solution 2 with 256 instead of 2:{" "}
          <code className={styles.inlineCode}>n % 256</code> is the rightmost
          byte, like 345 % 100 is the last two digits. A 31-bit number has at
          most 4 bytes, so it&apos;s at most 4 lookups per call.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='real-world'>
        <h2 id='real-world' className={styles.sectionLabel}>
          Where This Shows Up
        </h2>
        <ul className={styles.list}>
          <li>
            <strong>Settings stored as bits.</strong> Unix file permissions use
            4 (read), 2 (write) and 1 (execute), so 7 means all three are on.
            The Hamming weight says how many are switched on.
          </li>
          <li>
            <strong>Front end.</strong>{" "}
            <code className={styles.inlineCode}>MouseEvent.buttons</code> is a
            bitmask: left is 1, right is 2 and middle is 4. Holding left and
            right gives 3, which has two 1s, so two buttons are down.
          </li>
          <li>
            <strong>Error checking.</strong> A parity bit records whether the
            count of 1s is odd or even, so a bit flipped in transit gets caught.
            Richard Hamming worked on this, hence the name.
          </li>
          <li>
            <strong>Similarity.</strong> XOR two numbers and count the 1s to see
            how many bits differ. Image search uses this to find near-duplicate
            photos.
          </li>
        </ul>
        <p>
          It&apos;s common enough that most CPUs have a built-in instruction for
          it, called popcount.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='explain-back'>
        <h2 id='explain-back' className={styles.sectionLabel}>
          Explain-back Notes
        </h2>
        <h3 className={styles.solutionTitle}>What tripped me up</h3>
        <ul className={styles.list}>
          <li>
            I&apos;d forgotten how to convert to binary, and had to work it out
            again by hand. That turned into my Binary notes page.
          </li>
          <li>
            In Solution 2 I first compared the remainder with{" "}
            <code className={styles.inlineCode}>&quot;1&quot;</code>.{" "}
            <code className={styles.inlineCode}>n % 2</code> gives a number, not
            text, so it never matched and everything returned 0.
          </li>
          <li>
            I read <code className={styles.inlineCode}>&amp;</code> as{" "}
            <code className={styles.inlineCode}>&amp;&amp;</code> and expected
            true or false. One <code className={styles.inlineCode}>&amp;</code>{" "}
            compares bits and gives back a number.
          </li>
          <li>
            I thought the result of{" "}
            <code className={styles.inlineCode}>n &amp; (n - 1)</code> was the
            answer. It&apos;s only what&apos;s left. The answer is how many
            times you can do it before n is 0.
          </li>
          <li>
            In the lookup version I returned{" "}
            <code className={styles.inlineCode}>&quot;count&quot;</code> in
            quotes, which is the word, not the variable.
          </li>
        </ul>
        <h3 className={styles.solutionTitle}>What clicked</h3>
        <ul className={styles.list}>
          <li>
            Borrowing: 300 − 1 = 299 in decimal is the same thing that happens
            to the rightmost 1 in binary.
          </li>
          <li>
            Counting sweets by taking one out of the bag at a time and keeping a
            tally. The <code className={styles.inlineCode}>&amp;</code> takes a
            sweet out; the counter is the tally.
          </li>
          <li>
            % and Math.floor split a number into &quot;the last bit&quot; and
            &quot;the rest&quot; with 2, or &quot;the last byte&quot; and
            &quot;the rest&quot; with 256, just like 345 with 100.
          </li>
          <li>
            Working it out on paper first, then tracing it in code with{" "}
            <code className={styles.inlineCode}>console.log</code>, is what made
            it make sense.
          </li>
        </ul>
      </section>
    </main>
  );
}
