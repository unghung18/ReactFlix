import React, { useState, useEffect } from 'react';
import './MovieList.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/scss';
import tmdbApi from '../../api/tmdbApi';
import MovieCard from '../MovieCard/MovieCard';
import apiConfig from '../../api/apiConfig';

const MovieList = ({ category, type, id }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {
                page: 1
            }
            if (type !== 'similar') {
                if (category === 'movie') {
                    response = await tmdbApi.getMoviesList(type, { params });
                }
                else {
                    response = await tmdbApi.getTvList(type, { params });
                }
            }
            else {
                response = await tmdbApi.similar(category, id);
            }
            setItems(response.results);
        }
        getList();
    }, []);
    return (
        <div className='list-movie'>
            <Swiper
                breakpoints={{
                    1024: {
                        slidesPerView: 6,
                    },
                    600: {
                        slidesPerView: 4,
                    },
                    0: {
                        slidesPerView: 2,
                    },
                }}
                modules={[]}
                spaceBetween={12}
                slidesPerView={6}
                grabCursor={true}
            >
                {items.map((e, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard image={apiConfig.w500Image(e.poster_path)} id={e.id} title={e.title || e.name} category={category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MovieList