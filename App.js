import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://mysafeinfo.com/api/data?list=moviequotes&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMydata(myJson);
                    originalData = myJson;
                }
            })
            .catch((error) => console.error(error)); // Error handling
    }, []);

    // Filter data based on user input
    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.Movie.toLowerCase().includes(text.toLowerCase())
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };

    // Render each item
    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.movieTitle}>{item.Movie}</Text>
                <Text style={styles.quoteText}>{item.Quote}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.searchLabel}>Search:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Enter movie name"
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
});

export default App;
