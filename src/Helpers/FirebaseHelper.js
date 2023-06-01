import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy, limit} from "firebase/firestore"; 
import { db } from "../firebase";

const addFavoriteFirebase = async ({objectToSave}, collectionName) => {
    try{
        const docRef = await addDoc(collection(db, collectionName), objectToSave);
        console.log("Document written to table " + collectionName + " with ID: ", docRef.id);
        console.log(objectToSave);
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

const getFromFirebase  = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = [];
        querySnapshot.forEach((doc) => {                    
            docs.push({...doc.data(),id: doc.id});
        });        
        console.log(JSON.stringify(docs));
        return docs;
    } catch (e) {
        console.log(e);
    }
}

const getFromFirebaseTop  = async (collectionName, resultlimit = null) => {
    try {
        let ref = collection(db, collectionName);

        let finalQuerry = query(ref,orderBy('createdAt', 'desc'));

        if(resultlimit){
            finalQuerry = query(finalQuerry,limit(resultlimit));
        }

        const querySnapshot = await getDocs(finalQuerry);
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({id:doc.id, data: doc.data()});
        });
        return results;
    } catch (e){
        console.error("Error getting documents: ", e);
        return [];
    }
}

const updateFromFirebase = async (idRef, collectionName) =>{
    await updateDoc(doc(db,collectionName, idRef), { fav: true });
}

const deleteFromFirebase = async (idRef, collectionName) =>{
    try{
        await deleteDoc(doc(db, collectionName, idRef ));
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

// const checkFromFirebase = async (idRef, collectionName) =>{
//     try{
//         await getDoc(doc(db, collectionName, idRef));
//     } catch (e) {
//         console.error("Error getting documents: ", e);
//     }
// }

export { addFavoriteFirebase, updateFromFirebase, deleteFromFirebase, getFromFirebase, getFromFirebaseTop};