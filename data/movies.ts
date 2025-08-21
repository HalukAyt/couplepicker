export type Movie = {
  id: string;
  title: string;
  minutes: number;
  genres: string[];
  platforms: string[];
  poster: string;
  tags?: string[];
};

export const MOVIES = [
  {
    id: 'tt0111161',
    title: 'The Shawshank Redemption',
    minutes: 142,
    genres: ['drama'],
    platforms: ['Netflix'],
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    tags: ['hüzünlü', 'umut']
  },
  {
    id: 'tt0109830',
    title: 'Forrest Gump',
    minutes: 142,
    genres: ['drama','romance'],
    platforms: ['Prime'],
    poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    tags: ['romantik','hafif']
  },
  {
    id: 'tt1375666',
    title: 'Inception',
    minutes: 148,
    genres: ['sci-fi','thriller'],
    platforms: ['Netflix'],
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    tags: ['heyecanlı']
  },
  {
    id: 'tt0137523',
    title: 'Fight Club',
    minutes: 139,
    genres: ['drama','thriller'],
    platforms: ['HBO'],
    poster: 'https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg',
    tags: ['karanlık','gerilim']
  },
  {
    id: 'tt0120737',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    minutes: 178,
    genres: ['fantasy','adventure'],
    platforms: ['Prime'],
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    tags: ['epik','uzun']
  },
  {
    id: 'tt0167260',
    title: 'The Lord of the Rings: The Return of the King',
    minutes: 201,
    genres: ['fantasy','adventure'],
    platforms: ['Prime'],
    poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    tags: ['epik','duygusal']
  },
  {
    id: 'tt0468569',
    title: 'The Dark Knight',
    minutes: 152,
    genres: ['action','crime'],
    platforms: ['HBO'],
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    tags: ['heyecanlı','aksiyon']
  },
  {
    id: 'tt6751668',
    title: 'Parasite',
    minutes: 132,
    genres: ['drama','thriller'],
    platforms: ['Hulu'],
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    tags: ['gerilim','toplumsal']
  },
  {
    id: 'tt0110912',
    title: 'Pulp Fiction',
    minutes: 154,
    genres: ['crime','drama'],
    platforms: ['Netflix'],
    poster: 'https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg',
    tags: ['kült','karanlık mizah']
  },
  {
    id: 'tt0120815',
    title: 'Saving Private Ryan',
    minutes: 169,
    genres: ['war','drama'],
    platforms: ['Prime'],
    poster: 'https://image.tmdb.org/t/p/w500/miDoEMlYDJhOCvxlzI0wZqBs9Yt.jpg',
    tags: ['epik','hüzünlü']
  },
  {
    id: 'tt7286456',
    title: 'Joker',
    minutes: 122,
    genres: ['drama','crime'],
    platforms: ['HBO'],
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    tags: ['karanlık','psikolojik']
  },
  {
    id: 'tt0088763',
    title: 'Back to the Future',
    minutes: 116,
    genres: ['adventure','comedy'],
    platforms: ['Prime'],
    poster: 'https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg',
    tags: ['komik','nostaljik']
  },
  {
    id: 'tt0114709',
    title: 'Toy Story',
    minutes: 81,
    genres: ['animation','family'],
    platforms: ['Disney+'],
    poster: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
    tags: ['hafif','aile']
  },
  {
    id: 'tt4154796',
    title: 'Avengers: Endgame',
    minutes: 181,
    genres: ['action','sci-fi'],
    platforms: ['Disney+'],
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    tags: ['epik','aksiyon']
  },
  {
    id: 'tt2278388',
    title: 'The Grand Budapest Hotel',
    minutes: 99,
    genres: ['comedy','drama'],
    platforms: ['Disney+'],
    poster: 'https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg',
    tags: ['komik','stilize']
  }
];
