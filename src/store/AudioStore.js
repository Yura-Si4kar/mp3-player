import { makeAutoObservable } from "mobx";

export default class AudioStore {
    constructor() {
        this._list = [];
        makeAutoObservable(this);
    }

    setAudioList(list) {
        this._list = list;
    }

    setAudio(audio) {
        this._list = [...this._list, audio];
    }

    get list() {
        return this._list;
    }
}