import React from 'react';
import './Movie.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import apiConfig from '../../api/apiConfig';

const Movie = () => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [valueSeach, setValueSearch] = useState('');

    const navigate = useNavigate();
    const { category, type, keyword } = useParams();

    const getVideoList = async () => {
        console.log('a')
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page
            }

            if (category === 'movie') {
                response = await tmdbApi.getMoviesList(type, { params })

            }
            else if (category === 'tv') {
                response = await tmdbApi.getTvList(type, { params })
            }
        }
        else {
            const params = {
                query: keyword
            }
            try {
                response = await tmdbApi.search(category, { params })
            } catch (error) {
                console.log(error)
            }
        }
        setItems(response.results)
    }

    const loadMore = async () => {
        console.log('b')
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            }

            if (category === 'movie') {
                response = await tmdbApi.getMoviesList(type, { params })
            }
            else if (category === 'tv') {
                response = await tmdbApi.getTvList(type, { params })
            }
        }
        else {
            const params = {
                query: keyword
            }
            try {
                response = await tmdbApi.search(category, { params })
            } catch (error) {
                console.log(error)
            }
        }
        response.results.forEach(element => {
            setItems(prev => [...prev, element])
        });
        setPage(page + 1);
    }

    const onValueChange = (e) => {
        setValueSearch(e.target.value);
    }
    const enterEvent = (e) => {
        if (e.keyCode === 13) {
            navigate(`/${category}/search/${valueSeach}`)
            getVideoList();
        }
    }
    useEffect(() => {
        getVideoList();
    }, [category, type, keyword]);
    return (
        <>

            <div className='moviepage'>
                <div className='search'>
                    <input type='text' placeholder='Nhập từ khóa' onChange={(e) => onValueChange(e)} onKeyDown={(e) => enterEvent(e)} />
                </div>
                <div className='movieGrid__container container'>
                    {items.map((e, i) => (
                        <MovieCard key={i} image={apiConfig.w500Image(e.poster_path)} id={e.id} title={e.title || e.name} category={category} />
                    ))}
                </div>
                <button className='btn' onClick={loadMore}>Load More</button>
            </div>
        </>
    )
}

export default Movie