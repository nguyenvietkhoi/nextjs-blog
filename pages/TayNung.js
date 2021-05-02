import Head from 'next/head'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import { taynung } from "../data.js";

var words = null; 


const SearchBar = (dict) => (
	<>
        <input className={["textpad", styles.box].join(' ')} style={{color: "#000", maxWidth: "220px"}}
            type="text"
            id="txtPad"
            placeholder="Từ cần tra..."
            name="ori" 
        />
        <button onClick={(evt) => lookupOri(dict, evt)} className={styles.button}>Tra</button>
	</>
);
const lookupOri = async (dict, event) => {
	event.preventDefault();
    var orireq = document.getElementById("txtPad").value;
	var dictnumber = dict?"2":"1";
    const req = await fetch('./api/taynung/' + dictnumber +'/'+ orireq);
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
  const [showMe, setShowMe] = useState(false);
  const [dict2, setDict2] = useState(false);
  var dict = false;
  var dictname1 = "Tày Nùng → Việt";
  var dictname2 = "Việt → Tày Nùng";
  function toggle(){
    setShowMe(!showMe);
  }
  function inverse(){
    setDict2(!dict2);
  }
  return (
  <>
    <div className={styles.container}>
      <Head>
        <title>TĐ Tày Nùng</title>
      </Head>
        <link rel="icon" href="/favicon.ico" />
		
        <h3 className={styles.title} style={{margin: "2rem", fontSize: "30px", color: "#DDC326"}}>
          Từ điển <box className={styles.button} onClick={inverse} style={{background: "#232323", fontSize: "30px", color: "#eee"}}><a>{dict2?dictname2:dictname1}</a></box>
        </h3>

    <div style={{padding: "5px 0"}}>
		  {SearchBar(dict2)}
			  <button onClick={toggle} className={styles.button} style={{fontSize: "14px"}}>⌨️</button>
    </div>
		<div style={{margin: "0",display: showMe?"block":"none"}}>
<table className={"textpad"}>
  <tr>
    <td></td><td>ă</td><td>â</td><td>đ</td><td>ê</td><td>j</td><td>z</td><td>ô</td><td>ơ</td><td>f</td><td>ư</td><td>đ</td>
  
    <td>à</td><td>ằ</td><td>ầ</td><td>è</td><td>ề</td><td>ì</td><td>ò</td><td>ồ</td><td>ờ</td><td>ù</td><td>ừ</td><td>ỳ</td>
  </tr><tr>
    <td>á</td><td>ắ</td><td>ấ</td><td>é</td><td>ế</td><td>í</td><td>ó</td><td>ố</td><td>ớ</td><td>ú</td><td>ứ</td><td>ý</td>
  
    <td>a̱</td><td>ă̱</td><td>â̱</td><td>e̱</td><td>ê̱</td><td>i̱</td><td>o̱</td><td>ô̱</td><td>ơ̱</td><td>u̱</td><td>ư̱</td><td>y̱</td>
  </tr><tr>
    <td>ả</td><td>ẳ</td><td>ẩ</td><td>ẻ</td><td>ể</td><td>ỉ</td><td>ỏ</td><td>ổ</td><td>ở</td><td>ủ</td><td>ử</td><td>ỷ</td>
  
    <td>ạ</td><td>ặ</td><td>ậ</td><td>ẹ</td><td>ệ</td><td>ị</td><td>ọ</td><td>ộ</td><td>ợ</td><td>ụ</td><td>ự</td><td>ỵ</td>
  </tr>
</table>
		</div>
		
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