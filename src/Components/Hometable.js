import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";
import { getTotalExpenseOfaUser } from "./Core/CoreApiHelpers";

const CustomTable = styled.table`
  width: 100%;
  margin: 10px;

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
const TableRow = styled.tr``;
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
const Hometable = (props) => {
  const [allExpenses, setallExpenses] = useState("");
  const uid = props.auth.user.uid;
  useEffect(() => {
    getTotalExpenseOfaUser(uid);
    // getTotalExpenseOfaUser(uid);
    // console.log(expense);
  }, []);

  const someArray = [1, 2, 3];
  const tableRef = useRef();
  const printTableData = () => {
    //componet to print ref is created already check it
    window.print();
  };
  return (
    <Tablecontainer>
      <BtnContainer>
        <PrintContainer>
          <PrintBtn2 onClick={printTableData}>
            <Icon icon="fluent:print-20-filled" color="#b72136" /> print
          </PrintBtn2>
          <PrintBtn>
            <Icon icon="file-icons:microsoft-excel" color="#229a16" /> Export as
            xls
          </PrintBtn>
        </PrintContainer>
        <RecordsBtn>3 records</RecordsBtn>
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
        </tbody>
        {Object.values(someArray).map((value, index) => {
          return (
            <tbody>
              <TableRow key={index}>
                <td className="last">{value}</td>
                <td className="mid">{value}</td>
                <td className="mid">{value}</td>
                <td className="mid">{value}</td>
                <td className="comment">{value}</td>
                <td className="last">
                  <EditBtn>
                    <Icon icon="ci:edit" color="#b78103" /> edit
                  </EditBtn>
                </td>
                <td className="last">
                  <DelBtn>
                    <Icon icon="fluent:delete-48-filled" color="#b72136" />{" "}
                    delete
                  </DelBtn>
                </td>
              </TableRow>
            </tbody>
          );
        })}
      </CustomTable>
    </Tablecontainer>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Hometable);
