
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    ImageBackground,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';





const Main = ({ navigation }) => {
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

    const getAllFolders = async (path) => {
        try {
            const result = await FileSystem.readDirectoryAsync(path);
            

            console.log('GOT RESULT',result);
            setFolders(result.map((name) => ({ name, path: `${path}/${name}` })));
        } catch (err) {
            console.log(err.message, err.code);
        }
    };

    const isFolder = (name) => {
        const itsfolder = name.includes('.')
        return itsfolder;
    };

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
                `${currentPath}/${fileName}`,
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
            getAllFolders(currentPath);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={{ flex: 1 }}>
            <Text
                onPress={() => navigation.navigate('Folders')}
                style={{
                    flexDirection:"row",
                    backgroundColor: 'honeydew',
                    width: "20%",
                    // borderRadius:10
                      textAlign:'center',
                      paddingBottom:10
                }}>
                 <MaterialCommunityIcons name="folder" color={'black'} size={26} /> 
                 <Text>Go</Text>
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', margin: 20 }}>
                {currentPath === FileSystem.documentDirectory ? null : (
                    <Text
                        style={{ fontWeight: '700' }}
                        onPress={() => {
                            setCurrentPath(FileSystem.documentDirectory);
                            getAllFolders(FileSystem.documentDirectory);
                        }}
                    >
                        Back
                    </Text>
                )}

                <Text style={{ marginLeft: 20 }}>{currentPath}</Text>
            </View>
            <View style={{}}>

                <FlatList
                    style={{ marginBottom: 100 }}
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
                            onPress={() => {
                                if (!isFolder(item.name)) {
                                    setCurrentPath(item.path);
                                    getAllFolders(item.path);
                                    
                                }
                                
                            }}
                            onLongPress={() => {
                                deleteDir(item.path);
                            }}
                        >
                            {isFolder(item.name) ? (
                                <Image

                                    source={require("../images/file.png")}
                                    style={{ width: 50, height: 50 }}
                                />
                            ) : (
                                <Image
                                    source={require("../images/open-folder.png")}
                                    style={{ width: 50, height: 50 }}
                                />
                            )}
                            <Text>
                                {item.name.length > 20 ? `${item.name.substring(0, 10)}...` : item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.path}
                />

            </View>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 50,
                    // backgroundColor: '#000',
                    width: 50,
                    height: 50,
                    // borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                {/* <Text style={{ color: '#fff', fontSize: 30 }}>+</Text> */}
                <ImageBackground style={{
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    source={require("../images/folder.png")}>
                    <Text style={{ fontSize: 40 }}>+</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 130,
                    // backgroundColor: '#000',
                    width: 50,
                    height: 50,
                    // borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    setModalVisible2(true);
                }}
            >
                {/* <Text style={{ color: '#fff', fontSize: 30 }}>cf</Text> */}
                <ImageBackground style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} source={require("../images/icon-file.png")}>
                    <Text style={{ fontSize: 40 }}>+</Text>
                </ImageBackground>
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
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 15
                        }}>Add New Folder</Text>

                        <TextInput
                            placeholder="Enter Folder Name"
                            value={folderName}
                            onChangeText={(txt) => setFolderName(txt)}
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                alignSelf: 'center',
                                marginTop: 20,
                                paddingLeft: 20,
                                borderRadius: 10,

                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 25,
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
            <Modal
                transparent
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(false);
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
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 15
                        }}>Add New File</Text>
                        <TextInput
                            placeholder="Enter File Name"
                            value={fileName}
                            onChangeText={(txt) => setFileName(txt)}
                            style={{
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                alignSelf: 'center',
                                marginTop: 20,
                                paddingLeft: 20,
                                borderRadius: 10,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: 25,
                                alignSelf: 'center',
                                width: '90%',
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: '#000',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setModalVisible2(false);
                                createFile();
                                setFileName('')


                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 18 }}>Create File</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Main;