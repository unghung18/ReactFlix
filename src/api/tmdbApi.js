import axiosClient from "./axiosClient";

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + type;
        return axiosClient.get(url, params);
    },
    getTrailerVideos: (cate, id) => {
        const url = cate + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    getTvList: (type, params) => {
        const url = 'tv/' + type;
        return axiosClient.get(url, params);
    },
    search: (cate, params) => {
        const url = 'search/' + cate;
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = cate + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = cate + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = cate + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
}

export default tmdbApi;