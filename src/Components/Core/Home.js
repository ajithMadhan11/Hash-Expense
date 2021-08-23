import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import HomeCards from "../HomeCards";
import Hometable from "../Hometable";
import Navbar from "./Navbar";
import { Icon } from "@iconify/react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { addExpenseToDatabase, getTotalExpenseOfaUser } from "./CoreApiHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContainer = styled.div`
  display: flex;
  padding: 35px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const AddBtn = styled.button`
  border-radius: 50%;
  color: #229a16;
  background-color: #e3f9dd;
  font-size: 70px;
  width: 70px;
  position: fixed;
  border: none;
  bottom: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`;
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
const Home = (props) => {
  const uid = props.auth.user.uid;

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [state, setstate] = useState({
    date: "",
    category: "",
    expense: 0,
    comments: "",
    buttonText: "Add Expense",
  });
  const { date, category, expense, comments, buttonText } = state;

  const handleChange = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setstate({ ...state, [buttonText]: "Adding expense..." });
    await addExpenseToDatabase(uid, date, category, expense, comments);
    setOpen(false);
    setstate({
      date: "",
      category: "",
      expense: 0,
      comments: "",
      buttonText: "Add Expense",
    });

    toast.success("Expense Added! 🥳", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          <ModalHeader>Add your Expense 🚀</ModalHeader>
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
            <option value="PersonalCare">PersonalCare</option>
            <option value="Investments">Investments</option>
            <option value="Gifts&Donations">Gifts & Donations</option>
            <option value="Bills&utiltites">Bills & utiltites</option>
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
      <Navbar />
      <MainContainer>
        <HomeCards />
        <HomeCards />
        <HomeCards />
      </MainContainer>
      <Hometable />
      <AddBtn onClick={onOpenModal}>+</AddBtn>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default React.memo(connect(mapStateToProps)(Home));
