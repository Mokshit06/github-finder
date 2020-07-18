function getFrequency(arr) {
  const numberOfTimes = [];

  let isVisised = [];
  let visited = -1;

  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        count++;
        isVisised[j] = visited;
      }
    }
    if (isVisised[i] !== visited) {
      isVisised[i] = count;
    }
  }
  for (let i = 0; i < isVisised.length; i++) {
    if (isVisised[i] !== visited) {
      numberOfTimes.push(isVisised[i]);
    }
  }
  return numberOfTimes;
}

function getStars(repos) {
  let language = [];
  repos.forEach(repo => {
    language.push({
      repo: repo.language,
      stars: repo.watchers_count,
    });
  });
  let starsPerLanguage = {};
  language.forEach(language => {
    if (!starsPerLanguage[language.repo]) {
      starsPerLanguage[language.repo] = 0;
    }
    starsPerLanguage[language.repo] += language.stars;
  });
  delete starsPerLanguage.null;
  return starsPerLanguage;
}

export { getFrequency, getStars };
