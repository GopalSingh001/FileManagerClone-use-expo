import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Music() {
    const [musicFiles, setMusicFiles] = useState([]);
  
    useEffect(() => {
      getMusicFiles();
    }, []);
  
    const getMusicFiles = async () => {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const musicFiles = files.filter(file => file.endsWith('.mp3'));
      setMusicFiles(musicFiles);
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text 
        style={{
            width:'100%',
            backgroundColor:'#FFFAF0',
            textAlign:'center',
            fontSize:25,
            fontWeight:'bold',
            color:'orange'}}>Music</Text>
        <FlatList
         style={{
            paddingStart:40,
        }}
          data={musicFiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons style={{marginTop:15,marginEnd:4}} name="music-note" color={"green"} size={26} />
            
            <Text style={{fontStyle:'italic',fontSize:20,paddingTop:10}}>{item}</Text>
          </View>
          }
        />
      </View>
    );
  }

export default Music;
