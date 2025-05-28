import { firestore } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

export const getAllDocumentsWithPath = async <DocType>(path: string) => {
  try {
    const collectionRef = collection(firestore, path);
    const querySnapshot = await getDocs(collectionRef);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents as DocType[];
  } catch (error) {
    console.error("Error fetching documents:", error);
    return null;
  }
};
