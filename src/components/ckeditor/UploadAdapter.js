import axios from 'axios';

export default class UploadAdapter {
    constructor(loader, url) {

        this.url = url;
        this.loader = loader;
        this.loader.file.then(pic => (this.file = pic));

        this.upload();

    }
    upload() {
        const fd = new FormData();
        fd.append('file', this.file);

        return new Promise((resolve, reject) => {
            axios.post(this.url, fd, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    console.log(res.data);
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
}