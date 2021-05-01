import Head from 'next/head'
import styles from '../styles/Home.module.css'


const SearchBar = () => (
    <div style={{padding: "5px 0"}}>
        <input className={["textpad", styles.box].join(' ')} style={{color: "#000", maxWidth: "220px"}}
            type="text"
            id="header-search"
            placeholder="Từ cần tra..."
            name="ori" 
        />
        <button onClick={lookupOri} className={styles.button}>Tra</button>
    </div>
);

const lookupOri = async (event) => {
	event.preventDefault();
    var orireq = document.getElementById("header-search").value;
    const req = await fetch('./api/taynung/' + orireq);
    var words = await req.json();	
	document.getElementById("nom").innerHTML = (JSON.stringify(words));
	return words;
}

function Blog({ data }) {
  return (
    <div className={styles.container}>
	<div id="nom"></div>
		  {SearchBar()}
    <ul>
      {data.map((post) => (
        <li>{post.nom}</li>
      ))}
    </ul>
	</div>
  )
}
// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch("http://localhost:5009/api/taynung/na")
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Blog