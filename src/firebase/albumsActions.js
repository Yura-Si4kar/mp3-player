import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { getAuthUserId } from "./userActions";
import { ALBUMS_COLLECTION_NAME, USERS_COLLECTION_NAME } from "../utils/consts";

const db = getFirestore(app);

export const albumsCollection = collection(db, ALBUMS_COLLECTION_NAME);

export async function getAlbumsCollectionRef() {
  const userId = await getAuthUserId();
  const userCollectionRef = collection(db, USERS_COLLECTION_NAME);
  const userDocRef = doc(userCollectionRef, userId);
  const albumsCollectionRef = collection(userDocRef, ALBUMS_COLLECTION_NAME);

  return albumsCollectionRef;
}

export const getAlbumsList = async () => {
  try {
    const albumsCollectionRef = await getAlbumsCollectionRef();
    const querySnapshot = await getDocs(albumsCollectionRef);
    const albums = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return albums;
  } catch (error) {
    console.error("Error getting albums: ", error);
    throw error;
  }
};

export const addAlbumToStore = async (album) => {
  try {
    const albumsCollectionRef = await getAlbumsCollectionRef();
    const docRef = await addDoc(albumsCollectionRef, album);
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