<template>
  <InfoWrapper>
    <InfoArea>
      <Chart>
        <ChartHeader>Top Languages</ChartHeader>
        <div>
          <pie-chart :data="langData" :options="{}"></pie-chart>
        </div>
      </Chart>
      <Chart>
        <ChartHeader>Most Starred</ChartHeader>
        <div>
          <bar-chart :data="starredData" :options="starredOptions"></bar-chart>
        </div>
      </Chart>
      <Chart>
        <ChartHeader>Stars per language</ChartHeader>
        <div>
          <doughnut-chart
            v-if="starsData.datasets[0].data.length > 1"
            :data="starsData"
            :options="{}"
          ></doughnut-chart>
          <p v-else>No data available yet!</p>
        </div>
      </Chart>
    </InfoArea>
  </InfoWrapper>
</template>

<script>
import styled from "vue-styled-components";
import PieChart from "./charts/Languages.js";
import BarChart from "./charts/Starred.js";
import DoughnutChart from "./charts/Stars.js";
import colors from "../utils/colors";

const InfoWrapper = styled.section`
  padding: 3rem 5rem;
  background: #f6f8fa;
`;

const InfoArea = styled.div`
  margin: 0px auto;
  display: grid;
  margin-top: -6rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  gap: 2rem;
  max-width: 1200px !important;
`;

const Chart = styled.div`
  background-color: #ffffff;
  max-width: 600px;
  box-shadow: #00000033 0px 5px 30px -15px;
  padding: 2rem;
  border-radius: 5px;
`;

const ChartHeader = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
  background-image: linear-gradient(
    90deg,
    #d1d5da 50%,
    rgba(255, 255, 255, 0) 0px
  );
  background-size: 10px 2px;
  background-repeat: repeat no-repeat;
  padding-bottom: 6px;
  background-position: center bottom;
`;

export default {
  name: "Charts",
  props: ["lang", "starred", "stars"],
  data() {
    return {
      langData: {
        labels: this.lang.languages,
        datasets: [
          {
            data: this.lang.numberOfTimes,
            backgroundColor: this.lang.languages.map(lang => colors[lang]),
            borderWidth: 1
          }
        ]
      },
      starredData: {
        labels: this.starred.repoNames,
        datasets: [
          {
            data: this.starred.stars,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      starredOptions: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },

      starsData: {
        labels: this.stars.languages,
        datasets: [
          {
            data: this.stars.stars,
            backgroundColor: this.stars.languages.map(lang => colors[lang]),
            borderWidth: 1
          }
        ]
      }
    };
  },
  components: {
    PieChart,
    BarChart,
    DoughnutChart,
    InfoWrapper,
    InfoArea,
    Chart,
    ChartHeader
  }
};
</script>

<style>
</style>