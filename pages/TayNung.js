import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { taynung } from "../data.js";

var words = null; 


const SearchBar = () => (
    <div style={{padding: "5px 0"}}>
        <input className={["textpad", styles.box].join(' ')} style={{color: "#000", maxWidth: "220px"}}
            type="text"
            id="txtPad"
            placeholder="Từ cần tra..."
            name="ori" 
        />
        <button onClick={lookupOri} className={styles.button}>Tra</button>
    </div>
);
const lookupOri = async (event) => {
	event.preventDefault();
    var orireq = document.getElementById("txtPad").value;
    const req = await fetch('./api/taynung/' + orireq);
    words = await req.json();	

if (words != null) {
	var mainstr = "";
for (var i=0; i<words.length; i++) {
	mainstr += "<h1 class='textpad'><a style='font-size: 5rem; font-weight: normal'>"+words[i].nom+"</a>&nbsp;&nbsp;<a style='font-size: 2rem'>"+words[i].ori+"</a>&nbsp;&nbsp;<a style='color: #eee;font-size: 1.5rem; font-weight: normal'>"+words[i].ety+"</a></h1>";
	for (var j=0; j<words[i].meanings.length; j++) {
		mainstr += "<p class='"+styles.description+"'>➢&nbsp;&nbsp;&nbsp;&nbsp;"+ words[i].meanings[j].mean +"</p><div>";
		for (var k=0; k<words[i].meanings[j].examples.length; k++) {
			mainstr += "<div class='"+styles.card+"'><p class='textpad'>"+ words[i].meanings[j].examples[k].oriEg + "</p><p>&rarr; " + words[i].meanings[j].examples[k].vietEg +"</p></div>";			
		}
		mainstr += "</div>";
	}
}
	document.getElementById("maincontent").innerHTML =  (mainstr);
				}
};


export default function Home() {
  return (
  <>
    <div className={styles.container}>
      <Head>
        <title>TĐ Tày Nùng</title>
        <link rel="icon" href="/favicon.ico" />
		
        <h3 className={styles.title} style={{margin: "1rem", fontSize: "30px", color: "#DDC326"}}>
          Từ điển Tày Nùng - Việt
        </h3>
		
      </Head>

		  {SearchBar()}
			  
      <main className={styles.main}>   	
	<div id="maincontent"></div>
      </main>

      <footer className={styles.footer}>
        <p style = {{margin: 0}}>
         Tác giả: Lương Bèn (chủ biên) - Nông Viết Toại - Lương Kim Dung - Lê Hương Giang  © 2011 {'\n'}
        </p><br/>
        <a
          rel="noopener noreferrer"
        >
          © 2021{' '}
          <img src="/favicon.ico" alt="Vercel Logo" className={styles.logo} />
			  &nbsp;Linguaevum
        </a>
      </footer>
    </div>
	</>
  )
}