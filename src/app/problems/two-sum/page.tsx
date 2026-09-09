import styles from "./page.module.css";

export default function TwoSumPage() {
  return (
    <main className='page'>
      <h1>Two Sum</h1>
      <div className='tags'>
        <div className={`tag tagEasy`}>Easy</div>
        <div className={`tag tagHashMap`}>Hash Map</div>
        <div className={`tag tagArray`}>Array</div>
      </div>

      <div className={styles.problemCard}>
        <span className={styles.sectionLabel}>The Problem</span>
        <p>
          Given an array of integers nums and an integer target, return indices
          of the two numbers such that they add up to target.
        </p>
        <p>
          You may assume that each input would have exactly one solution, and
          you may not use the same element twice.
        </p>
        <p>You can return the answer in any order.</p>

        <p>
          <strong>Example:</strong> nums = [2, 7, 11, 15], target = 9 → [0, 1]
          (because 2 + 7 = 9)
        </p>

        <a
          href='https://leetcode.com/problems/two-sum/'
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          View on LeetCode
        </a>
      </div>
    </main>
  );
}
