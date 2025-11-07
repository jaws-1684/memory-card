export default function MemoryCards({ pokemons, onClickHandler }) {
	return(<div className="pokemons">
		{pokemons.map(pokemon => <div key={pokemon.id} onClick={() => onClickHandler(pokemon.id)} className="pokemon">
			<div className="front">
				<img src={pokemon.sprites.front_default} alt=""/>
				<p>{pokemon.name}</p>
			</div>
			
			<div className="back">
			</div>
		</div>)}
	</div>)
}