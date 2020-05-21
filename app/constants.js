export const NAME = 'news';
export const PAGESIZE = 40;

//Redux Action Types
export const HEADLINES_AVAILABLE = `${NAME}/HEADLINES_AVAILABLE`;

export const HEADLINES_SOURCE_AVAILABLE = `${NAME}/HEADLINES_SOURCE_AVAILABLE`;

export const CATEGORY_HEADLINES_AVAILABLE = `${NAME}/CATEGORY_HEADLINES_AVAILABLE`;

//API URL
export const API_URL = 'https://newsapi.org/v2';
export const API_KEY = '?apiKey=77a3eafd905645548ef0193e5b277f52';
export const API_PARAMS = `&pageSize=${PAGESIZE}`;

//API End Points
// export const HEADLINES = `${API_URL}/everything?domains=wsj.com,nytimes.com${API_KEY}${API_PARAMS}`;
// export const HEADLINES = `${API_URL}/top-headlines${API_KEY}&sources=bbc-news`;
export const HEADLINES = `${API_URL}/top-headlines${API_KEY}${API_PARAMS}`;
export const SEARCH = `${API_URL}/everything${API_KEY}${API_PARAMS}&sortBy=relevancy`;

//CATEGORIES
export const CATEGORIES = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];
export const SOURCES = ['google-news-ru', 'Lenta', 'RBC'];