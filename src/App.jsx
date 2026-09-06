import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import { loadingSpinner } from "./components/Spinner";

const API_BASE_URL ='https://api.themoviedb.org/3';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const API_OPTIONS = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`,
	}
}

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [movieList, setMovieList] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	
	const fetchMovies = async() => {
		setIsLoading(true);
		setErrorMsg('');

		try {
			const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
			const response = await fetch(endpoint, API_OPTIONS);
			if (!response.ok) {
				throw new Error('Failed to Fetch movies');
			}
			const data = await response.json();
			if (data.Response === 'False') {
				setErrorMsg(data.Error || 'Error fetching movies!');
				setMovieList([]);
				return;
			}
			setMovieList(data.results || []);
		} catch (error) {
			console.log(`error in fetching movies: ${error}`);
			setErrorMsg('Error fetching movies! please try again later.');
		} finally {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchMovies();
	}, []);
	return (
	<main>
		<div className="pattern" />

		<div className="wrapper">
			<header>
				<img src="./src/assets/hero.png" alt="Hero Banner" />
				<h1>Find <span className="text-gradient" >Movies</span> You'll Enjoy Without The Hassle</h1>
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			</header>
			<section>
				<h2 className="mt-5">All Movies</h2>
				{
					!isLoading ? (
					<loadingSpinner />
					) : errorMsg ? (
						<p className="text-red-500">{errorMsg}</p>
					) : (
						<ul>
							{movieList.map((movie) => (
									<p key={movie.id} className="text-white">{movie.title}</p>
								)
							)}
						</ul>
					)
				}
			</section>
		</div>
	</main>
	)
}

export default App