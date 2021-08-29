import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  expenseOfEachCategory,
  moneySpentinEachmonth,
} from "./Core/CoreApiHelpers";
import Chart from "react-apexcharts";
import StatsCard from "./StatsCard";
import Loader from "./Loader";
import Navbar from "./Core/Navbar";
const MainContainer = styled.div`
  width: 100%;
  height: 75vh;
  background-color: #edf1f5;
  /* box-shadow: 0px 0px 26px -4px rgba(0, 0, 0, 5); */
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const ChartBox = styled.div`
  width: 100%;
  max-width: max-content;
  height: 350px;
  margin: 20px;
  overflow-y: hidden;

  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px;
  @media (max-width: 768px) {
    width: 85%;
    height: 100%;
    margin: 20px;
  }
`;
const StatsContainer = styled.div`
  /* background-color: #edf1f5; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 100px;
`;

const StatsHome = ({ allExpense }) => {
  const [donultValue, setdonultValue] = useState([]);
  const [barValue, setbarValue] = useState([]);
  const [categoryStats, setcategoryStats] = useState({});

  const subscribe = async () => {
    if (allExpense.length) {
      const donutData = await expenseOfEachCategory(allExpense);
      let donutArray = [];
      for (const [key, value] of Object.entries(donutData)) {
        donutArray.push(value);
      }

      setdonultValue(donutArray);

      const barData = await moneySpentinEachmonth(allExpense);
      let barArray = [];
      for (const [key, value] of Object.entries(barData)) {
        barArray.push(value);
      }
      setbarValue(barArray);
      let CategoryArray = [];
      for (const [key, value] of Object.entries(donutData)) {
        let temp = {
          category: key,
          expense: value,
        };
        CategoryArray.push(temp);
      }
      setcategoryStats(CategoryArray);
      console.log(categoryStats);
    }
  };

  useEffect(() => {
    subscribe();
  }, [allExpense]);

  const donetOptions = {
    series: donultValue,

    options: {
      chart: {
        height: 350,
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
          size: 200,
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
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      responsive: [
        {
          breakpoint: 720,
          options: {
            chart: {
              width: "320",
              height: "",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const barOptions = {
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      title: {
        text: `Total expense in ${new Date().getUTCFullYear()} `,
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },

      responsive: [
        {
          breakpoint: 720,
          options: {
            chart: {
              height: "auto",
              width: "320",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [
      {
        name: "TotalExpense",
        data: barValue,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <MainContainer>
        <ChartBox>
          <Chart
            options={donetOptions.options}
            series={donetOptions.series}
            type="donut"
            width="500"
            responsive="true"
            height={350 + Math.floor(Math.random() * 2)}
          />
        </ChartBox>
        <ChartBox>
          <Chart
            options={barOptions.options}
            series={barOptions.series}
            type="line"
            width="600"
            responsive="true"
          />
        </ChartBox>
      </MainContainer>
      <StatsContainer>
        {categoryStats.length ? (
          categoryStats.map((item, index) => {
            return (
              <StatsCard key={index} type={item.category} data={item.expense} />
            );
          })
        ) : (
          <Loader />
        )}
      </StatsContainer>
    </>
  );
};

export default React.memo(StatsHome);
