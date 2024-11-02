'use client'
import { useState, useEffect } from "react";
import { languages } from "./languages";

export default function Home() {
  const [translated, setTranslated] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-GB");
  const [selectedLanguageToTranslate, setSelectedLanguageToTranslate] = useState("pt-PT")
  const [completedHistory, setCompleteHistory] = useState([])
  let completeHistory = []

  const url = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${selectedLanguage}|${selectedLanguageToTranslate}`;

  // Função para buscar a tradução ao clicar no botão

  let dadosHistoricos = []
  

    async function buscar() {
      if(textToTranslate.length>0){ 
        try {
          const response = await fetch(url);
          const data = await response.json();
          setTranslated(data.responseData.translatedText);
        } catch (error) {
          console.log('Erro ao buscar dados', error);
        }
      }
      
    }
 
  

  const changeLanguage = () =>{
    const temp = selectedLanguage;
    setSelectedLanguage(selectedLanguageToTranslate);
    setSelectedLanguageToTranslate(temp)
  }

 
  const handleTextChange = (e) => {
    setTextToTranslate(e.target.value);
  };

  const handleLanguageKey = (e) => {
    setSelectedLanguage(e.target.value)
  }
  const handleSelectLanguageToTranslate = (e) => {
    setSelectedLanguageToTranslate(e.target.value)
  }
  const deleteStorage = () => {
    localStorage.clear()
    setCompleteHistory([])
    
   
    
  }

  if (typeof window !== "undefined") {
    // Aqui, o localStorage estará disponível
    localStorage.setItem('key', 'value');
  }
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      
        const historico = JSON.parse(localStorage.getItem('historico')) || [];
        if(textToTranslate.length>0) {
      historico.push({ original: textToTranslate, translated, date: new Date().toLocaleString() });
        }
      localStorage.setItem('historico', JSON.stringify(historico));
      historico.map((data) =>completeHistory.push(data.original))
      setCompleteHistory(completeHistory)
      
      
      
      
           
    }
  }, [translated]);

 
  console.log(completedHistory)
  
  

  return (
    <div className=" h-full min-h-screen w-full bg-blue-200">
      <div className=" flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col m-10">
            <textarea
              onChange={handleTextChange}
              value={textToTranslate}
              className="w-96 h-72 text-2xl bg-red-400 resize-none"
              placeholder="Digite o texto para traduzir"
            ></textarea>
            <select value={selectedLanguage} onChange={handleLanguageKey} className="mt-2">
              {Object.entries(languages).map(([key, name])=>
                <option  key={key} value={key}>{name}</option>
              )}
              
            </select>
          </div>

          <div className="flex flex-col justify-center m-10">
            <textarea
              value={translated}
              readOnly
              className="w-96 h-72 bg-red-400 resize-none"
              placeholder="Tradução aparecerá aqui"
            ></textarea>
            <select value={selectedLanguageToTranslate} onChange={handleSelectLanguageToTranslate} className="mt-2 ">
              {Object.entries(languages).map(([key, name])=>
                <option key={key} value={key}>{name}</option>
              )}
              
            </select>
          </div>
        </div>
        <button
          onClick={changeLanguage}  // Chama a função de tradução ao clicar no botão
          className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Trocar
        </button>
        <button
          onClick={buscar}  // Chama a função de tradução ao clicar no botão
          className="bg-blue-500 mt-2 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Traduzir
        </button>
        <button
          onClick={deleteStorage}  // Chama a função de tradução ao clicar no botão
          className="bg-red-400 mt-2 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Deletar palavras salvas
        </button>
        
        
        <div>
          <div className="grid grid-cols-4	">
          {completedHistory.map((item, index) =>
              <div key={index} className="w-32 h-32 bg-slate-600 m-5">
                {item}
              </div>
            )}
          </div>
          
            
                          
        </div>
        
        
      </div>
    </div>
  );
}
