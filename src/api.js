
//https://pixabay.com/api/?key=36868746-ee27fcb4cfd12995e4eac6ca6&image_type=photo&orientation=horizontal&safesearch=true
import axios from "axios";
import Notiflix, { Notify } from "notiflix";
const URL = "https://pixabay.com/api/";
const API_KEY = "36868746-ee27fcb4cfd12995e4eac6ca6";


async function getNews(query, page=1) {
    // return fetch(`${URL}?key=${API_KEY}&q=${query}image_type=photo&orientation=horizontal&safesearch=true`).then((res) => res.json());
    try {
        const resp = await axios.get(URL, {
        params: {
            q: query,
            key: API_KEY,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page: 40,

        }
    });
    return resp.data;
    } catch (error) {
        Notify.failure(error.message);
    }
}

// getNews(q).then((result) => console.log(result));
export default { getNews };

