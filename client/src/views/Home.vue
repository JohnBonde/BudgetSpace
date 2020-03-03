<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <button
          v-if="!myBudget"
          type="button"
          class="btn btn-primary"
          @click="showModal"
        >Create Budget</button>
        <button
          v-if="myBudget"
          type="button"
          class="btn btn-warning"
          @click="showModal2(); forceRerender();"
        >Edit Budget</button>
        <button type="button" class="btn btn-danger" @click="logout">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <budget :budgetData="myBudget" :userData="budgets" :key="componentKey" />
      </div>
    </div>
    <create-modal v-show="isModalVisible" @close="closeModal" />
    <edit-modal
      :bData="myBudget"
      :uData="userInfo"
      :key="componentKey"
      v-show="isModalVisible2"
      @close="closeModal2"
    />
  </div>
</template>

<script>
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import Budget from "../components/Budget";
export default {
  name: "home",
  components: {
    CreateModal,
    EditModal,
    Budget
  },
  mounted() {
    this.$store.dispatch("getBudgets");
    this.$store.dispatch("getMyBudget");
  },
  data() {
    return {
      isModalVisible: false,
      isModalVisible2: false,
      componentKey: 0
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
    },
    userInfo() {
      let userInfo = {};
      userInfo._id = this.$store.state.myBudget._id;
      return userInfo;
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showModal2() {
      this.isModalVisible2 = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModal2() {
      this.isModalVisible2 = false;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>
