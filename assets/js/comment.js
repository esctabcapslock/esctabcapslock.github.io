const encodedStr = r=>r.replace(/[\u00A0-\u9999<>\&]/gi, i=>'&#'+i.charCodeAt(0)+';');


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getFirestore, getDoc, getDocs, doc, setDoc, collection, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
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



let _postname = undefined
const postname = _postname?_postname:decodeURIComponent(location.toString().split('/')[3]).replace(/\.html$/, '')
if (!postname) throw('postname 잘못됨')
const getdocsRef = collection(db, "comment", postname, "comment")

export async function getcomments(_postname) {
  

  const docSnaps = await getDocs(getdocsRef);
  const comments = []
  docSnaps.forEach(v => comments.push([v.id, v.data()]))
  return comments
}


export async function setcomments(user, body){
  if(typeof user != "string") throw('user가 이상함');
  if(typeof body != "string") throw('댓글 내용이 이상함');
  if(!comments || !Array.isArray(comments)) throw('댓글이 없음')
  await setDoc(doc(getdocsRef,`c${comments.length+1}`),{
    user,
    body,
    time:Timestamp.now()
  })
}

let comments = undefined


async function show_comments(){
  const ele = document.getElementById('post-comment-ul')
  ele.innerHTML = ''
  comments =  await getcomments()
  console.log('comments', comments)
  for (const com of comments){  
    ele.innerHTML+=`<li><span>${encodedStr(com[1]?.user)}</span><span>${encodedStr(com[1]?.body)}</span></li>`
  }
}
await show_comments()

// setcomments('test_user','body\nname')
document.getElementById('comment-submit').addEventListener('click',async e=>{
  const user = document.querySelector('#post-comment-input input[name=user]').value
  const body = document.querySelector('#post-comment-input input[name=body]').value
  try{
    await setcomments(user, body)
  }catch(err){
    alert(err)
  }
  await show_comments()
})