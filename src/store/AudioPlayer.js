import { makeAutoObservable } from "mobx";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

export default class AudioPlayer {
  currentTime = 0;
  currentAudioIndex = 0;
  audio = new Audio();
  isPlaying = false;
  progress = 0;

  constructor(list) {
    this.list = list;
    makeAutoObservable(this);

    this.setupTimeUpdate();
    this.setupAudioEnd();
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
      this.currentAudioIndex = null;
    } else {
      this.startPlay(index);
    }
  }

  async startPlay(index) {
    try {
      const file = this.list[index];
      const fileUrl = await getDownloadURL(ref(storage, file.fullPath));
      this.audio.src = fileUrl;
      this.audio.currentTime = this.currentTime;
      this.audio.play();
      this.isPlaying = true;
      this.currentAudioIndex = index;
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
    this.play(this.currentAudioIndex - 1);
  }
  
  nextAudioElement() {
    this.progress = 0;
    this.play(this.currentAudioIndex + 1);
  }
}