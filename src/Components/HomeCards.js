import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const CardContainer = styled.div`
  width: 30%;
  height: 150px;
  background-color: #ffffff;
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 26px -4px rgba(0, 0, 0, 0.25);

  border-radius: 33px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    height: 120px;
  }
`;
const CardField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  /* justify-content: center; */
`;
const FieldName = styled.p`
  font-size: 25px;
  color: black;
`;
const FieldAmount = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #27b05a;
`;
const HomeCards = () => {
  return (
    <CardContainer>
      <CardField>
        <FieldName>Overall Spent</FieldName>
        <FieldAmount>₹ 30,000</FieldAmount>
      </CardField>
      <Icon icon="emojione:money-bag" width="64" height="64" />
    </CardContainer>
  );
};

export default HomeCards;
