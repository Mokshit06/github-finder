<template>
  <RepoItemWrapper
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div>
      <RepoName>
        <i class="fa fa-bookmark"></i>
        <h3>{{ repo.name }}</h3>
      </RepoName>
      <RepoDesc v-if="repo.description">
        {{ repo.description }}
      </RepoDesc>
    </div>
    <RepoStats>
      <RepoStatsLeft>
        <span>
          <Language :language="repo.language"></Language>
          {{ repo.language }}</span
        >
        <span>
          <i class="fa fa-star"></i>
          {{ repo.watchers_count }}
        </span>
        <span>
          <i class="fa fa-code-fork"></i>
          {{ repo.forks }}
        </span>
      </RepoStatsLeft>
      <div>
        <span>{{ repo.size.toLocaleString() }} KB</span>
      </div>
    </RepoStats>
  </RepoItemWrapper>
</template>

<script>
import styled from "vue-styled-components";
import colors from "../utils/colors";

const RepoItemWrapper = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100%;
  color: #586069;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: #0003 0px 10px 30px -15px;
  transition: 200ms ease-in-out;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 20px -15px;
  }
`;

const RepoName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  & i {
    display: inline-block;
    color: #3c434b;
    margin-right: 0.5rem;
    min-width: 1rem;
  }

  & h3 {
    font-family: "Fira Code", monospace;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.25rem;
    font-weight: 500;
    color: #24292e;
    margin: 0;
  }
`;

const RepoDesc = styled.p`
  color: #586069;
  font-size: 15px;
  margin-bottom: 2rem;
`;

const RepoStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6a737d;
`;

const RepoStatsLeft = styled.div`
  display: flex;
  flex-grow: 1;

  & span {
    display: flex;
    align-items: center;
    margin-right: 0.75rem;

    & i {
      margin-right: 0.25rem;
    }
  }
`;

const Language = styled("div", ["language"])`
  border-radius: 100%;
  width: 10px;
  height: 10px;
  margin-right: 0.25rem;
  background-color: ${props =>
    props.language ? colors[props.language] : "#4c69fa"};
`;

export default {
  name: "RepoItem",
  props: ["repo"],
  components: {
    RepoItemWrapper,
    RepoName,
    RepoDesc,
    RepoStats,
    RepoStatsLeft,
    Language
  }
};
</script>

<style>
</style>