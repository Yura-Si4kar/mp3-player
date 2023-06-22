import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, getMetadata } from "firebase/storage";

// Отримання посилання на об'єкт Firebase Storage
export const storage = getStorage();

// Функція для завантаження фото
export const uploadPhoto = async (file) => {
  const storageRef = ref(storage, "pictures/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

// Функція для завантаження фото
export const uploadAudio = async (file) => {
  const storageRef = ref(storage, "music/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

export const getAudioList = async () => {
  try {
    const folderRef = ref(storage, 'music/');
    const fileList = await listAll(folderRef);
    
    // Масив для збереження об'єктів файлів
    const files = [];
    
    // Пройтися по кожному файлу та отримати його метадані
    await Promise.all(fileList.items.map(async (itemRef) => {
      const metadata = await getMetadata(itemRef);
      
      // Додати об'єкт файлу до масиву
      files.push({
        name: metadata.name,
        fullPath: metadata.fullPath,
        size: metadata.size,
        contentType: metadata.contentType,
        // Додайте інші властивості, які вам потрібні
      });
    }));
    
    return files;
  } catch (error) {
    console.error('Помилка отримання файлів з папки:', error);
    throw error;
  }
};