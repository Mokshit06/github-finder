function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

function getNumberOfTimes(arr) {
  const numberOfTimes = [];

  let fr = [];
  let visited = -1;

  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        count++;
        fr[j] = visited;
      }
    }
    if (fr[i] !== visited) {
      fr[i] = count;
    }
  }
  for (let i = 0; i < fr.length; i++) {
    if (fr[i] !== visited) {
      numberOfTimes.push(fr[i]);
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

async function getColors(languages) {
  const colorsResponse = await fetch('js/colors.json');
  const colorsArray = await colorsResponse.json();

  const colors = languages.map(language =>
    LightenDarkenColor(colorsArray[language], 20)
  );
  const borderColor = colors.map(color => LightenDarkenColor(color, -20));
  return {
    colors,
    borderColor,
  };
}

export { LightenDarkenColor, getNumberOfTimes, getStars, getColors };
