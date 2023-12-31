import { makeAutoObservable } from "mobx";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";

export default class AudioPlayer {   
    constructor() {
        this._list = [];
        this._currentAlbumList = []
        this.currentTime = 0;
        this.currentAudioIndex = 0;
        this.audio = new Audio();
        this.isPlaying = false;
        this.progress = 0;
        makeAutoObservable(this);

        this.setupTimeUpdate();
        this.setupAudioEnd();
    }

    setAudioList(list) {
        const updatedList = list.map((item) => ({ ...item, id: v4(), source: 'list' }));
        this._list = updatedList;
    }

    setCurrentAlbumList(list) {
        this._currentAlbumList = list;
    }

    setAudio(audio) {
        this._list = [...this._list, audio];
    }

    setAudioToCurrentAlbum(audio) {
        this._currentAlbumList = [...this._currentAlbumList, audio];
    }

    deleteAudioFromCurrentAlbumList(id) {
        this._currentAlbumList = this._currentAlbumList.filter((el) => el.id !== id);
    }

    get list() {
        return this._list;
    }

    get currentAlbumList() {
        return this._currentAlbumList;
    }

    setupTimeUpdate() {
        this.audio.addEventListener("timeupdate", () => {
            const currentTime = this.audio.currentTime;
            const duration = this.audio.duration;
            const calculateProgress = (currentTime / duration) * 100;
            this.progress = calculateProgress;
        });
    }

    setupAudioEnd() {
        this.audio.addEventListener("ended", () => {
            this.isPlaying = false;
            this.currentTime = 0;
            this.currentAudioIndex++;
            this.startPlay(this.currentAudioIndex);
        });
    }

    play(index) {
        if (this.isPlaying && this.currentAudioIndex === index) {
            this.audio.pause();
            this.isPlaying = false;
            this.progress = 0;
        } else if (index === 0 || index === undefined) {
            this.startPlay(this.currentAudioIndex);
        } else {
            this.startPlay(index);
        }
    }

    async startPlay(index) {
        try {
            this.currentAudioIndex = index;
            const file = this.list[index];
            const fileUrl = await getDownloadURL(ref(storage, file.fullPath));
            this.audio.src = fileUrl;
            this.audio.currentTime = this.currentTime;
            this.audio.play();
            this.isPlaying = true;
        } catch (error) {
            console.log("Помилка завантаження аудіозапису", error);
            throw error;
        }
    }

    handleProgressClick(e) {
        if (this.audio.currentTime) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progressBarWidth = progressBar.offsetWidth;
            const progressPercentage = (clickX / progressBarWidth) * 100;
            const seekTime = (progressPercentage * this.audio.duration) / 100;

            this.audio.currentTime = seekTime;
            this.currentTime = seekTime;
        }
    }

    handleChangeVolume(value) {
        this.audio.volume = value / 10;
    }
    
    previousAudioElement() {
        this.progress = 0;
        if (this.currentAudioIndex === 0) {
            this.play(this._list.length - 1);
        } else {
            this.play(this.currentAudioIndex - 1);
        }
    }
    
    nextAudioElement() {
        this.progress = 0;
        console.log(this.currentAudioIndex === this._list.length - 1);
        if (this.currentAudioIndex === this._list.length - 1) {
            this.currentAudioIndex = 0;
            this.play(this.currentAudioIndex);
        } else {
            this.play(this.currentAudioIndex + 1);
        }
    }
}