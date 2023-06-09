import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Videos() {
    const [videoFiles, setVideoFiles] = useState([]);
  
    useEffect(() => {
      getVideoFiles();
    }, []);
  
    const getVideoFiles = async () => {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const videoFiles = files.filter(file => file.endsWith('.mp4'));
      setVideoFiles(videoFiles);
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center'  }}>
        <Text style={{
            width:'100%',
            backgroundColor:'#FFFAF0',
            textAlign:'center',
            fontSize:25,
            fontWeight:'bold',
            color:'orange' 
            }}>Videos</Text>
        <FlatList
        style={{
            paddingStart:40,
        }}
          data={videoFiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =><View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons style={{marginTop:15,marginEnd:4}} name="video-outline" color={"red"} size={26} />
      
      <Text style={{fontStyle:'italic',fontSize:20,paddingTop:10}}>{item}</Text>
    </View>
    }
        />
      </View>
    );
  }
  

export default Videos;
