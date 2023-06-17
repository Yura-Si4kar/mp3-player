import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Отримання посилання на об'єкт Firebase Storage
const storage = getStorage();

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
