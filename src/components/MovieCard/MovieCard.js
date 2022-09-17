import React from 'react';
import './MovieCard.scss';
import { Link } from 'react-router-dom';
import imgPlay from '../../assets/tmovie.png';

const MovieCard = ({ image, id, title, category }) => {
    return (
        <Link to={`/detail/${category}/${id}`} >
            <div className='movie-card' style={{ backgroundImage: `url(${image})` }}>
                <div className='play-btn'>
                    <img src={imgPlay} alt='play-icon-image'></img>
                </div>
            </div>
            <h4>{title}</h4>
        </Link>
    )
}

export default MovieCard;