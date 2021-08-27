import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../../FirebaseConfig";
import { expenseOfEachCategory } from "../Core/CoreApiHelpers";
import Chart from "react-apexcharts";
import Loader from "../Loader";

const MainContainer = styled.div`
  width: 100%;
  height: 75vh;
  background-color: #ececec;
  box-shadow: 0px 0px 26px -4px rgba(0, 0, 0, 5);
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const ChartBox = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 20px;
  overflow-y: hidden;

  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px;
  @media (max-width: 768px) {
    width: 80%;
    margin: 20px;
  }
`;

const StatsHome = ({ allExpense }) => {
  const [donultValue, setdonultValue] = useState([]);

  const subscribe = async () => {
    if (allExpense.length) {
      console.log("came");
      const donutData = await expenseOfEachCategory(allExpense);
      console.log(donutData);
      let donutArray = [];
      for (const [key, value] of Object.entries(donutData)) {
        donutArray.push(value);
      }
      setdonultValue(donutArray);
    }
  };

  useEffect(() => {
    subscribe();
  }, []);

  const donetOptions = {
    series: donultValue,

    options: {
      chart: {
        width: 500,
        type: "donut",
      },
      labels: [
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
      ],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      title: {
        text: "Money spent in each category",
      },
      responsive: [
        {
          breakpoint: 720,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <MainContainer>
        <ChartBox>
          <Chart
            options={donetOptions.options}
            series={donetOptions.series}
            type="donut"
            width="500"
            // responsive="true"
          />
        </ChartBox>
        <ChartBox>chart</ChartBox>
      </MainContainer>
    </>
  );
};

export default StatsHome;
