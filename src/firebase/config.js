import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_APP_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_APP_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_APP_FIREBASE_appId,
  measurementId: import.meta.env.VITE_APP_FIREBASE_measurementId
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadImage(file,filename) {
    const storageRef = ref(storage,'profiles/' + filename)
    await uploadBytes(storageRef,file)
    return await getDownloadURL(storageRef)
}

export async function deleteImage(filename) {
    const storageRef = ref(storage,'profiles/' + filename)
    await deleteObject(storageRef)
}
export async function deleteImage2(filename) {
  const storageRef = ref(storage,filename)
  await deleteObject(storageRef)
}