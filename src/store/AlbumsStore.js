import { makeAutoObservable } from "mobx";

export default class AlbumsStore {
    constructor() {
        this.list = [];
        makeAutoObservable(this);
    }

    setAlbums(list) {
        this.list = list;
    }

    setAlbum(album) {
        this.list = [...this.list, album];
    }

    get albums() {
        return this.list;
    }
}