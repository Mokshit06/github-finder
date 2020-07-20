<template>
  <font-awesome-icon
    :icon="githubIcon"
    :size="size"
    :class="{ animated: animation }"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default {
  name: "Icon",
  props: ["big", "animation"],
  data() {
    return {
      size: this.big ? "7x" : "4x"
    };
  },
  computed: {
    githubIcon() {
      return faGithub;
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style scoped>
svg {
  color: #4c69fa;
}

.animated {
  animation: breathe 1.5s infinite normal;
}

@keyframes breathe {
  0% {
    transform: scale(0.9);
  }

  50% {
    transform: scale(0.97);
  }

  100% {
    transform: scale(0.9);
  }
}
</style>

