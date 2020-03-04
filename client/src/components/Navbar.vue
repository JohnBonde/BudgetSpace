<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">BudgetSpace</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
      style="justify-content: flex-end"
    >
      <button @click="logout" class="btn btn-outline-danger my-2 my-sm-0" type="button">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
</style>