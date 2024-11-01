'use client'
import { useState } from "react";
import { languages } from "./languages";

export default function Home() {
  const [translated, setTranslated] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-GB");
  const [selectedLanguageToTranslate, setSelectedLanguageToTranslate] = useState("pt-PT")

  const url = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${selectedLanguage}|${selectedLanguageToTranslate}`;

  // Função para buscar a tradução ao clicar no botão
  async function buscar() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTranslated(data.responseData.translatedText);
    } catch (error) {
      console.log('Erro ao buscar dados', error);
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
  

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div className="h-full w-full flex flex-col justify-center items-center">
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
        
      </div>
    </div>
  );
}
