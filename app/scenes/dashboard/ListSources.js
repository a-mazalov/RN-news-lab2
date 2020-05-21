
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, ScrollView, View, Text, AsyncStorage, TouchableOpacity, Image, StyleSheet, SafeAreaView, FlatList, Switch, CheckBox, ListItem,Left, Right, Button, Alert  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'


import * as api from "../../api";
import {addHeadlines, addHeadlinesSource} from "../../actions";
import Article from "../../utils";

import Panel from '../../components/Panel'
import PanelItem from '../../components/PanelItem'

export default function ListSources(props) {

	const dispatch = useDispatch();
	const { navigate } = props.navigation;

	//1 - DECLARE VARIABLES
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(true);

	//Access Redux Store State
	const newsReducer = useSelector(({ newsReducer }) => newsReducer);
	// const {business, entertainment, general, health, science, sports, technology} = newsReducer;
	const { news } = newsReducer;
	
	// async function _retrieveData() {
	// 	try {
	// 	  const value = await AsyncStorage.getItem('asdf');
	// 	  if (value !== null) {
	// 		// We have data!!
	// 		console.log('async store',value);
	// 	  }
	// 	} catch (error) {
	// 	  // Error retrieving data
	// 	}
	// };

	// async function _storeData() {
	// 	try {
	// 	  await AsyncStorage.setItem('TASKS', 'I like to save it.');
	// 	} catch (error) {
	// 	  // Error saving data
	// 	}
	// };






	const DATA = [
		{
			id: '0',
			title: 'Google News',
			source: 'google-news-ru',
		},
		{
			id: '1',
			title: 'Lenta',
			source: 'lenta',
		},
		{
			id: '2',
			title: 'RBC',
			source: 'rbc',
		},
	];
	  
	function Item({ id, title, selected, onSelect }) {
		return (
			<TouchableOpacity
				onPress={() => onSelect(id)}
				style={[
					styles.item,
					{ backgroundColor: selected ? '#1abc9c' : '#bdc3c7' },
				]}
			>
				<Text style={styles.title}>{title}</Text>
			</TouchableOpacity>
		);
	}
	
	const [selected, setSelected] = React.useState(new Map());

	const onSelect = React.useCallback(
		id => {
			const newSelected = new Map(selected);
			newSelected.set(id, !selected.get(id));
	
			setSelected(newSelected);
			  
			  
		},
		[selected],
	);

	
	console.log('selected', selected);
	

	const onCTAPress = (sourcesParam) => navigate("DashBoard", { sourcesParam });
	
	let userSourceList = ["lenta"];
	
	function onSetSources() {

		let sources = [];

		selected.forEach((value, key, map) => {
			if (value) {
				console.log(`m[${key}] = ${value}`);

				sources.push(DATA[key].source);

			}

		});

		if (!sources.length) {
			Alert.alert(
				'Необходимо выбрать источники',
				'Минимум 1',
				[
				//   { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
				//   {
				// 	text: 'Cancel',
				// 	onPress: () => console.log('Cancel Pressed'),
				// 	style: 'cancel',
				//   },
				  { text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			);
		} else {
			onCTAPress(sources);
		}

		console.log('btn PRESS', sources);
		userSourceList = sources;

		
	}

	

	// if (!userSourceList.length) {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => (
						<Item
							id={item.id}
							title={item.title}
							selected={!!selected.get(item.id)}
							onSelect={onSelect}
						/>
					)}
					keyExtractor={item => item.id}
					extraData={selected}
				/>
					
				<Button
					onPress={onSetSources}
					title="Продолжить"
					color="#3498db"
					accessibilityLabel=""
				/>
			</SafeAreaView>
		);
	// }


	//==================================================================================================
	async function _retrieveData() {
		try {
			const value = await AsyncStorage.getItem('asdf');
			if (value !== null) {
				// We have data!!
				console.log('async store', value);
			}
		} catch (error) {
			// Error retrieving data
		}
	};

	async function _storeData() {
		try {
			await AsyncStorage.setItem('TASKS', 'I like to save it.');
		} catch (error) {
			// Error saving data
		}
	};


	//2 - MAIN CODE BEGINS HERE
	useEffect(() => {
		
		// let userSources = _retrieveData();
		// _storeData();
		// if (userSources) {
			
		// }
	}, []);

	//==================================================================================================

	//==================================================================================================
}

ListSources.navigationOptions = ({navigation}) => {
    return {title: `Источники`}
};


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	logo: {
	  width: 305,
	  height: 159,
	  marginBottom: 20,
	},
	instructions: {
	  color: '#888',
	  fontSize: 18,
	  marginHorizontal: 15,
	  marginBottom: 10,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 10,
	  },
	  title: {
		  fontSize: 28,
		  color: '#FFFFFF'
	  },
  });