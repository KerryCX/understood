import styles from "./page.module.css";

const growthRows = [
  {
    notation: "O(1)",
    name: "Constant",
    meaning: "Same work however big the input is",
    steps: "1",
    example: "Map.get(), reading array[i]",
  },
  {
    notation: "O(log n)",
    name: "Logarithmic",
    meaning: "Halve the input each step",
    steps: "about 10",
    example: "Decimal to binary, Number of 1 Bits",
  },
  {
    notation: "O(n)",
    name: "Linear",
    meaning: "Look at each item once",
    steps: "1,000",
    example: "Counting with a Map, bucket sort",
  },
  {
    notation: "O(n log n)",
    name: "Linearithmic",
    meaning: "Sorting",
    steps: "about 10,000",
    example: "Top K, sort version",
  },
  {
    notation: "O(n²)",
    name: "Quadratic",
    meaning: "A loop inside a loop",
    steps: "1,000,000",
    example: "Group Anagrams, find() version",
  },
];

const halvingSteps = [1000, 500, 250, 125, 62, 31, 15, 7, 3, 1];

const sameTimeCode = `// Two loops, one after the other: n + n = 2n, which is O(n)
nums.forEach((n) => count(n));
nums.forEach((n) => check(n));

// A loop inside a loop: n × n, which is O(n²)
nums.forEach((a) => {
  nums.forEach((b) => compare(a, b));
});`;

const hiddenLoopCode = `// Looks like one loop, but find() is a loop too: O(n²)
words.forEach((word) => {
  groups.find((group) => group.key === makeKey(word));
});

// Map.get() is O(1), so this is O(n)
words.forEach((word) => {
  groups.get(makeKey(word));
});`;

const testQuestions = [
  {
    question: "What does Big O measure?",
    answer: (
      <p>
        How the amount of work grows as the input gets bigger. It isn&apos;t
        seconds: it&apos;s the shape of the growth.
      </p>
    ),
  },
  {
    question: "Why is O(2n) just O(n)?",
    answer: (
      <p>
        Big O only cares about the shape of the growth. Double the input and
        2n doubles, the same as n, so the 2 gets dropped.
      </p>
    ),
  },
  {
    question:
      "A forEach over an array calls find() on another array each time. What's the Big O?",
    answer: (
      <p>
        O(n²). find() is a hidden loop, so it&apos;s a loop inside a loop. That
        was my brute force for Group Anagrams. Swapping find() for Map.get()
        made it O(n).
      </p>
    ),
  },
  {
    question: "Why is converting a number to binary O(log n)?",
    answer: (
      <p>
        The loop halves n each time, and stops at 0. The number of times you
        can halve n is about log<sub>2</sub> n, which is also how many binary
        digits n has.
      </p>
    ),
  },
  {
    question:
      "Number of 1 Bits versions 1 and 2 have the same time but different space. Why?",
    answer: (
      <p>
        Both loop once per binary digit, so both are O(log n) time. Version 1
        builds a string with one character per digit, which is O(log n)
        space. Version 2 only keeps a counter, which is O(1).
      </p>
    ),
  },
  {
    question:
      "Why is Top K with sort O(n log n), but the bucket sort version O(n)?",
    answer: (
      <p>
        Sorting compares items, and that costs n log n. Bucket sort uses the
        counts as array indexes, so nothing is compared. Each item is just
        dropped in its bucket.
      </p>
    ),
  },
];

