import { getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "./firebase";

export const getAudioList = async () => {
    try {
        const folderRef = ref(storage, 'music/');
        const fileList = await listAll(folderRef);
    
        const files = [];
    
        await Promise.all(fileList.items.map(async (itemRef) => {
            const metadata = await getMetadata(itemRef);
      
            files.push({
                name: metadata.name,
                fullPath: metadata.fullPath,
                size: metadata.size,
                contentType: metadata.contentType,

            });
        }));
    
        return files;
    } catch (error) {
        console.error('Помилка отримання файлів з папки:', error);
        throw error;
    }
};