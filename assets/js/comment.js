// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getFirestore, getDoc, getDocs, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPben4fGNDv1YZ_lLSjMIw4BEanJ7Mh4I",
  authDomain: "blog-comment-cefae.firebaseapp.com",
  projectId: "blog-comment-cefae",
  storageBucket: "blog-comment-cefae.appspot.com",
  messagingSenderId: "963961969565",
  appId: "1:963961969565:web:335d6da5fed67436d06d74",
  measurementId: "G-SMP66J9DC7"
};

// https://firebase.google.com/docs/firestore/query-data/get-data

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
console.log('app', app)
console.log('db', db)

export async function getcomments() {
  const postname = decodeURIComponent(location.toString().split('/')[3]).replace(/\.html$/, '')
  if (!postname) return

  const comments = await getcomments(postname)
  console.log('comments', comments)


  const docRef = doc(db, "comment", postname);
  const getdocs = collection(docRef, "comment")
  const docSnaps = await getDocs(getdocs);
  docSnaps.forEach(v => comments[v.id] = v.data())
  return comments
}

const comments = await getcomments(postname)
console.log('comments', comments)


