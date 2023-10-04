import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';

export default function Home({navigation}) {

    const [data, setData] = useState();

    const API_URL = "https://www.bcferriesapi.ca/api/TSA/";

    useEffect(() => {
        fetch(API_URL)
        .then(response => response.json())
        .then (response => {
            setData(response);
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ferries Leaving Tsawwassen</Text>
            <Text style={styles.subtitle}>To: Duke Point (Nanaimo)</Text>
            {
                data && data.DUK.sailings.map((s, index) => {
                    return (
                    <View 
                        key={index}
                        style={styles.status}
                        >
                        <Text>
                            {s.isCancelled === "false" ? "Not Cancelled" : "Cancelled"}
                        </Text>
                        <View style={styles.progress}>
                        <Text>Vessel Name: {s.vesselName}</Text>
                            {s.carFill < 100 ? <Progress.Bar 
                            progress={s.carFill/100}
                                        width={200} 
                                        color= {s.carFill >= 90 ? 'red' : 
                                                        s.carFill >= 60 ? 'yellow' : 'blue'}
                            /> : <Text style={styles.full}>Full</Text>}  
                        </View>          
                    </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: -50
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
    progress: {
        display: 'flex',
        flexDirection: 'column',
    },
    full: {
        textAlign: 'right'
    }
});
