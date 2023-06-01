// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsyJQ3T_ks3nl9iaA-k2GhKCUyrWy4GkU",
//   authDomain: "unisabana-class-react.firebaseapp.com",
//   projectId: "unisabana-class-react",
//   storageBucket: "unisabana-class-react.appspot.com",
//   messagingSenderId: "17134130250",
//   appId: "1:17134130250:web:e10d76a8206ce838dbc2b3"
// };

const firebaseConfig = {
  apiKey: "AIzaSyANM1YXF89qqnq7aJcthy6EKDPmt8RK2UQ",
  authDomain: "react-test-6c6af.firebaseapp.com",
  projectId: "react-test-6c6af",
  storageBucket: "react-test-6c6af.appspot.com",
  messagingSenderId: "481070873282",
  appId: "1:481070873282:web:1dbc5141b94b461784595b"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDW3ppX7EVsiuIUtfSLOcQGi9ekbk27uQQ",
//   authDomain: "react-peliculas-8bc39.firebaseapp.com",
//   projectId: "react-peliculas-8bc39",
//   storageBucket: "react-peliculas-8bc39.appspot.com",
//   messagingSenderId: "663660866958",
//   appId: "1:663660866958:web:ce83c68c055d5a47aec8df"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBDSr8j-j8AmK9uB6PZX4FAdzfLWTzoqmk",
//   authDomain: "react-test-2-35c3c.firebaseapp.com",
//   projectId: "react-test-2-35c3c",
//   storageBucket: "react-test-2-35c3c.appspot.com",
//   messagingSenderId: "738377072566",
//   appId: "1:738377072566:web:212cdc585ef635f8570b17"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);