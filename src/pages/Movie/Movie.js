import React from 'react';
import './Movie.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import apiConfig from '../../api/apiConfig';
import PulseLoader from "react-spinners/PulseLoader";

const Movie = () => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [valueSeach, setValueSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();
    const { category, type, keyword } = useParams();

    const onValueChange = (e) => {
        setValueSearch(e.target.value);
    }
    const enterEvent = (e) => {
        if (e.keyCode === 13) {
            navigate(`/${category}/search/${valueSeach}`)
            document.location.reload();
        }
    }
    useEffect(() => {
        document.addEventListener('keyup', enterEvent);
        const getVideoList = async () => {
            setLoading(true)
            if (keyword === undefined) {
                const params = {
                    page: page
                }

                if (category === 'movie') {
                    const response = await tmdbApi.getMoviesList(type, { params })
                    response.results.forEach(element => {
                        setItems(prev => [...prev, element])
                    });
                }
                else {
                    const response = await tmdbApi.getTvList(type, { params })
                    response.results.forEach(element => {
                        setItems(prev => [...prev, element])
                    });
                }
            }
            else {
                const params = {
                    query: keyword,
                    page: page
                }
                try {
                    const response = await tmdbApi.search(category, { params })
                    response.results.forEach(element => {
                        setItems(prev => [...prev, element])
                    });

                    if (response.results.length === 0) {
                        setNotFound(true)
                    }
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            }
            setLoading(false);
        }

        getVideoList();
    }, [page]);
    return (
        <>
            {loading && <div className='overlay'><PulseLoader color="#FF0000" /></div>}

            <div className='moviepage'>
                {notFound ?
                    <div>
                        <h1>Not Found</h1><br />
                        <Link to={`/${category}/popular`}>Quay lai</Link>
                    </div> :
                    <>
                        <div className='search'>
                            <input type='text' placeholder='Nhập từ khóa' onChange={(e) => onValueChange(e)} />
                        </div>
                        <div className='movieGrid__container container'>
                            {items.map((e, i) => (
                                <MovieCard key={i} image={apiConfig.w500Image(e.poster_path)} id={e.id} title={e.title || e.name} category={category} />
                            ))}
                        </div>
                        <button className='btn' onClick={() => setPage(prev => prev + 1)}>Load More</button>
                    </>
                }
            </div>
        </>
    )
}

export default Movie