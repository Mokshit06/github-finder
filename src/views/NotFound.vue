<template>
  <NotFoundWrapper>
    <NotFound>
      <Icon />
      <Title>Github Finder</Title>
      <ErrorText
        >{{ error }} not found! Please try searching something else.</ErrorText
      >
      <router-link to="/">Go Home</router-link>
    </NotFound>
  </NotFoundWrapper>
</template>

<script>
import styled from "vue-styled-components";
import Icon from "@/components/Icon.vue";

const NotFoundWrapper = styled.div`
  background: linear-gradient(#1a1e22 0%, #24292e 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const NotFound = styled.div`
  margin-bottom: 70px;
  text-align: center;
  padding: 2rem;
  color: #f8f8f8;

  & a {
    background: #4c69fa;
    padding: 11px 23px;
    border-radius: 50px;
    color: #f8f8f8;
    font-size: 1rem;
    display: inline-block;
    transition: 200ms ease-in-out;

    &:hover {
      box-shadow: #223387 0px 2px 12px 0px;
    }
  }
`;

const Title = styled.h2`
  margin: 1.5rem;
  font-size: 2.5rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #e6f2ff;
  margin-bottom: 1.3rem;
`;

export default {
  name: "Error",
  props: ["error"],
  components: {
    NotFoundWrapper,
    NotFound,
    Icon,
    Title,
    ErrorText
  },
  metaInfo: {
    title: "404"
  }
};
</script>

<style>
</style>