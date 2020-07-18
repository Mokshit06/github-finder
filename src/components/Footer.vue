<template>
  <FooterWrapper>
    <span>Made with ❤ by </span>
    <a href="https://mokshitjain.com">Mokshit Jain</a>
  </FooterWrapper>
</template>

<script>
import styled from "vue-styled-components";

const FooterWrapper = styled.footer`
  font-family: "Montserrat";
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(106, 115, 125);
  padding: 1.7rem;
  background: #fff;
  font-weight: 450;
  font-size: 1.01rem;

  & a {
    margin-left: 5px;
    font-weight: 500;
    color: #4c69fa;
  }
`;

export default {
  name: "Footer",
  components: {
    FooterWrapper
  }
};
</script>

<style>
</style>