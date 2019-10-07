import firebase from 'firebase';

export async function getMenu() {
    console.log('入った');
    const db = firebase.firestore();
    const docRef = db.collection("menu").doc("Q9oQzo7cYLCBXaqMMiBG");
    
    console.log('通信中...');
    const doc = await docRef.get();
    console.log('doc.data()');
    console.log(doc.data());    
}

export async function addMenu(title, price, memo) {
    console.log('入った');
    const db = firebase.firestore();
    db.collection("menu").add({
        menu_title: title,
        menu_price: price,
        menu_memo: memo
    });
    console.log('追加');
}
