import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    console.log(this.data);
    this.renderChart(this.data, this.options);
  },
};
