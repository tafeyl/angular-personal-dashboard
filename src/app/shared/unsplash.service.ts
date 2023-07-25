import { Injectable } from "@angular/core";
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class UnsplashService {
    private accessKey = 'HITZ4TTM73TUk7DSsIl6thw51Vt42E6TYlakqEGd7U0';

    getRandomImage() {
        const url = `https://api.unsplash.com/photos/random/?client_id=${this.accessKey}`;

        return axios.get(url)
            .then(response => response.data.urls.regular)
            .catch(error => {
                console.error('Error fetching image from Unsplash' + error);
            });
    }
}