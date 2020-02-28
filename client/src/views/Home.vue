<template>
  <div class="home">
    <button type="button" class="btn btn-primary" @click="showModal">Create Budget</button>
    <create-modal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import CreateModal from "../components/CreateModal";
export default {
  name: "home",
  components: {
    CreateModal
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
