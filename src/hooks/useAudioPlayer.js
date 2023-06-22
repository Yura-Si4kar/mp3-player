import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/uploadFiles";

export function useAudioPlayer(file) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audio] = useState(new Audio());
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const calculateProgress = (currentTime / duration) * 100;
            setProgress(calculateProgress);
        };

        audio.addEventListener("timeupdate", updateProgress);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, []);

    const startPlay = async () => {
        if (!isPlaying) {
            try {
                const audioURL = await getDownloadURL(ref(storage, file.fullPath));
                audio.src = audioURL;
                audio.currentTime = currentTime;
                audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Все, музики не буде!!!", error);
                throw error;
            }
        } else {
            audio.pause();
            setCurrentTime(audio.currentTime);
            setIsPlaying(false);
        }
    };

    const handleProgressClick = (e) => {
        if (isPlaying) {
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

    const setVolume = (volume) => {
        audio.volume = volume / 10;
    }

    return { isPlaying, progress, startPlay, handleProgressClick, setVolume };
}
