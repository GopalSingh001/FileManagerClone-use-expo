import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
    
const Main = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [fileName, setFileName] = useState('');
    const [currentPath, setCurrentPath] = useState(FileSystem.documentDirectory);
    const [folders, setFolders] = useState([]);

    const requestStoragePermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
            if (status === 'granted') {
                console.log('You can use the storage');
                getAllFolders(currentPath);
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        requestStoragePermission();
    }, []);

  

    const createFolder = async () => {

        try {
            await FileSystem.makeDirectoryAsync(`${currentPath}/${folderName}`);
            getAllFolders(currentPath);
        } catch (error) {
            console.log(error);
        }
    };

    const createFile = async () => {
        try {
            await FileSystem.writeAsStringAsync(
                `${currentPath}/${fileName}.txt`,
                'hello how are you'
            );
            getAllFolders(currentPath);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDir = async (path) => {
        try {
            await FileSystem.deleteAsync(path);
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flexDirection: 'row', margin: 20, marginTop: 70 }}>
                {currentPath === FileSystem.documentDirectory ? null : (
                    <Text
                        style={{ fontWeight: '700' }}
                        onPress={() => {
                            setCurrentPath(FileSystem.documentDirectory);
                            
                        }}
                    >
                        Back
                    </Text>
                )}
                <Text style={{ marginLeft: 20 }}>{currentPath}</Text>
            </View>
            <View style={{ marginTop: 50 }}>
                <ScrollView>
                    <FlatList
                        data={folders}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 100,
                                }}
                                
                                onLongPress={() => {
                                    deleteDir(item.path);
                                }}
                            >
                               
                                
                                <Text>
                                    {item.name.length > 20 ? `${item.name.substring(0, 10)}...` : item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.path}
                    />
                </ScrollView>
            </View>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 50,
                    backgroundColor: '#000',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={{ color: '#fff', fontSize: 30 }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 20,
                    
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setModalVisible2(true);
                }}
            >
                <Text style={{ color: '#fff', fontSize: 30 }}>cf</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: '90%',
                            height: 200,
                            borderRadius: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Enter Folder Name"
                            value={folderName}
                            onChangeText={(txt) => setFolderName(txt)}
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                alignSelf: 'center',
                                marginTop: 50,
                                paddingLeft: 20,
                                borderRadius: 10,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                alignSelf: 'center',
                                width: '90%',
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: '#000',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                          onPress={() => {
                                setModalVisible(false);
                                createFolder();
                                setFolderName('');
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18 }}>Create Folder</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
             
        </View>
    );
};

export default Main;


