import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const albumsCollection = collection(db, 'albums');

export const getAlbumsList = () => {
  return getDocs(albumsCollection)
    .then((querySnapshot) => {
      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push({ ...doc.data(), id: doc.id });
      });
      return albums;
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
};

export const addAlbumToStore = async (album) => {
  try {
    const docRef = await addDoc(albumsCollection, album);
    console.log('Album written with ID:', docRef.id);
    const querySnapshot = await getDocs(albumsCollection);
    const albums = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return albums;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const deleteAlbumFromStore = async (albumId) => {
  try {
    const albumDocRef = doc(albumsCollection, albumId);
    await deleteDoc(albumDocRef);
    console.log('Album deleted with ID:', albumId);
    const querySnapshot = await getDocs(albumsCollection);
    const albums = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return albums;
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};