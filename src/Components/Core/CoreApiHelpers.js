import firebase from "firebase/app";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../FirebaseConfig";

export const addExpenseToDatabase = (
  userId,
  date,
  category,
  expense,
  comments
) => {
  database
    .collection(userId)
    .add({
      date: date,
      category: category,
      expense: expense,
      comments: comments,
    })
    .then(() => {
      console.log("Expense added successfully..!");
    })
    .catch(() => {
      console.log("Error adding the expense..!");
    });
};

export const getTotalExpenseOfaUser = (userId) => {
  const expenseList = [];
  database
    .collection(userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        expenseList.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
    });
  console.log(expenseList);
};
