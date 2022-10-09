import './App.css';
import React, { useState } from 'react';

function App() {

  const [seis, setSeis] = useState(["#","#","#","#","#","#","#","#","#"]);
  //const [hinne, setHinne] = useState({});
  //const [maxMin, setMaxMin] = useState([]);
  const [message, setMessage] = useState("Alusta käiguga");

  let v6iduKohad =   [[0, 1, 2],
                      [3, 4, 5],
                      [6, 7, 8],
                      [0, 3, 6],
                      [1, 4, 7],
                      [2, 5, 8],
                      [0, 4, 8],
                      [2, 4, 6]
                      ];

  function kasV6idab(kelleKord){
    for(let i = 0; i < v6iduKohad.length; i++) {
      if(seis[v6iduKohad[i][0]] === kelleKord && 
         seis[v6iduKohad[i][1]] === kelleKord && 
         seis[v6iduKohad[i][2]] === kelleKord){
        return true;
      }
    }
    return false;
  }
    
  function kasL2bi(){
      for(let i=0; i<9; i++){
        if(seis[i]==='#'){
          return false;
        }
      }
    return true;
  }
	  
	function seisuHinnang(kelleKord){
    //setHinne({});
    //setMaxMin([]);
    let hinne = {};
    let maxMin = [];

    // Kontrollib ega mäng läbi pole
    if(kasL2bi()){
      return [0, -1];
    }
    // Kontrollib kas kumbki võidab ja paneb vastava hinde
	  if(kasV6idab('X')){
       return [1, -1];
    }
	  if(kasV6idab('O')){
      return [-1,-1];
    }
		
    for(let i=0; i<9; i++){                                                 // Igale kohale 
		  if(seis[i]==="#"){                                                    // mis on tühi
		    seis[i]=kelleKord;                                                  // paneb käija märgi
			  hinne[seisuHinnang(kelleKord === "X" ? 'O' : 'X')[0]]=i;            // ja võtab kõikide tulevate enda ja vastase käikude hinnangu
			  seis[i]="#";                                                        // Teeb koha tagasi tühjaks
		  }
		}

    if(kelleKord === "X"){                                                  // Inimese korral tagastab kõrgema käigu
      maxMin = Math.max(...Object.keys(hinne));   // Võtab suurima
      return ([maxMin, hinne[maxMin]]);
    } else {                                                                // Arvuti korral tagastab madalama käigu
      maxMin = Math.min(...Object.keys(hinne));   // Võtab väiksema
      return ([maxMin, hinne[maxMin]]);
    }
	}
  
  const handleClick = event =>{
    let nr = event.currentTarget.id;                                        // Võtab ruutu id

    setMessage("");
    if(seis[nr] !== '#'){                                                   // Teatab kas ruut on täidetud ja peatab käigu
      setMessage("Ruut on juba täidetud!");
      return null;
    }

    seis[nr]='X';                                                           // Muudab array seisu
    setSeis(seis);

    document.getElementById(nr).style.backgroundColor = "#85ede3";          // Muudab ruudu värvi

    arvutiK2ik();                                                           // Arvuti käik

    if(kasL2bi()){
      setMessage("Viik!");
    }
	}

  const arvutiK2ik = () => {
    setTimeout(function(){
      let arvuti = seisuHinnang('O');
      seis[arvuti[1]] = 'O';
      document.getElementById(arvuti[1]).style.backgroundColor = "#d4373c";
      if(kasV6idab('O')){
        setMessage("Arvuti võitis!");
      }
    }, 300);
  }

  const automaatK2ik = () => {
    setMessage("");
    let inimene = seisuHinnang('X');
    seis[inimene[1]] = 'X'; 
    document.getElementById(inimene[1]).style.backgroundColor = "#85ede3";  

    arvutiK2ik();
  }

  return (
    <div className="App">
      <div className="grid">
        <div className="divBox" id="0" onClick={handleClick}></div>
        <div className="divBox" id="1" onClick={handleClick}></div>
        <div className="divBox" id="2" onClick={handleClick}></div>
        <div className="divBox" id="3" onClick={handleClick}></div>
        <div className="divBox" id="4" onClick={handleClick}></div>
        <div className="divBox" id="5" onClick={handleClick}></div>
        <div className="divBox" id="6" onClick={handleClick}></div>
        <div className="divBox" id="7" onClick={handleClick}></div>
        <div className="divBox" id="8" onClick={handleClick}></div>  
      </div>
      <input type="button" value="Parim käik" onClick={automaatK2ik}/>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
