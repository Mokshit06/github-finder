<template>
  <LoadingWrapper>
    <Icon :size="10" :animation="true" />
  </LoadingWrapper>
</template>

<script>
import styled from "vue-styled-components";
import Icon from "./Icon.vue";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(#1a1e22 0%, #24292e 100%);
`;

export default {
  name: "Loader",
  components: {
    Icon,
    LoadingWrapper
  }
};
</script>

<style>
</style>