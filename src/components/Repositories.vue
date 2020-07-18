<template>
  <RepoWrapper>
    <RepoHeader>Top Repos</RepoHeader>
    <RepoGrid>
      <div v-for="repo in repositories" :key="repo.id">
        <RepoItem :repo="repo" />
      </div>
    </RepoGrid>
  </RepoWrapper>
</template>

<script>
import styled from "vue-styled-components";
import RepoItem from "./RepoItem";

const RepoWrapper = styled.section`
  padding: 3rem 5rem;
  background: #f6f8fa;
`;

const RepoHeader = styled.h2`
  margin: 0px;
  font-size: 1.75rem;
  background-image: linear-gradient(90deg, #d1d5da 50%, #fff0 0px);
  background-position: center bottom;
  background-repeat: repeat-x;
  background-size: 10px 2px;
  padding-bottom: 6px;
  margin-bottom: 2rem;
  width: fit-content;
`;

const RepoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  list-style: none;
`;

export default {
  name: "Repositories",
  components: {
    RepoWrapper,
    RepoHeader,
    RepoGrid,
    RepoItem
  },
  props: ["repositories"]
};
</script>