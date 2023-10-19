import { makeAutoObservable } from "mobx";

export default class AlbumsStore {
    constructor() {
        this._list = [];
        makeAutoObservable(this);
    }

    setAlbums(list) {
        this._list = list;
    }

    setAlbum(album) {
        this._list = [...this._list, album];
    }

    get albums() {
        return this._list;
    }
}