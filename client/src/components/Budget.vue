<template>
  <table class="table shadow-lg">
    <thead class="thead-dark">
      <tr>
        <th scope="col" class="title">Income</th>
        <th scope="col" class="title">${{ budgetData.income }}</th>
        <th scope="col" class="title">Your %</th>
        <th scope="col" class="title">Avg %</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-color">
        <th scope="row" class="title">Housing</th>
        <td>${{ budgetData.housing }}</td>
        <td>{{ myPct[1] }}%</td>
        <td>{{ avgPct[0] }}%</td>
      </tr>
      <tr>
        <th scope="row" class="title">Transportation</th>
        <td>${{ budgetData.trans }}</td>
        <td>{{ myPct[2] }}%</td>
        <td>{{ avgPct[1] }}%</td>
      </tr>
      <tr class="bg-color">
        <th scope="row" class="title">Food</th>
        <td>${{ budgetData.food }}</td>
        <td>{{ myPct[3] }}%</td>
        <td>{{ avgPct[2] }}%</td>
      </tr>
      <tr>
        <th scope="row" class="title">Utilities</th>
        <td>${{ budgetData.utils }}</td>
        <td>{{ myPct[4] }}%</td>
        <td>{{ avgPct[3] }}%</td>
      </tr>
      <tr class="bg-color">
        <th scope="row" class="title">Insurance</th>
        <td>${{ budgetData.insurance }}</td>
        <td>{{ myPct[5] }}%</td>
        <td>{{ avgPct[4] }}%</td>
      </tr>
      <tr>
        <th scope="row" class="title">Medical</th>
        <td>${{ budgetData.medical }}</td>
        <td>{{ myPct[6] }}%</td>
        <td>{{ avgPct[5] }}%</td>
      </tr>
      <tr class="bg-color">
        <th scope="row" class="title">Investing</th>
        <td>${{ budgetData.invest }}</td>
        <td>{{ myPct[7] }}%</td>
        <td>{{ avgPct[6] }}%</td>
      </tr>
      <tr>
        <th scope="row" class="title">Savings</th>
        <td>${{ budgetData.savings }}</td>
        <td>{{ myPct[8] }}%</td>
        <td>{{ avgPct[7] }}%</td>
      </tr>
      <tr class="bg-color">
        <th scope="row" class="title">Debt Payments</th>
        <td>${{ budgetData.debtPay }}</td>
        <td>{{ myPct[9] }}%</td>
        <td>{{ avgPct[8] }}%</td>
      </tr>
      <tr>
        <th scope="row" class="title">Recreation/Entertainment</th>
        <td>${{ budgetData.recEnt }}</td>
        <td>{{ myPct[10] }}%</td>
        <td>{{ avgPct[9] }}%</td>
      </tr>
      <tr class="bg-color">
        <th scope="row" class="title">Miscellaneous</th>
        <td>${{ budgetData.misc }}</td>
        <td>{{ myPct[11] }}%</td>
        <td>{{ avgPct[10] }}%</td>
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
      let arr = [[], [], [], [], [], [], [], [], [], [], []];
      let arr2 = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let newArr = this.pctCalc(element);
        for (let i = 1; i < newArr.length; i++) {
          const elem = newArr[i];
          arr[i - 1].push(elem);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        const reducer = (a, c) => a + c;
        arr2.push(Math.round(element.reduce(reducer) / element.length));
      }
      return arr2;
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

<style scoped>
.bg-color {
  background-color: #d1ebfe;
}

.title {
  font-weight: bold;
}
</style>
