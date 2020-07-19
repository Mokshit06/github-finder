<template>
  <FormWrapper>
    <Form @submit.prevent="submitForm">
      <Icon />
      <Heading>Github Finder</Heading>
      <label for="input">Find your Github Profile</label>
      <input type="text" v-model="username" />
    </Form>
  </FormWrapper>
</template>

<script>
import styled from "vue-styled-components";
import Icon from "@/components/Icon.vue";

const FormWrapper = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: linear-gradient(#1a1e22 0%, #24292e 100%);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2.7rem;
  font-weight: 500;
  color: #f8f8f8;
  margin: 1rem 2rem 1rem;
  display: block;

  @media (max-width: 640px) {
    font-size: 2.1rem;
  }
`;

const Form = styled.form`
  max-width: 600px;
  text-align: center;
  padding: 2rem;
  margin-bottom: 70px;

  & input {
    border-radius: 5px;
    background: #26303c;
    width: 100%;
    max-width: 500px;
    color: #6883fd;
    font-family: "Fira Code", monospace;
    text-align: center;
    border: none;
    outline: 0px;
    padding: 1.2rem;
    font-size: 1.65rem;

    @media (max-width: 640px) {
      width: 85%;
      padding: 0.9rem;
      font-size: 1.5rem;
    }
  }

  & label {
    font-size: 1.2rem;
    font-weight: 400;
    color: #e6f2ff;
    margin: 0 1.5rem 1.5rem;
    display: block;

    @media (max-width: 640px) {
      font-size: 1.17rem;
    }
  }
`;

export default {
  data() {
    return {
      username: ""
    };
  },
  components: {
    FormWrapper,
    Form,
    Heading,
    Icon
  },
  methods: {
    submitForm() {
      this.$router.push({ path: `/${this.username.toLowerCase()}` });
    }
  }
};
</script>
