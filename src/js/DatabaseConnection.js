import firebase from 'firebase';

export async function addMenu(title, price, memo) {
    const db = firebase.firestore();
    const docRef = db.collection("menu");
    await docRef.add({
        menu_title: title,
        menu_price: Number(price),
        menu_memo: memo
    });
}

export async function addHistory(accTotal, accDeposit, itemList) {
    const db = firebase.firestore();
    const docRef = db.collection("history");
    await docRef.add({
        acc_total: accTotal,
        acc_deposit: Number(accDeposit),
        acc_return: accDeposit - accTotal,
        purchased_item_list: itemList,
        create_date: new Date(),
    });
}
