<template>
  <table class="table budget">
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col">Amount</th>
        <th scope="col">Your %</th>
        <th scope="col">Avg %</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Income</th>
        <th>${{budgetData.income}}</th>
      </tr>
      <tr>
        <th scope="row">Housing</th>
        <td>${{budgetData.housing}}</td>
        <td>{{myPct[1]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Transportation</th>
        <td>${{budgetData.trans}}</td>
        <td>{{myPct[2]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Food</th>
        <td>${{budgetData.food}}</td>
        <td>{{myPct[3]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Utilities</th>
        <td>${{budgetData.utils}}</td>
        <td>{{myPct[4]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Insurance</th>
        <td>${{budgetData.insurance}}</td>
        <td>{{myPct[5]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Medical</th>
        <td>${{budgetData.medical}}</td>
        <td>{{myPct[6]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Investing</th>
        <td>${{budgetData.invest}}</td>
        <td>{{myPct[7]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Savings</th>
        <td>${{budgetData.savings}}</td>
        <td>{{myPct[8]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Debt Payments</th>
        <td>${{budgetData.debtPay}}</td>
        <td>{{myPct[9]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Recreation/Entertainment</th>
        <td>${{budgetData.recEnt}}</td>
        <td>{{myPct[10]}}%</td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">Miscellaneous</th>
        <td>${{budgetData.misc}}</td>
        <td>{{myPct[11]}}%</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "budget",
  props: ["budgetData", "userData"],
  computed: {
    myPct() {
      return this.pctCalc(this.budgetData);
    },
    avgPct() {
      let data = this.userData;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        arr.push(this.pctCalc(element));
      }
      return arr;
    }
  },
  methods: {
    pctCalc(data) {
      let income = data.income;
      let costs = data;
      delete costs.authorId;
      delete costs._id;
      delete costs.createdAt;
      delete costs.updatedAt;
      delete costs.__v;
      let nums = [];
      for (let key in costs) {
        if (costs.hasOwnProperty(key)) {
          let pct = Math.round((costs[key] / income) * 100);
          nums.push(pct);
        }
      }
      return nums;
    }
  }
};
</script>

<style>
</style>