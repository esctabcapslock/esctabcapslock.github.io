const encodedStr = r=>r.replace(/[\u00A0-\u9999<>\&]/gi, i=>'&#'+i.charCodeAt(0)+';');


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInAnonymously,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
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


// 익명 사용자 관리
const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

let uid = undefined
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log('uid',user.uid,'user',user)
    uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

let _postname = undefined
const postname = _postname?_postname:decodeURIComponent(location.toString().split('/')[3]).replace(/\.html$/, '')
if (!postname) throw('postname 잘못됨')
// const getdocsRef = collection(db, "comment", postname, "comment")
const getdocsRef = collection(db, "comment", postname, "comment")

export async function getcomments(_postname) {
  
  const docSnaps = await getDocs(getdocsRef);
  const comments = []
  docSnaps.forEach(v => comments.push([v.id, v.data()]))
  comments.sort((a,b)=>a[1].time.seconds>b[1].time.seconds)
  return comments
}


export async function setcomments(user, body){
  if(typeof user != "string") throw('user가 이상함');
  if(typeof body != "string") throw('댓글 내용이 이상함');
  if(typeof uid != "string") throw('uid 설정 실패');
  const now = Timestamp.now()
  const comment_id = `c${now.seconds}_${parseInt(Math.random()*1000000)}`
  const comment_data = {user,body,uid,time:now}
  if(!comments || !Array.isArray(comments)) throw('댓글이 없음')
  await setDoc(doc(getdocsRef,comment_id),comment_data)
  comments.push([comment_id,comment_data])
}

let comments = await getcomments()
// console.log(Timestamp.now())


async function show_comments(){
  const ele = document.getElementById('post-comment-ul')
  let out_html = ''
  // comments =  await getcomments()
  console.log('comments', comments)
  for (const [id, data] of comments) if(/^c(\d+)_(\d+)$/.test(id)){  
    
    out_html+=
      `<li id=commentid_${id}>
        <span>${encodedStr(data.user)}</span>
        <time>${encodedStr((new Date(data.time.seconds*1000)).toLocaleString())}</time>
        <span>${encodedStr(data.body)}</span>
        ${uid==data.uid?`<a href="javascript:edit_comment('${id}')">edit</a/>
        <a href="javascript:delete_comment('${id}')">del</a/>`:''}
        <p class="comment_edit"></p>
      </li>`
  }
  ele.innerHTML = out_html
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
    throw(err)
  }
  await show_comments()
})


function find_index_at_comments(comment_id){
  // console.log('comments', comments)
  for (const i in comments){
    if (comments[i][0]==comment_id) return i
  }
  throw('목록에서 찾을 수 없음')
}

export async function edit_comment(comment_id){
  // 목록에서 찾기
  const index = find_index_at_comments(comment_id)
  const [_,comment] = comments[index]
  console.log('[edit_comment]',index, comment)
  const ele = document.querySelector('#commentid_'+comment_id+' .comment_edit')
  ele.innerHTML+=
    `
    <label for="user">your name</label><input type="text" name="user" placeholder="your name">
    <label for="body">comment body</label><input type="text" name="body" placeholder="comment body">
    <button type="submit" id="comment-submit" onclick="edit_comment_apply('${comment_id}')">Add a comment</button>
    `
    ele.querySelector('input[name=user]').value = comment.user
    ele.querySelector('input[name=body]').value = comment.body
}
export async function edit_comment_apply(comment_id){
  console.log('[edit_comment_apply]')
  const index = find_index_at_comments(comment_id)
  const ele = document.getElementById('commentid_'+comment_id)
  const user = ele.querySelector('input[name=user]').value
  const body = ele.querySelector('input[name=body]').value

  if(typeof user != "string") throw('user가 이상함');
  if(typeof body != "string") throw('댓글 내용이 이상함');
  if(typeof uid != "string") throw('uid 설정 실패');

  comments[index][1].user = user
  comments[index][1].body = body
  await show_comments()
  
  const now = Timestamp.now()
  if(!comments || !Array.isArray(comments)) throw('댓글이 없음')
  await setDoc(doc(getdocsRef,comment_id),{
    user,
    body,
    uid,
    time:now
  })
}

export async function delete_comment(comment_id){
  console.log('[delete_comment]')
  const index = find_index_at_comments(comment_id)

}
window.edit_comment = edit_comment
window.edit_comment_apply  = edit_comment_apply 
window.delete_comment = delete_comment