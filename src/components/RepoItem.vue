<template>
  <RepoItemWrapper
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div>
      <RepoName>
        <font-awesome-icon :icon="repoIcon" />
        <h3>{{ repo.name }}</h3>
      </RepoName>
      <RepoDesc v-if="repo.description" v-html="parseEmoji" />
    </div>
    <RepoStats>
      <RepoStatsLeft>
        <span>
          <Language :language="repo.language"></Language>
          {{ repo.language }}</span
        >
        <span>
          <font-awesome-icon :icon="starIcon" />
          {{ repo.watchers_count }}
        </span>
        <span>
          <font-awesome-icon :icon="branchIcon" />
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
import uEmojiParse from "universal-emoji-parser";
import colors from "../utils/colors";
import {
  faCodeBranch,
  faBookmark,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const RepoItemWrapper = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1.6em 2em;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100%;
  color: #586069;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: #0003 0px 10px 30px -15px;
  transition: 200ms ease-in-out;
  font-size: 95%;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 20px -15px;
  }

  @media (max-width: 800px) {
    font-size: 93%;
  }
`;

const RepoName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;

  & svg {
    color: #414952;
    margin-right: 0.9rem;
  }

  & h3 {
    font-family: "Fira Code", monospace;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.25em;
    font-weight: 500;
    color: #24292e;
    margin: 0;
  }
`;

const RepoDesc = styled.p`
  color: #586069;
  font-size: 1em;
  margin-bottom: 1.8em;
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

    & svg {
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
  computed: {
    parseEmoji() {
      return uEmojiParse.parse(this.repo.description);
    },
    branchIcon() {
      return faCodeBranch;
    },
    starIcon() {
      return faStar;
    },
    repoIcon() {
      return faBookmark;
    }
  },
  components: {
    RepoItemWrapper,
    RepoName,
    RepoDesc,
    RepoStats,
    RepoStatsLeft,
    Language,
    FontAwesomeIcon
  }
};
</script>

<style>
.emoji {
  height: 1em;
}
</style>