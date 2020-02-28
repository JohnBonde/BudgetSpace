<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="showModal">Create Budget</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <budget :budgetData="myBudget" :userData="budgets" />
      </div>
    </div>
    <create-modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import CreateModal from "../components/CreateModal";
import Budget from "../components/Budget";
export default {
  name: "home",
  components: {
    CreateModal,
    Budget
  },
  mounted() {
    this.$store.dispatch("getBudgets");
    this.$store.dispatch("getMyBudget");
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  computed: {
    budgets() {
      return this.$store.state.budgets;
    },
    user() {
      return this.$store.state.user;
    },
    myBudget() {
      return this.$store.state.myBudget;
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
