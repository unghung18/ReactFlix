import React, { useState, useEffect } from 'react';
import './Home.scss';
import tmdbApi from '../../api/tmdbApi';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import Slider from '../../components/Slider/Slider';
import MovieList from '../../components/MovieList/MovieList';
import PulseLoader from "react-spinners/PulseLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [slideItems, setSlideItems] = useState([]);

    const getMoviesPopular = async () => {
        setLoading(false)
        try {
            const params = {}
            const response = await tmdbApi.getMoviesList('popular', { params });
            setSlideItems(response.results.slice(1, 6));
        } catch {
            console.log('error');
        }
        setLoading(false)
    }
    useEffect(() => {
        getMoviesPopular();
    }, []);
    return (
        <>
            {loading && <div className='overlay'><PulseLoader color="#FF0000" /></div>}
            <Swiper
                className='slider'
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                speed={400}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}

            >
                {slideItems.map((e, i) => (
                    <SwiperSlide key={i}>
                        <Slider data={e} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='section container'>
                <div className='section__header'>
                    <h2>Trending Movies</h2>
                    <Link to='/movie/popular' className='btn'>ViewMore</Link>
                </div>
                <MovieList category='movie' type='popular' />
            </div>
            <div className='section container'>
                <div className='section__header'>
                    <h2>Top Rated Movies</h2>
                    <Link to='/movie/top_rated' className='btn'>ViewMore</Link>
                </div>
                <MovieList category='movie' type='top_rated' />
            </div>
            <div className='section container'>
                <div className='section__header'>
                    <h2>Trending TV</h2>
                    <Link to='/tv/popular' className='btn'>ViewMore</Link>
                </div>
                <MovieList category='tv' type='popular' />
            </div>
            <div className='section container'>
                <div className='section__header'>
                    <h2>Top Rated TV</h2>
                    <Link to='/tv/top_rated' className='btn'>ViewMore</Link>
                </div>
                <MovieList category='tv' type='top_rated' />
            </div>
        </>
    )
}

export default Home