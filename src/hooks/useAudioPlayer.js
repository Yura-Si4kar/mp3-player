import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/uploadFiles";

export function useAudioPlayer(list) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audio] = useState(new Audio());
    const [progress, setProgress] = useState(0);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(null);

    useEffect(() => {
        const updateProgress = () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const calculateProgress = (currentTime / duration) * 100;
            setProgress(calculateProgress);
        };

            audio.addEventListener('timeupdate', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    useEffect(() => {
        const handleAudioEnd = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setCurrentAudioIndex(currentAudioIndex + 1);
            startPlay(currentAudioIndex + 1);
        };

            audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [currentAudioIndex]);

    const handleProgressClick = (e) => {
        if (audio.currentTime) {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progressBarWidth = progressBar.offsetWidth;
            const progressPercentage = (clickX / progressBarWidth) * 100;
            const seekTime = (progressPercentage * audio.duration) / 100;

            audio.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const startPlay = async (index) => {
        if (index !== currentAudioIndex) {
            try {
                const file = list[index];
                const fileURL = await getDownloadURL(ref(storage, file.fullPath));
                audio.src = fileURL;
                audio.currentTime = currentTime;
                audio.play();
                setIsPlaying(true);
                setCurrentAudioIndex(index);
            } catch (error) {
                console.log('Помилка завантаження аудіозапису', error);
                throw error;
            }
        } else {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        }
    };

    return { isPlaying, setIsPlaying, progress, startPlay, handleProgressClick, currentAudioIndex };
}