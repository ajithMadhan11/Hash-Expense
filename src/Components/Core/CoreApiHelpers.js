import firebase from "firebase/app";
import database from "../../FirebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const addExpenseToDatabase = (
  userId,
  date,
  category,
  expense,
  comments
) => {
  firebase.database().ref(`users/${userId}/expenses/`).push().set({
    date,
    category,
    expense,
    comments,
  });
};
export const getTotalExpenseOfaUser = (userId) => {
  return firebase
    .database()
    .ref(`users/${userId}/`)
    .once("value")
    .then((snapshot) => {
      const expenses = (snapshot.val() && snapshot.val().expenses) || 0;
      for (const expense in expenses) {
        console.log(expense.expense);
      }
    });
};
