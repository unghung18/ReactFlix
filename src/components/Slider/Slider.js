import React from 'react';
import { useState } from 'react';
import './Slider.scss';
import apiConfig from '../../api/apiConfig';
import Modal from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';



const Slider = ({ data }) => {

    const navigate = useNavigate();
    console.log(data)

    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)} id={data.id} />
            <div className='slider__myslide' style={{ backgroundImage: `url(${apiConfig.originalImage(`${data.backdrop_path}`)})` }}>
                <div className='container slider__container'>
                    <div className='slider__container__content'>
                        <h2 className="title">{data.title}</h2>
                        <div className="overview">{data.overview}</div>
                        <div className="btns">
                            <button className='btn' onClick={() => navigate(`/detail/movie/${data.id}`)}>
                                Watch now
                            </button>
                            <button className='btn' onClick={() => setOpenModal(true)}>
                                Watch trailer
                            </button>
                        </div>
                    </div>
                    <div className='slider__container__poster'>
                        <img src={apiConfig.originalImage(`${data.poster_path}`)} alt='poster'></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slider