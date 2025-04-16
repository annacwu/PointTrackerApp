import { firestore } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore"

export const createDocumentWithId = async (
    path: string,
    documentId: string,
    data: object,
) => {
    try {
        if (!path || !documentId) {
            console.log(path);
            console.log(documentId);
            throw new Error("Path and document ID are required.");
        }
        const docRef = doc(firestore, path, documentId);  
        await setDoc(docRef, data); 
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
};