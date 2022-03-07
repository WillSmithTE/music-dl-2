import React, { memo, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';

import { SCREENS } from '../../../constants';
import { Storage } from '../../../helpers';
import { toString } from '../../../util';
import { RootState } from '../../../store/reduxStore';
import { Song } from '../../../types';
import { SongListItem } from './SongListItem';

export const SongList = ({ style = {}, indicator = true, useIndex = false, sound }) => {
	const { navigate } = useNavigation();

	const songs = useSelector((state: RootState) => state.player.songs)
	const dispatch = useDispatch()

	const onPlayPress = (song: Song, index: number) => {
		console.info(`Play pressed (song=${toString(song)}, index=${index})`)
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{
				...style,
				padding: 20,
			}}
			showsVerticalScrollIndicator={indicator}
		>
			{songs.map((song, key) => {
				const index = songs.findIndex((i) => i?.id === song?.id);

				return (
					<SongListItem
						key={key}
						id={song.id}
						imageURL={song.image}
						title={song.title}
						author={song.author}
						uri={song.uri}
						duration={song.durationMillis}
						onPlayPress={() => onPlayPress(song, index)}
						moreOptions={[
							{
								text: 'Play',
								onPress: () => onPlayPress(song, index),
							},
						]}
					/>
				);
			})}

		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
