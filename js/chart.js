class ChartShow {
  showLanguageChart(languages, colors, borderColor) {
    const language = document.querySelector('#language');
    const languageChart = new Chart(language, {
      type: 'pie',
      data: {
        labels:
          languages.languages.length < languages.numberOfTimes.length
            ? [...languages.languages, 'Others']
            : languages.languages,
        datasets: [
          {
            data: languages.numberOfTimes,
            backgroundColor: colors,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }

  showStarredChart(starred) {
    const starredRepo = document.querySelector('#starred');

    const starredChart = new Chart(starredRepo, {
      type: 'bar',
      data: {
        labels: starred.repoNames,
        datasets: [
          {
            labels: 'This will be hide',
            data: starred.stars,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });
  }

  showStarsLanguageChart(languages, colors, borderColor) {
    const starsPerLanguage = document.querySelector('#starsPerLanguage');
    if (languages.stars.every(star => star === 0)) {
      return starsPerLanguage.insertAdjacentHTML(
        'beforebegin',
        '<p>No data available yet!</p>'
      );
    }
    console.log(languages);
    const starsChart = new Chart(starsPerLanguage, {
      type: 'doughnut',
      data: {
        labels: languages.languages,
        datasets: [
          {
            data: languages.stars,
            backgroundColor: colors,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }
}

export const chart = new ChartShow();
