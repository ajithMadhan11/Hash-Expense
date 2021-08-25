import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";
import "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableData from "./TableData";
import exportFromJSON from "export-from-json";

const CustomTable = styled.table`
  width: 100%;
  margin: 10px;
  table-layout: fixed;
  border-collapse: collapse;
  th {
    background-color: #f4f6f8;
    color: #637381;
    padding: 15px;
  }
  td {
    border-collapse: collapse;
    margin-top: 20px;
    text-align: left;
  }

  td,
  tr {
    padding: 15px;
  }
  th {
    text-align: left;
  }
  .last {
    width: 40px;
  }
  .comment {
    width: 250px;
  }
  .mid {
    width: 100px;
  }
`;

const Tablecontainer = styled.div`
  box-shadow: 0px 0px 23px -4px rgba(162, 162, 162, 0.25);
  border-radius: 15px;
  background-color: #ffffff;
  margin: 30px;
  padding: 10px 20px 10px 10px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #f4f6f8;
    cursor: pointer;
  }
`;
const PrintBtn = styled.span`
  font-size: small;
  color: #229a16;
  background-color: #e3f9dd;
  border-radius: 10px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const PrintBtn2 = styled.span`
  font-size: small;
  color: #b72136;
  background-color: #ffe1e0;
  border-radius: 10px;
  margin-right: 10px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const PrintContainer = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: row;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordsBtn = styled.p`
  color: #b72136;
  width: 200px;
`;
const EmptyTableCotainer = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: max-content;
`;
const SearchBox = styled.input.attrs((props) => ({
  type: props.type,
}))`
  font-size: 14px;
  border: 0.5px solid lightgrey;
  border-radius: 5px;
  width: 70%;
  height: 30px;
  padding: 3px;
  margin-top: 5px;
  &:focus {
    outline: none;
    border-radius: 5px;
    border: 1px solid #27b05a;
  }
  @media (max-width: 768px) {
    width: 280px;
    padding: 10px;
  }
`;
const Hometable = ({ allExpenses, auth }) => {
  const tableRef = useRef();
  const printTableData = () => {
    window.print();
  };

  // const [search, setsearch] = useState("");
  const [Exceldata, setExceldata] = useState([]);
  const exportTocsv = () => {
    setExceldata(
      allExpenses.map((expense) => ({
        date: expense.expense.date,
        category: expense.expense.category,
        amount: expense.expense.expense,
        Comment: expense.expense.comments,
      }))
    );
    const data = Exceldata;

    const fileName = "export_to_csv";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
  };

  // const searchComment = (e) => {
  //   e.preventDefault();
  //   setsearch(e.target.value);
  //   if (search === null) {
  //     setfilteredExpense(allExpenses);
  //     return;
  //   }
  //   const filteredExpenses = allExpenses.filter((expense) => {
  //     return expense.expense.comments.toLowerCase().includes(search);
  //   });
  //   setfilteredExpense(filteredExpenses);
  //   console.log(filteredExpense);
  // };

  return (
    <Tablecontainer>
      <BtnContainer>
        <PrintContainer>
          <PrintBtn2 onClick={printTableData}>
            <Icon icon="fluent:print-20-filled" color="#b72136" /> print
          </PrintBtn2>
          <PrintBtn onClick={exportTocsv}>
            <Icon icon="file-icons:microsoft-excel" color="#229a16" /> Export as
            xls
          </PrintBtn>
        </PrintContainer>
        <RecordsBtn>{allExpenses.length} records</RecordsBtn>
      </BtnContainer>

      <CustomTable ref={tableRef}>
        <tbody>
          <TableRow>
            <th className="last">#</th>
            <th className="mid">Date</th>
            <th className="mid">Expense</th>
            <th className="mid">Category</th>
            <th className="comment">Comment</th>
            <th className="last">Edit</th>
            <th className="last">Delete</th>
          </TableRow>

          {allExpenses.length ? (
            allExpenses.map((expense, index) => {
              return (
                <TableData
                  key={expense.id}
                  expenses={expense}
                  uid={auth.user.uid}
                  index={index}
                />
              );
            })
          ) : (
            <EmptyTableCotainer>
              <p style={{ marginTop: "30px", opacity: 0.5 }}>
                No data found 😓 Click on the ➕ icon to add Expense
              </p>
            </EmptyTableCotainer>
          )}
        </tbody>
      </CustomTable>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Tablecontainer>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Hometable);

// <SearchBox
// type="search"
// placeholder="Search comment"
// value={search}
// onChange={searchComment}
// ></SearchBox>
