import Link from "next/link";

export default function ConceptsPage() {
  return (
    <main className='page'>
      <h1>Concepts</h1>
      <div className='cards'>
        <div className='card'>
          <h2 className='cardTitle'>Binary</h2>
          <p className='cardDescription'>
            How base 2 works, and converting between binary and decimal by hand
            and in JavaScript.
          </p>
          <Link className='cardLink' href='/concepts/binary'>
            Read notes
          </Link>
        </div>
        <div className='card'>
          <h2 className='cardTitle'>Big O</h2>
          <p className='cardDescription'>
            How to describe and work out how much work code does as its input
            grows, for time and space.
          </p>
          <Link className='cardLink' href='/concepts/big-o'>
            Read notes
          </Link>
        </div>
      </div>
    </main>
  );
}
