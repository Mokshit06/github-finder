<template>
  <IconWrapper :size="size" class="fa fa-github" :animation="animation" />
</template>

<script>
import styled, { keyframes } from "vue-styled-components";

const IconAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }

  50% {
    transform: scale(0.97);
  }

  100% {
    transform: scale(0.9);
  }
`;

const IconWrapper = styled("i", ["size", "animation"])`
  font-size: ${props => (props.size ? props.size : 5)}rem;
  color: #4c69fa;
  animation: ${props =>
    props.animation ? `${IconAnimation} 1.5s infinite normal` : "none"};
  @media (max-width: 640px) {
    font-size: ${props => (props.size ? parseInt(props.size) - 0.9 : 5)}rem;
  }
`;

export default {
  name: "Icon",
  props: ["size", "animation"],
  components: {
    IconWrapper
  }
};
</script>

<style>
</style>

