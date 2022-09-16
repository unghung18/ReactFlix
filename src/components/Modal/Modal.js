import React, { useState } from 'react';
import { useEffect } from 'react';
import './Modal.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import tmdbApi from '../../api/tmdbApi';

const Modal = ({ open, onClose, id }) => {
    const [keyTrailer, setKeyTrailer] = useState('');

    useEffect(() => {
        const GetVideos = async () => {
            try {
                const response = await tmdbApi.getTrailerVideos('movie', id);
                const trailerIndex = response.results.findIndex(e => e.type === 'Trailer');
                setKeyTrailer(response.results[trailerIndex].key)
            } catch {
                console.log('error');
            }
        }
        GetVideos();
    }, [keyTrailer]);

    if (!open) return null
    return (
        <div className='overlay'>
            <div className='modal__container'>
                <AiOutlineCloseCircle className='close-modal' onClick={onClose} />
                <iframe src={`https://www.youtube.com/embed/${keyTrailer}`} title='trailer'></iframe>
            </div>
        </div>
    )
}

export default Modal