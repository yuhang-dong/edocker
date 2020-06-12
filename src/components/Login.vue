<template>
  <div class="main-container">
    <img src="../assets/whale.svg" />
    <a-form-model layout="vertical" :model="form"  class="flex-form">
      <a-form-model-item label="Field A">
        <a-input v-model="form.fieldA" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item label="Field B">
        <a-input v-model="form.fieldB" placeholder="input placeholder" />
      </a-form-model-item>
      <a-form-model-item >
        <a-button type="primary">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        fieldA: '',
        fieldB: '',
      },
    };
  },
};

</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: lightblue;
  justify-content: center;
  align-items: center;
}

.flex-form {
    width: 50%;
}
</style>