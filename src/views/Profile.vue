<template>
  <div>
    <Loading v-if="loading" />
    <NotFound v-else-if="error" error="User"></NotFound>
    <ProfileComponent v-else :user="user" :repos="repos" />
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading";
import NotFound from "./NotFound";
import ProfileComponent from "@/components/ProfileComponent";

export default {
  components: {
    NotFound,
    Loading,
    ProfileComponent
  },

  data() {
    return {
      user: null,
      repos: null,
      loading: false,
      error: false
    };
  },

  methods: {
    async fetchUser(user) {
      const urls = [
        `https://api.github.com/users/${user}`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=1`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=2`,
        `https://api.github.com/users/${user}/repos?per_page=100&page=3`
      ];

      try {
        let [userData, ...repoArr] = await Promise.all(
          urls.map(url => axios.get(url, {
            auth: {
              username: process.env.VUE_APP_API_KEY,
              password: process.env.VUE_APP_API_SECRET
            }
          }))
        );

        const {
          avatar_url,
          login,
          html_url,
          name,
          bio,
          followers,
          following,
          created_at,
          public_repos
        } = userData.data;

        const repoArrData = repoArr.map(repo => repo.data);
        const repoData = [
          ...repoArrData[0],
          ...repoArrData[1],
          ...repoArrData[2]
        ];

        this.user = {
          avatar_url,
          login,
          html_url,
          name,
          bio,
          followers,
          following,
          created_at,
          public_repos
        };

        this.repos = repoData;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    letterCase(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
  },

  watch: {
    $route: "fetchUser"
  },

  async created() {
    this.user = this.repos = this.error = null;
    this.loading = true;
    try {
      await this.fetchUser(this.$route.params.username);
      this.loading = false;
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
  },

  metaInfo() {
    return {
      title: this.letterCase(this.$route.params.username),
      meta: [
        {
          name: "description",
          content: `${this.letterCase(this.$route.params.username)},${
            this.$route.params.username
          }, Github Finder, Mokshit Jain, Mokshit Jain Github Finder`
        }
      ]
    };
  }
};
</script>

<style>
</style>