export default function BigOPage() {
  return (
    <main className='page'>
      <h1>Big O</h1>

      <section className={styles.problemCard} aria-labelledby='what'>
        <h2 id='what' className={styles.sectionLabel}>
          What Big O Is
        </h2>
        <p>
          Big O describes how the work a piece of code does grows as its input
          gets bigger. It isn&apos;t a time in seconds. It answers the question:
          if I give it 10 times more data, how much more work is that?
        </p>
        <p>
          n stands for the size of the input. Saying what n is comes first,
          because it changes the answer: in Top K it&apos;s how many numbers
          there are, and in Number of 1 Bits it&apos;s the number itself.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='common'>
        <h2 id='common' className={styles.sectionLabel}>
          The Common Ones
        </h2>
        <p>From best to worst, with roughly how many steps each takes when n is 1,000:</p>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='Common Big O growth rates'
        >
          <table className={`${styles.table} ${styles.growthTable}`}>
            <caption>Common growth rates, best first</caption>
            <thead>
              <tr>
                <th scope='col'>Big O</th>
                <th scope='col'>Name</th>
                <th scope='col'>What it means</th>
                <th scope='col'>Steps for n = 1,000</th>
                <th scope='col'>Where I&apos;ve seen it</th>
              </tr>
            </thead>
            <tbody>
              {growthRows.map((row) => (
                <tr key={row.notation}>
                  <th scope='row' className={styles.highlight}>
                    {row.notation}
                  </th>
                  <td>{row.name}</td>
                  <td>{row.meaning}</td>
                  <td>{row.steps}</td>
                  <td>{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The gap gets huge quickly. At 1,000 items, O(n²) does a thousand
          times more work than O(n).
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='working-out'>
        <h2 id='working-out' className={styles.sectionLabel}>
          How to Work It Out
        </h2>
        <h3 className={styles.solutionTitle}>Count the loops</h3>
        <ul className={styles.list}>
          <li>
            <strong>One loop over the input:</strong> O(n).
          </li>
          <li>
            <strong>Loops one after the other:</strong> add them, then keep
            only the biggest. n + n is 2n, which is O(n).
          </li>
          <li>
            <strong>A loop inside a loop:</strong> multiply them. n × n is
            O(n²).
          </li>
          <li>
            <strong>Halving each time:</strong> O(log n).
          </li>
        </ul>
        <pre className={styles.code} tabIndex={0} aria-label='Loops one after the other compared with nested loops'>
          <code>{sameTimeCode}</code>
        </pre>

        <h3 className={styles.solutionTitle}>Watch for hidden loops</h3>
        <p>
          Built-in methods aren&apos;t free. Some of them loop through the
          whole array behind the scenes:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>O(n):</strong>{" "}
            <code className={styles.inlineCode}>find()</code>,{" "}
            <code className={styles.inlineCode}>includes()</code>,{" "}
            <code className={styles.inlineCode}>indexOf()</code>,{" "}
            <code className={styles.inlineCode}>filter()</code>,{" "}
            <code className={styles.inlineCode}>map()</code>,{" "}
            <code className={styles.inlineCode}>split(&quot;&quot;)</code>
          </li>
          <li>
            <strong>O(n log n):</strong>{" "}
            <code className={styles.inlineCode}>sort()</code>
          </li>
          <li>
            <strong>O(1):</strong>{" "}
            <code className={styles.inlineCode}>Map.get()</code>,{" "}
            <code className={styles.inlineCode}>Map.has()</code>,{" "}
            <code className={styles.inlineCode}>Map.set()</code>,{" "}
            <code className={styles.inlineCode}>push()</code>, reading{" "}
            <code className={styles.inlineCode}>array[i]</code>
          </li>
        </ul>
        <pre className={styles.code} tabIndex={0} aria-label='Hidden loop compared with a Map lookup'>
          <code>{hiddenLoopCode}</code>
        </pre>

        <h3 className={styles.solutionTitle}>Drop what doesn&apos;t matter</h3>
        <ul className={styles.list}>
          <li>
            <strong>Drop the numbers in front:</strong> O(2n) is O(n), and
            O(n / 2) is O(n).
          </li>
          <li>
            <strong>Drop the smaller parts:</strong> O(n + log n) is O(n),
            because once n is big, the log n part hardly matters.
          </li>
        </ul>
      </section>

      <section className={styles.problemCard} aria-labelledby='log-n'>
        <h2 id='log-n' className={styles.sectionLabel}>
          What log n Means
        </h2>
        <p>
          log<sub>2</sub> n is how many times I can halve n before I get down
          to 1. Starting from 1,000:
        </p>
        <p className={styles.halving}>{halvingSteps.join(" → ")}</p>
        <p>
          That&apos;s 9 halvings, so about 10 steps. For a million it&apos;s
          only about 20. That&apos;s why O(log n) is so fast: doubling the
          input only adds one more step.
        </p>
        <p>
          It&apos;s the same thing as the number of binary digits. 1,000 in
          binary is 1111101000, which has 10 digits. Converting to binary
          halves each time, so it takes one step per digit.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='space'>
        <h2 id='space' className={styles.sectionLabel}>
          Time and Space
        </h2>
        <p>
          Time is how many steps the code takes. Space is how much extra memory
          it creates along the way: new strings, arrays and Maps. The input
          itself doesn&apos;t count.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>O(1) space:</strong> only a few variables, like a counter.
            They stay the same size however big n gets.
          </li>
          <li>
            <strong>O(n) space:</strong> a new array or Map with one entry per
            item, like the counts in Top K.
          </li>
          <li>
            <strong>O(log n) space:</strong> a binary string, one character per
            binary digit.
          </li>
        </ul>
        <p>
          Number of 1 Bits shows the difference. Both versions take O(log n)
          time, but version 1 builds a string (O(log n) space) and version 2
          only keeps a counter (O(1) space).
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='notes'>
        <h2 id='notes' className={styles.sectionLabel}>
          Notes to Help It Stick
        </h2>
        <ul className={styles.list}>
          <li>Always say what n is before giving the Big O.</li>
          <li>
            Big O is usually the worst case. In Top K bucket sort I can stop
            early, but in the worst case I still walk every bucket.
          </li>
          <li>
            Fewer lines doesn&apos;t mean faster. A one-line{" "}
            <code className={styles.inlineCode}>sort()</code> is O(n log n),
            while a longer counting loop can be O(n). It&apos;s about how many
            times you touch the data.
          </li>
          <li>
            A cap in the constraints can make things technically O(1). n in
            Number of 1 Bits never has more than 31 bits, so the loop never
            runs more than 31 times. In an interview, give the Big O in terms
            of n and then mention the cap.
          </li>
          <li>
            When there are two inputs, use two letters. In Group Anagrams, n is
            the number of words and k is the length of the longest word, so
            sorting each word is O(n · k log k).
          </li>
        </ul>
      </section>

      <section className={styles.problemCard} aria-labelledby='test-yourself'>
        <h2 id='test-yourself' className={styles.sectionLabel}>
          Test Yourself
        </h2>
        <p>Try answering out loud first, then open each one to check.</p>
        <div className={styles.questions}>
          {testQuestions.map((item, index) => (
            <details key={index} className={styles.question}>
              <summary className={styles.questionSummary}>
                {item.question}
              </summary>
              <div className={styles.answer}>{item.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
