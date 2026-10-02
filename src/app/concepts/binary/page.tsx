import Link from "next/link";
import styles from "./page.module.css";

const binaryToDecimalCode = `function binaryToDecimal(bits) {
  let total = 0;
  for (let i = 0; i < bits.length; i++) {
    const power = bits.length - 1 - i;
    total = total + Number(bits[i]) * 2 ** power;
  }
  return total;
}`;

const doublingCode = `function binaryToDecimalDoubling(bits) {
  let total = 0;
  for (const bit of bits) {
    total = total * 2 + Number(bit);
  }
  return total;
}`;

const decimalToBinaryCode = `function decimalToBinary(n) {
  if (n === 0) return "0";
  let remaining = n;
  let binary = "";
  while (remaining > 0) {
    const remainder = remaining % 2;
    binary = remainder + binary;
    remaining = Math.floor(remaining / 2);
  }
  return binary;
}`;

const byteColumns = [128, 64, 32, 16, 8, 4, 2, 1];
const bitsFor170 = [1, 0, 1, 0, 1, 0, 1, 0];

const stepsFor11 = [
  { n: 11, half: 5, remainder: 1 },
  { n: 5, half: 2, remainder: 1 },
  { n: 2, half: 1, remainder: 0 },
  { n: 1, half: 0, remainder: 1 },
];

const loopStepsCode = `let n = 20;
let binary = "";

while (n > 0) {
  const remainder = n % 2;
  binary = remainder + binary;
  n = Math.floor(n / 2);
}

// binary is now "10100"`;

