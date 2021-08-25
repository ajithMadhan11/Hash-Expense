import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import "firebase/firestore";
import { database } from "../FirebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-responsive-modal";
import { editExpenseToDatabase } from "./Core/CoreApiHelpers";
import { toast } from "react-toastify";

const ModalContainer = styled.div`
  width: 460px;
  margin: 20px;
  background-color: #ffffff;
`;
const Select = styled.select`
  width: 92%;
  height: 50px;
  font-size: 15px;
  border: 1px solid grey;
  border-radius: 14px;
  padding: 5px;
  margin-top: 10px;
  background-color: #ffffff;
  &:focus {
    outline: none;
    border-radius: 14px;
    border: 2px solid #27b05a;
  }

  option {
    color: black;
    background: white;
    display: flex;
    /* white-space: pre; */
    min-height: 40px;
    padding: 15px;
  }
  @media (max-width: 768px) {
    width: 300px;
    padding: 10px;
  }
`;
const StyledTextarea = styled.textarea`
  width: 87%;
  height: 50px;
  font-size: 15px;
  border: 1px solid grey;
  border-radius: 14px;
  padding: 10px;
  margin-top: 10px;
  background-color: #ffffff;
  &:focus {
    outline: none;
    border-radius: 14px;
    border: 2px solid #27b05a;
  }
  @media (max-width: 768px) {
    width: 280px;
    padding: 10px;
  }
`;
const ModalInput = styled.input.attrs((props) => ({
  type: props.type,
}))`
  font-size: 15px;
  border: 1px solid grey;
  border-radius: 14px;
  width: 90%;
  height: 40px;
  padding: 5px;
  margin-top: 10px;
  &:focus {
    outline: none;
    border-radius: 14px;
    border: 2px solid #27b05a;
  }
  @media (max-width: 768px) {
    width: 280px;
    padding: 10px;
  }
`;
const SubmitBtn = styled.button`
  font-size: 15px;
  border-radius: 14px;
  width: 92%;
  height: 45px;
  padding: 15px;
  margin-top: 20px;
  background-color: #27b05a;
  color: #ffffff;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #1e9a4c;
  }
  @media (max-width: 768px) {
    width: 300px;
    padding: 10px;
  }
`;
const ModalHeader = styled.h3``;

const CategoryWrapper = styled.td`
  margin: 0 !important;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CategoryText = styled.p``;

const TableRow = styled.tr`
  &:hover {
    background-color: #f4f6f8;
    cursor: pointer;
  }
`;
const EditBtn = styled.span`
  font-size: small;
  color: #b78103;
  background-color: #fff5d7;
  border-radius: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const DelBtn = styled.span`
  font-size: small;
  color: #b72136;
  background-color: #ffe1e0;
  border-radius: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const TableData = ({ expenses, uid, index }) => {
  const [open, setOpen] = useState(false);
  const [docId, setdocId] = useState("");
  const onCloseModal = () => setOpen(false);
  const [state, setstate] = useState({
    date: expenses.expense.date,
    category: expenses.expense.category,
    expense: expenses.expense.expense,
    comments: expenses.expense.comments,
    buttonText: "update Expense",
  });
  const { date, category, expense, comments, buttonText } = state;

  const handleChange = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };

  const deleteExpense = (id) => {
    database
      .collection(uid)
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Expense deleted Successfully..!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setstate({ ...state, [buttonText]: "updating expense..." });
    await editExpenseToDatabase(docId, uid, date, category, expense, comments);
    setOpen(false);

    toast.success("Expense updated! 🥳", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const editExpense = (id) => {
    setdocId(id);
    setOpen(true);
  };

  let categoriesTotal = {
    moneyBag: "emojione:money-bag",
    flyMoney: "emojione-v1:money-with-wings",
    Foods: "emojione:pot-of-food",
    Automobile: "emojione-v1:racing-car",
    Enterainment: "twemoji:party-popper",
    Clothing: "emojione-v1:womans-clothes",
    Healthcare: "icon-park:health",
    Travel: "emojione:tram-car",
    Shopping: "emojione-v1:shopping-bags",
    "Personal Care": "emojione:beating-heart",
    Investments: "emojione-v1:stock-chart",
    "Gifts & Donations": "emojione:wrapped-gift",
    "Bills & utiltites": "flat-color-icons:money-transfer",
    Others: "noto:coin",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <ModalContainer>
          <ModalHeader>Edit your Expense 🚀</ModalHeader>
          <ModalInput
            type={"date"}
            placeholder=""
            value={date}
            onChange={handleChange("date")}
          />
          <ModalInput
            type={"number"}
            placeholder="How much you spent? 🤔"
            value={expense}
            onChange={handleChange("expense")}
          />
          <Select value={category} onChange={handleChange("category")}>
            <option value="" hidden>
              Select category
            </option>
            <option value="Foods">Foods</option>
            <option value="Automobile">Automobile</option>
            <option value="Enterainment">Entertainment</option>
            <option value="Clothing">Clothing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Personal Care">PersonalCare</option>
            <option value="Investments">Investments</option>
            <option value="Gifts & Donations">Gifts & Donations</option>
            <option value="Bills & utiltites">Bills & utiltites</option>
            <option value="Others">Others</option>
          </Select>
          <StyledTextarea
            type={"text"}
            placeholder="Add your comments on this spent!"
            value={comments}
            onChange={handleChange("comments")}
          />
          <SubmitBtn onClick={submitForm}>{buttonText}</SubmitBtn>
        </ModalContainer>
      </Modal>
      <TableRow key={expenses.id}>
        <td className="last">{index + 1}</td>
        <td className="mid">{expenses.expense.date}</td>
        <td className="mid">{expenses.expense.expense}</td>
        <CategoryWrapper>
          <CategoryText>{expenses.expense.category}</CategoryText>
          <Icon
            icon={categoriesTotal[expenses.expense.category]}
            width="24"
            height="24"
          />
        </CategoryWrapper>
        <td className="comment">{expenses.expense.comments}</td>
        <td className="last">
          <EditBtn onClick={() => editExpense(expenses.id)}>
            <Icon icon="ci:edit" color="#b78103" /> edit
          </EditBtn>
        </td>
        <td className="last">
          <DelBtn onClick={() => deleteExpense(expenses.id)}>
            <Icon icon="fluent:delete-48-filled" color="#b72136" />
            delete
          </DelBtn>
        </td>
      </TableRow>
    </>
  );
};

export default TableData;
