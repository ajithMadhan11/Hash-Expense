import "firebase/firestore";
import { database } from "../../FirebaseConfig";
import moment from "moment";

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

export const editExpenseToDatabase = (
  docId,
  userId,
  date,
  category,
  expense,
  comments
) => {
  database
    .collection(userId)
    .doc(docId)
    .update({
      date: date,
      category: category,
      expense: expense,
      comments: comments,
    })
    .then(() => {
      console.log("Expense updated successfully..!");
    })
    .catch(() => {
      console.log("Error updated the expense..!");
    });
};

export const totalExpense = (allExpense) => {
  let totalAmt = 0;
  if (allExpense[0]) {
    totalAmt = allExpense.reduce((sum, expense) => {
      return (sum += parseInt(expense.expense.expense));
    }, 0);
  }
  return totalAmt == 0 ? 0 : totalAmt;
};

export const monthlyExpense = (allExpense) => {
  let totalAmt = 0;
  if (allExpense[0]) {
    const month = new Date().getMonth();
    const thisMonths = allExpense.filter((expense) => {
      return new Date(expense.expense.date).getMonth() == month;
    });

    if (thisMonths[0]) {
      totalAmt = thisMonths.reduce((sum, expense) => {
        return (sum += parseInt(expense.expense.expense));
      }, 0);
    }
    return totalAmt == 0 ? 0 : totalAmt;
  }
};

export const expenseOfEachCategory = (allExpense) => {
  const categories = [
    "Foods",
    "Automobile",
    "Enterainment",
    "Clothing",
    "Healthcare",
    "Travel",
    "Shopping",
    "Personal Care",
    "Investments",
    "Gifts & Donations",
    "Bills & utiltites",
    "Others",
  ];
  let categoriesTotal = {
    Foods: 0,
    Automobile: 0,
    Enterainment: 0,
    Clothing: 0,
    Healthcare: 0,
    Travel: 0,
    Shopping: 0,
    "Personal Care": 0,
    Investments: 0,
    "Gifts & Donations": 0,
    "Bills & utiltites": 0,
    Others: 0,
  };

  const findTotal = (category, expenses) => {
    let temp = expenses
      .filter((expense) => expense.expense.category === category)
      .reduce((sum, expense) => {
        return (sum += Number(expense.expense.expense));
      }, 0);
    categoriesTotal = { ...categoriesTotal, [category]: temp };
  };

  categories.map((category) => findTotal(category, allExpense));
  return categoriesTotal;
};

export const moneySpentinEachmonth = (allExpense) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "1Oct",
    "Nov",
    "Dec",
  ];
  let monthsDetails = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const findMonthTotal = (mon, allExpense) => {
    let temp = allExpense
      .filter(
        (expense) =>
          moment(expense.expense.date).format("MMM").toString() ==
          mon.toString()
      )
      .reduce((sum, expense) => {
        return (sum += Number(expense.expense.expense));
      }, 0);

    monthsDetails = { ...monthsDetails, [mon]: temp };
  };
  months.map((month) => {
    findMonthTotal(month, allExpense);
  });
  return monthsDetails;
};
