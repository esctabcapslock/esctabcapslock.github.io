const querySnapshot = await getDocs(collection(db, "comment"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});