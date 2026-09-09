import Link from "next/link";

export default function Home() {
  return (
    <main className='page'>
      <h1>Understood</h1>
      <div className='cards'>
        <div className='card'>
          <h2 className='cardTitle'>Problems</h2>
          <p className='cardDescription'>
            My worked-through coding problems, solutions, and reasoning
          </p>
          <Link className='cardLink' href='/problems'>
            View problems
          </Link>
        </div>
        <div className='card'>
          <h2 className='cardTitle'>Portfolio</h2>
          <p className='cardDescription'>Some work to showcase my skills</p>
          <a
            href='https://www.kerryclements.com/portfolio'
            className='cardLink'
            target='_blank'
            rel='noreferrer'
          >
            My Portfolio of Work
          </a>
        </div>
      </div>
    </main>
  );
}
