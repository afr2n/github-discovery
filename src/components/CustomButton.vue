<!-- prettier-ignore -->
<template>
  <button
    :disabled="isDisabled"
    :class="`flex justify-content-center align-items-center cusBtn ${
      buttonLoading ? 'button--loading' : ''
    } ${buttonSize ? `  btn-${buttonSize} ` : ''} ${
      isIcon ? ' icon__button ' : ''
    } ${extraClass} `"
    @click="onButtonClick"
  >
    <!-- display loader if button triggeres fetch to backend -->
    <div v-if="!buttonLoading">
      <div
        v-if="isIcon"
        class="d-flex justify-content-center align-items-center"
      >
        <div v-if="isActive && activeIconUrl">
          <img :src="activeIconUrl" class="icon" />
        </div>
        <div v-else>
          <img :src="iconUrl" class="icon" />
        </div>
      </div>
      <div v-if="buttonText">
        <div v-if="buttonType === 'secondary'" :class="{ 'active-secondary-button': isActive }" class="secondary-button">
            {{ buttonText }}
        </div>
        <div v-if="buttonType === 'solid'" class="solid-button">
            <span>{{ buttonText }}</span>
        </div>
        <div v-else>
          <div :class="{ 'active-primary-button': isActive }">
            {{ buttonText }}
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    iconUrl: {
      type: String,
      required: true,
    },
    activeIconUrl: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      required: true,
      default: "primary",
    },
    onButtonClick: {
      tyle: Function,
      required: true,
    },
    buttonLoading: {
      type: Boolean,
      required: false,
    },
    buttonSize: {
      type: String,
      required: false,
    },
    extraClass: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
    isIcon: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
.cusBtn {
  font-family: "OpenSans-Regular";
  font-size: 14px;
  font-weight: bold;
}
.active-primary-button {
  padding-bottom: 2px;
  border-bottom: 2.5px solid #111; /* Border style */
}
.secondary-button {
  border: 1px solid #111;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 15px;
}
.active-secondary-button {
  background-color: rgb(217, 217, 217);
}
.icon {
  width: 20px;
}
.solid-button {
  color: white;
  font-weight: bold;
  background: black;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
}
</style>
