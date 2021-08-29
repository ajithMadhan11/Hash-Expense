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
  margin: 20px 0 20px 0;
  border-radius: 33px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    height: 120px;
  }
`;
const CardField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
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

const StatsCard = ({ type, data }) => {
  function numberWithCommas(x) {
    if (typeof x != "number") {
      return x;
    } else {
      return "₹" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
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
    <CardContainer>
      <CardField>
        <FieldName>{type}</FieldName>
        <FieldAmount>{numberWithCommas(data) || "-"}</FieldAmount>
      </CardField>
      <Icon icon={categoriesTotal[type]} width="64" height="64" />
    </CardContainer>
  );
};

export default StatsCard;
