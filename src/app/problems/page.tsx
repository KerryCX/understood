import Link from "next/link";

export default function ProblemsPage() {
  return (
    <main className='page'>
      <h1>Problems</h1>
      <div className='cards'>
        <div className='card'>
          <h2 className='cardTitle'>Two Sum</h2>
          <div className='tags'>
            <div className='tag tagEasy'>Easy</div>
            <div className='tag tagHashMap'>Hash Map</div>
            <div className='tag tagArray'>Array</div>
          </div>
          <p className='cardDescription'>
            Find two numbers in an array that add up to a given target.
          </p>
          <Link className='cardLink' href='/problems/two-sum'>
            View problem
          </Link>
        </div>
        <div className='card'>
          <h2 className='cardTitle'>Group Anagrams</h2>
          <div className='tags'>
            <div className='tag tagMedium'>Medium</div>
            <div className='tag tagHashMap'>Hash Map</div>
            <div className='tag tagString'>String</div>
          </div>
          <p className='cardDescription'>
            Group words that are made of the same letters in a different order.
          </p>
          <Link className='cardLink' href='/problems/group-anagrams'>
            View problem
          </Link>
        </div>
      </div>
    </main>
  );
}