const testQuestions = [
  {
    question: "How is base 2 like base 10? How is it different?",
    answer: (
      <>
        <p>
          Let&apos;s start with what is the same. A digit&apos;s value depends
          on which column it&apos;s in, and the rightmost column is always
          worth 1.
        </p>
        <p>What is different?</p>
        <ul className={styles.list}>
          <li>
            Base 10 (decimal) uses ten digits (0 to 9) and each column is worth
            10 times the one to its right: 1, 10, 100, 1000.
          </li>
          <li>
            Base 2 (binary) only uses 0 and 1, and each column is worth 2 times
            the one to its right: 1, 2, 4, 8.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: (
      <>
        Why is the leftmost bit of a byte 2<sup>7</sup> and not 2<sup>8</sup>?
      </>
    ),
    answer: (
      <>
        <p>
          The columns start at 2<sup>0</sup> on the right, so 8 columns go
          from 2<sup>0</sup> to 2<sup>7</sup>. 2<sup>8</sup> = 256 is how many
          different values a byte can hold (0 to 255), not a column.
        </p>
        <ul className={styles.list}>
          <li>
            <code className={styles.inlineCode}>00000000</code> = 0, the
            smallest
          </li>
          <li>
            <code className={styles.inlineCode}>11111111</code> = 255, the
            biggest: every column is a 1
          </li>
          <li>
            <code className={styles.inlineCode}>100000000</code> = 256, which
            needs a 9th column (2<sup>8</sup>), so it doesn&apos;t fit in a
            byte
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Convert 10101010 to decimal by hand.",
    answer: (
      <>
        <p>The 1s are in the 128, 32, 8 and 2 columns.</p>
        <p>128 + 32 + 8 + 2 = 170</p>
        <p>Or with every column written out, zeros included:</p>
        <p>
          1 × 128 + 0 × 64 + 1 × 32 + 0 × 16 + 1 × 8 + 0 × 4 + 1 × 2 + 0 × 1 =
          170
        </p>
      </>
    ),
  },
  {
    question: "Convert 11 to binary by hand. Why read the remainders upwards?",
    answer: (
      <>
        <p>
          11 / 2 = 5 remainder 1,
          <br />5 / 2 = 2 remainder 1,
          <br />2 / 2 = 1 remainder 0,
          <br />1 / 2 = 0 remainder 1.
        </p>
        <p>Reading upwards gives 1011.</p>
        <p>
          You can check this by adding up what each bit represents to see if it
          comes to the original decimal:
        </p>
        <p>8 + 2 + 1 = 11</p>
        <p>
          The first remainder says whether the number is odd or even, which is
          the ones column, so it&apos;s the last digit. The digits arrive right
          to left.
        </p>
      </>
    ),
  },
  {
    question: "Walk through the doubling method for 1011. Why does doubling work?",
    answer: (
      <>
        <p>
          The running total starts at 0, because before reading any bits
          there&apos;s nothing yet. Then for each bit, double the total and add
          the bit.
        </p>
        <ul className={styles.list}>
          <li>Start: 0</li>
          <li>Read 1: 0 × 2 + 1 = 1</li>
          <li>Read 0: 1 × 2 + 0 = 2</li>
          <li>Read 1: 2 × 2 + 1 = 5</li>
          <li>Read 1: 5 × 2 + 1 = 11</li>
        </ul>
        <p>
          Each new bit moves everything already there one column to the left,
          and moving one column left in binary doubles a value.
        </p>
      </>
    ),
  },
  {
    question: "Why are palindromes bad test cases for a conversion function?",
    answer: (
      <p>
        They read the same both ways, so a function that puts the digits in
        the wrong order still gives the right answer. 17 is 10001 either way,
        but 11 (1011) backwards would be 1101, which shows the bug.
      </p>
    ),
  },
  {
    question: "Practise on paper: convert 6, 13 and 20 to binary.",
    answer: (
      <>
        <p>
          <strong>6 is 110</strong>
        </p>
        <p>
          6 / 2 = 3 remainder 0
          <br />3 / 2 = 1 remainder 1
          <br />1 / 2 = 0 remainder 1
        </p>
        <p>Reading upwards: 110</p>
        <p>
          <strong>13 is 1101</strong>
        </p>
        <p>
          13 / 2 = 6 remainder 1
          <br />6 / 2 = 3 remainder 0
          <br />3 / 2 = 1 remainder 1
          <br />1 / 2 = 0 remainder 1
        </p>
        <p>Reading upwards: 1101</p>
        <p>
          <strong>20 is 10100</strong>
        </p>
        <p>
          20 / 2 = 10 remainder 0
          <br />10 / 2 = 5 remainder 0
          <br />5 / 2 = 2 remainder 1
          <br />2 / 2 = 1 remainder 0
          <br />1 / 2 = 0 remainder 1
        </p>
        <p>Reading upwards: 10100</p>
      </>
    ),
  },
  {
    question: "Write out the steps for converting 20 using JavaScript.",
    answer: (
      <>
        <p>
          The three lines inside the loop run once for each row of the table
          below.
        </p>
        <pre className={styles.code} tabIndex={0} aria-label='Loop steps code'>
          <code>{loopStepsCode}</code>
        </pre>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='Converting 20 step by step in JavaScript'
        >
          <table className={styles.table}>
            <caption>Converting 20, one row per time round the loop</caption>
            <thead>
              <tr>
                <th scope='col'>n</th>
                <th scope='col'>n % 2</th>
                <th scope='col'>Math.floor(n / 2)</th>
                <th scope='col'>binary</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>20</td>
                  <td className={styles.highlight}>0</td>
                  <td>10</td>
                  <td>&quot;0&quot;</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className={styles.highlight}>0</td>
                  <td>5</td>
                  <td>&quot;00&quot;</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className={styles.highlight}>1</td>
                  <td>2</td>
                  <td>&quot;100&quot;</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className={styles.highlight}>0</td>
                  <td>1</td>
                  <td>&quot;0100&quot;</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className={styles.highlight}>1</td>
                  <td>0</td>
                  <td>&quot;10100&quot;</td>
                </tr>
            </tbody>
          </table>
        </div>
        <p>
          n is now 0, so the loop stops. Each remainder goes on the front of
          binary, so the string builds up right to left and ends as
          &quot;10100&quot;, with no reading upwards needed.
        </p>
      </>
    ),
  },
];

export default function BinaryPage() {
  return (
    <main className='page'>
      <p>
        <Link href='/concepts' className='link'>
          Concepts
        </Link>
      </p>
      <h1>Binary</h1>

      <section className={styles.problemCard} aria-labelledby='what'>
        <h2 id='what' className={styles.sectionLabel}>
          What Binary Is
        </h2>
        <p>
          Binary (base 2) works exactly like the decimal numbers I already use
          (base 10). In 345, each column is worth 10 times the one to its
          right: 3 hundreds, 4 tens and 5 ones.
        </p>
        <p>
          Binary only has two digits, 0 and 1, so each column is worth 2 times
          the one to its right. The rightmost column is always worth 1
          (that&apos;s 2<sup>0</sup>), in any base. Each binary digit is called
          a bit.
        </p>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='Column values for one byte'
        >
          <table className={styles.table}>
            <caption>The 8 columns of a byte</caption>
            <thead>
              <tr>
                {[7, 6, 5, 4, 3, 2, 1, 0].map((power) => (
                  <th key={power} scope='col'>
                    2<sup>{power}</sup>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {byteColumns.map((value) => (
                  <td key={value}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A byte is 8 bits. It&apos;s worth learning these 8 column values off
          by heart, because every conversion uses them.
        </p>
      </section>

      <section className={styles.problemCard} aria-labelledby='to-decimal'>
        <h2 id='to-decimal' className={styles.sectionLabel}>
          Binary to Decimal
        </h2>
        <h3 className={styles.solutionTitle}>By hand: add up the columns with a 1</h3>
        <p>Line the bits up under the column values, then add the columns that have a 1.</p>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='10101010 lined up under the column values'
        >
          <table className={styles.table}>
            <caption>10101010 under the column values</caption>
            <thead>
              <tr>
                {byteColumns.map((value) => (
                  <th key={value} scope='col'>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {bitsFor170.map((bit, index) => (
                  <td
                    key={byteColumns[index]}
                    className={bit === 1 ? styles.highlight : undefined}
                  >
                    {bit}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          128 + 32 + 8 + 2 = 170. Writing the zeros in too (128 + 0 + 32 + 0
          ...) helps me keep my place.
        </p>

        <h3 className={styles.solutionTitle}>In code</h3>
        <p>
          Each digit gets multiplied by its column value, then they&apos;re
          all added up. The column value is 2 multiplied by itself once for
          each place it is from the right: the rightmost digit is 2
          <sup>0</sup> = 1, the next is 2<sup>1</sup> = 2, then 2
          <sup>2</sup> = 4. That&apos;s what{" "}
          <code className={styles.inlineCode}>2 ** power</code> works out.
        </p>
        <pre className={styles.code} tabIndex={0} aria-label='Binary to decimal code'>
          <code>{binaryToDecimalCode}</code>
        </pre>

        <h3 className={styles.solutionTitle}>A neater way: keep doubling</h3>
        <p>
          Going left to right, double the running total and add the next bit.
          No powers or indexes needed. The total starts at 0, because before
          reading any bits there&apos;s nothing yet. For 1011:
        </p>
        <ul className={styles.list}>
          <li>Start: 0</li>
          <li>Read 1: 0 × 2 + 1 = 1</li>
          <li>Read 0: 1 × 2 + 0 = 2</li>
          <li>Read 1: 2 × 2 + 1 = 5</li>
          <li>Read 1: 5 × 2 + 1 = 11</li>
        </ul>
        <p>
          Why it works: each time a new bit arrives, everything already there
          moves one column to the left, which doubles it. It&apos;s the same as
          typing 3, 4, 5 into a calculator: each new digit multiplies
          what&apos;s already there by 10.
        </p>
        <pre className={styles.code} tabIndex={0} aria-label='Doubling method code'>
          <code>{doublingCode}</code>
        </pre>
      </section>

      <section className={styles.problemCard} aria-labelledby='to-binary'>
        <h2 id='to-binary' className={styles.sectionLabel}>
          Decimal to Binary
        </h2>
        <h3 className={styles.solutionTitle}>
          By hand: divide by 2 and keep the remainders
        </h3>
        <p>
          Keep halving the number (rounding down) and write down the remainder
          each time, until the number reaches 0.
        </p>
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role='region'
          aria-label='Converting 11 to binary'
        >
          <table className={styles.table}>
            <caption>Converting 11</caption>
            <thead>
              <tr>
                <th scope='col'>n</th>
                <th scope='col'>n / 2, rounded down</th>
                <th scope='col'>Remainder</th>
              </tr>
            </thead>
            <tbody>
              {stepsFor11.map((step) => (
                <tr key={step.n}>
                  <td>{step.n}</td>
                  <td>{step.half}</td>
                  <td className={styles.highlight}>{step.remainder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Read the remainders from the <strong>bottom up</strong> to get 1011.
        </p>

        <h3 className={styles.solutionTitle}>Why read them upwards?</h3>
        <p>
          The remainder tells me whether the number is odd or even, which is
          exactly the ones column. So the first remainder is the{" "}
          <em>last</em> digit. Halving then shifts everything one column to the
          right, and the next remainder is the twos column, and so on. The
          digits arrive right to left.
        </p>
        <p>
          That&apos;s the opposite way round to binary to decimal. Reading
          binary goes left to right because I already have the whole string.
          Building binary goes right to left because I&apos;m creating it
          starting from the ones column.
        </p>

        <h3 className={styles.solutionTitle}>In code</h3>
        <pre className={styles.code} tabIndex={0} aria-label='Decimal to binary code'>
          <code>{decimalToBinaryCode}</code>
        </pre>
        <ul className={styles.list}>
          <li>
            <strong>A <code className={styles.inlineCode}>while</code> loop</strong>,
            because I don&apos;t know in advance how many steps it will take.
            It stops by itself when the number reaches 0, the same as by hand.
          </li>
          <li>
            <strong>Remainder first, then halve.</strong> If I halve first,
            the remainder is for the wrong number.
          </li>
          <li>
            <strong>New digit on the front</strong>:{" "}
            <code className={styles.inlineCode}>remainder + binary</code>,
            because the digits arrive right to left. Adding to the end and
            reversing at the end works too.
          </li>
          <li>
            <strong>0 needs its own check.</strong> Otherwise the loop never
            runs and 0 comes back as an empty string.
          </li>
          <li>
            The number changes every time round, so it needs to be a{" "}
            <code className={styles.inlineCode}>let</code>. Copying the input
            into a new variable keeps the original untouched.
          </li>
        </ul>
      </section>

      <section className={styles.problemCard} aria-labelledby='notes'>
        <h2 id='notes' className={styles.sectionLabel}>
          Notes to Help It Stick
        </h2>
        <ul className={styles.list}>
          <li>
            Every base works the same way. The rightmost column is worth 1,
            and each column to the left is worth the base times more: 1, 10,
            100 in base 10, and 1, 2, 4, 8 in base 2.
          </li>
          <li>
            The leftmost column of a byte is 2<sup>7</sup> (128), not
            2<sup>8</sup>, because the columns start at 2<sup>0</sup>.
            2<sup>8</sup> = 256 is how many different values a byte can hold,
            from 0 to 255.
          </li>
          <li>
            In a binary string, each digit is text, so{" "}
            <code className={styles.inlineCode}>&quot;1&quot; + &quot;0&quot;</code>{" "}
            gives <code className={styles.inlineCode}>&quot;10&quot;</code>. Use{" "}
            <code className={styles.inlineCode}>Number()</code> before doing
            maths with them.
          </li>
          <li>
            <code className={styles.inlineCode}>**</code> is &quot;to the power
            of&quot; in JavaScript.{" "}
            <code className={styles.inlineCode}>^</code> isn&apos;t: it&apos;s
            bitwise XOR, so <code className={styles.inlineCode}>2 ^ 3</code> is
            1, not 8.
          </li>
          <li>
            Palindromes like 5 (101), 17 (10001) and 255 (11111111) read the
            same both ways, so they hide digits in the wrong order. Test with
            lopsided numbers like 6 (110), 11 (1011) and 170 (10101010).
          </li>
          <li>
            Counting the 1s is not the same as converting back. For 10100,
            counting gives 2 but converting gives 20.
          </li>
        </ul>
      </section>

      <section className={styles.problemCard} aria-labelledby='built-ins'>
        <h2 id='built-ins' className={styles.sectionLabel}>
          What JavaScript Gives You
        </h2>
        <ul className={styles.list}>
          <li>
            <code className={styles.inlineCode}>(11).toString(2)</code> gives{" "}
            &quot;1011&quot;
          </li>
          <li>
            <code className={styles.inlineCode}>parseInt(&quot;1011&quot;, 2)</code>{" "}
            gives 11
          </li>
          <li>
            <code className={styles.inlineCode}>0b1011</code> is a binary
            literal, which is just 11
          </li>
        </ul>
        <p>
          In real code I&apos;d use these. In an interview I&apos;d mention
          them, then write the loop, because the loop is what&apos;s being
          tested.
        </p>
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
