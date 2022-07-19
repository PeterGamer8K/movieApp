import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { theme } from "../../global/theme";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { useNavigation, useRoute } from "@react-navigation/native";
import { MovieSection } from '../../components/MovieSection'
import { api, apiFunctions } from "../../services/api";
import { myApiFunctions } from "../../services/backend";
import { localstorage } from "../../services/localstorage";

export function ListOfMovies() {

    const route = useRoute();

    const [movies, setMovies] = useState([]);


    async function loadData() {

        const listId = route.params.listId;
        const response = await myApiFunctions.getAllMoviesFromList({ listId, token: localstorage.user.token });

        if (response.error) {
            console.error(response.msg);
        }

        const tmdbMovieList = [];


        for (let i = 0; i < response.list.length; i++) {
            const movie = response.list[i];
            const movieFound = await apiFunctions.getMovie(movie.TMDBid);
            tmdbMovieList.push(movieFound.data);
        }


        setMovies(tmdbMovieList);
    }

    useEffect(() => {


        loadData()

    }, [])

    const navigation = useNavigation();

    function handleGoBackClick() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity
                    onPress={function () {
                        handleGoBackClick();
                    }}
                >
                    <AntDesign name="left" size={24} color={theme.colors.text} />

                </TouchableOpacity>

                <Text style={styles.title}>{route.params.listName}</Text>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteText}>Delete list</Text>
                        <MaterialIcons name="delete" size={18} color={theme.colors.secondary} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <MovieSection movieList={movies} navigation={navigation} showTitle={false} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 62,
        marginHorizontal: 24,
        marginBottom: 40,
    },
    title: {
        color: theme.colors.text,
        fontSize: 24,
    },
    deleteButton: {
        backgroundColor: theme.colors.gray,
        flexDirection: "row",
        width: 132,
        height: 36,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 20,
        paddingHorizontal: 16
    },
    deleteText: {
        fontSize: 14,
        color: theme.colors.inactiveTabBar,
    },
    content: {
        marginHorizontal: 24,
    },
});