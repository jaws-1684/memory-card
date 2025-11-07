import { useState, useEffect } from 'react'
import MemoryCards from "./MemoryCards.jsx"
import './App.css'
async function fetchPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0").then(response => response.json())
  const urls = response.results.map(obj => obj.url)

  const pokemons = urls.map(url => fetch(url).then(response => response.json()))
  return Promise.all(pokemons)
}
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function App() {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [collectedPokemons, setCollectedPokemons] = useState([])
  
  const onClickHandler = (id) => {
    if (collectedPokemons.some(pid => pid === id)) {
      setScore(0)
      setCollectedPokemons([])
    } else {
      setScore(score + 1)
      setCollectedPokemons([...collectedPokemons, id])
    }

    let newPokemons = [...pokemons]
    shuffle(newPokemons)
    setPokemons(newPokemons)
  }
  useEffect(() => {
    if(pokemons.length == 0) { 
      fetchPokemons().then(pokemons => {
        setPokemons(pokemons)
      })
    }
  }, [])
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [score, bestScore])
  return (<div className="container">
    <header id="page-header">
    <div id="masthead">
      <h1>Memory Card</h1>
    </div>
  </header>
    <div className="scores">
      <p>Best score: {bestScore}</p>
      <p>Score: {score}</p>
    </div>
    <MemoryCards onClickHandler={onClickHandler} pokemons={pokemons}/>
    <footer id="page-footer">
    <p>
      Copyright &copy; 2025
    </p>
    <p>
     MemoryCard
    </p>
  </footer>
    </div>)
}

export default App