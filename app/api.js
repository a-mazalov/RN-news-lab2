import axios from 'axios';
import { AsyncStorage } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import * as c from './constants';
import * as Network from 'expo-network';

export async function getHeadlines(country = "ru"){
    try{
        let requests = [];
        c.CATEGORIES.map((category) => {
            let url =  `${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`;
            requests.push(axios.get(url))
        });

        let response = await Promise.all(requests);
        response.map((resp, idx) => {
            let {articles, totalResults} = resp.data;

            response[idx] = {articles, totalResults};
        });

        let [business, entertainment, general, health, science, sports, technology] = response;

        return {business, entertainment, general, health, science, sports, technology};

    }catch (e) {
        throw new Error(e);
    }
}
export async function getHeadlinesSources(country = "ru", userSources = []) {
	

	let connections = await Network.getNetworkStateAsync();


	console.log('connect', connections);

	// NetInfo.getConnectionInfo().then(state => {
	// 	console.log('Connection type', state);
	// 	console.log('Is connected?', state.effectiveType);


	// 	if (state.effectiveType == "2g") {
	// 		const getItems = AsyncStorage.getItem('labTreeCacheNews')
	// 		const parsedItems = JSON.parse(getItems)

    //    	 	return {parsedItems};
	// 	} else {
			
	// 	}

	// });

	if (connections.isConnected) {
		try{
			let requests = [];
			

			// c.CATEGORIES.map((category) => {
			// 	let url =  `https://cors-anywhere.herokuapp.com/${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`;
			// 	requests.push(axios.get(url, {
			// 		headers: {'Access-Control-Allow-Origin': 'http://localhost:19006/'}
			// 	}
					
			// 	))
			// });

			let url = `https://cors-anywhere.herokuapp.com/${c.HEADLINES}&sources=`;
			

			let config = {
				headers: {'Access-Control-Allow-Origin': 'http://localhost:19006/'}
			};

			if (userSources.length == 0) {
				c.SOURCES.map((source) => {
					url += `${source.toLowerCase()},`;
					requests.push(axios.get(url,config))
				});	
			} else {
				userSources.map((source) => {
					url += `${source.toLowerCase()},`;
					requests.push(axios.get(url,config))
				});	
			}
	
	
			let response = await Promise.all(requests);
			response.map((resp, idx) => {
				console.log('resp',  resp, idx);
	
				let {articles, totalResults} = resp.data;
	
				response = {articles, totalResults};
			});
	
			console.log('api 45', response);
	
	
			const saveItems = await AsyncStorage.setItem('labTreeCacheNews', JSON.stringify(response))
			// const getItems = await AsyncStorage.getItem('laboneitems')
			// const parsedItems = JSON.parse(getItems)
	
			// let [bbs] = response;
	
			// response.message = "asdfasdf"

			return { response: response };
	
		}catch (e) {
			throw new Error(e);
		}
	} else {
		const getItems = await AsyncStorage.getItem('labTreeCacheNews')
		
		let cache = JSON.parse(getItems);
		
		console.log('cache', cache);
		// let articles = cache.articles.splice(0, 1)
	
		cache.articles = cache.articles.splice(0, 3);
		cache.message = "Нет подключения к интернету! \n Доступные локальные новости:"
		// const resp = cache
	
		return { response: cache };
	}

	


}

export async function getHeadlinesByCategory(category, page=1, country = "us"){
    try{
        const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`;
        let res = await axios.get(url);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function search(query, cancelToken){
    try{
        const url = `${c.SEARCH}&q=${query.toLowerCase()}`;
        let res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });

        return res.data;

    }catch (error) {
        let err = new Error(error.message);
        err.isCancel = (axios.isCancel(error));

        throw err;
    }
}