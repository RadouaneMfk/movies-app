import React from "react";

export const MovieCard = ({movie : {title, release_date, vote_average, original_language, poster_path}}) => {
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'No-Poster.png'} alt="poster" />
            <div className="mt-5">
                <h3>{title}</h3>
            </div>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    )
}
