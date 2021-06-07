import React from 'react'
import { View, Text, Modal, StyleSheet, TextInput, Dimensions } from 'react-native'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const modal = ({modal, modalVisible, onchange, value, placeholder, close}) => {
    return (
        <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={()=>{
                modalVisible(!modal)
            }}
        >
            <View style={styles.container}>
                <View style={styles.modalbody}>
                    <Text onPress={close}>close</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(cal)=>{onchange(val)}}
                        value={value}
                        placeholder={placeholder}
                    />

                </View>
            </View>
        </Modal>
    )
}

export default modal;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.3)"
    },
    modalbody:{
        backgroundColor:"#fff",
        width:width/2,
        height: height * 10,
        alignItems:"center",
        justifyContent:"center"
    },
    textInput:{
        width:"80%",
        height: "40%",
        fontSize:15,
        padding:10,
        borderColor:"gray",
        borderWidth:1,
        color:"#000"
    },
})
