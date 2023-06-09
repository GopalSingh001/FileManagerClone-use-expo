import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


function Images() {
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        getImageFiles();
    }, []);

    const getImageFiles = async () => {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.pdf'));
        setImageFiles(imageFiles);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{
                width: '100%',
                backgroundColor: '#FFFAF0',
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: 'orange'

            }}>Images</Text>
            <FlatList
                style={{
                    paddingStart: 40,
                    color: 'black',


                }}
                data={imageFiles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>{
                    item.endsWith(".pdf") ? <MaterialCommunityIcons style={{ marginTop: 15, marginEnd: 4 }} name="file-pdf-box" color={"red"} size={26} />
                        : item.endsWith(".png") ? 
                        <MaterialCommunityIcons style={{ marginTop: 15, marginEnd: 4 }} name="file-png-box" color={"blue"} size={26} />
                        :  <MaterialCommunityIcons style={{ marginTop: 15, marginEnd: 4 }} name="image" color={"orange"} size={26} />
                }

                    <Text style={{ fontStyle: 'italic', fontSize: 20, paddingTop: 10 }}>{item}</Text>
                </View>
                }
            />
        </View>
    );
}


export default Images;
