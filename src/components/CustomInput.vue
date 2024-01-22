<!-- prettier-ignore -->

<template>
  <div>
    <div class="row mt-3">
      <label class="col-12 text-left" :for="name">{{ label }}{{required? "*" : ""}} </label>
    </div>
    <div class="row">
      <div class="col-12 input-container">
				<input
				:type="type"
				:id="id"
				:name="name"
				:placeholder="placeholder"
				:required="required"
        :value="modelValue"
				@input="handleInput" 
				@blur="$emit('blur', $event)"
				class="w-100 customInput"
				/>
				<p v-if="error" class="error">{{ error }}</p>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(e) {
      let value = e.target.value;
      this.$emit("input-changed", value);
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.error {
  color: red;
  margin-top: 5px;
}
.customInput {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 5px;
  border: 2px solid rgb(217, 217, 217);
}
.input-container {
  display: flex;
  align-items: center;
}
label {
  font-size: 14px;
  margin-bottom: 3px;
}
</style>
