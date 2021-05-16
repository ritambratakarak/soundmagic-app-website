import React from 'react';
import { Text, Image, View, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
const Devicewidth = Dimensions.get('window').width;
const Deviceheight = Dimensions.get('window').height;
import { FONT, HEIGHT, WIDTH, GAP, COLORS } from '../../Utils/constants';



const HomeList = (props) =>
    (
        <TouchableOpacity style={{ borderRadius: 15, height: Deviceheight / 6.5, width: Devicewidth / 2.5, marginRight:10 }} onPress={props.onPress}>

            <ImageBackground style={{ height: "100%", width: "100%", }}
                source={{ uri: props.img }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={{ alignItems: "flex-end", margin: 10 }}>
                    <Text style={{fontSize:FONT.SIZE.MEDIUM, color:COLORS.WHITE, fontFamily:FONT.FAMILY.BOLD}}>{"$"+ props.price}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "flex-end", flex: .9, paddingHorizontal: 5 }}>
                    <View>
                        <Text style={{ color: COLORS.WHITE, fontSize: FONT.SIZE.MEDIUM, fontFamily:FONT.FAMILY.HEAVY  }} ellipsizeMode={"tail"} numberOfLines={1}>{props.name}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Image  source={{ uri: props.authorimg }} style={{height: 15, width:15, borderRadius: HEIGHT / 2}} />
                            <Text style={{ color: COLORS.WHITE, fontSize: FONT.SIZE.SMALL, fontFamily:FONT.FAMILY.LIGHT, marginLeft: 5 }}>{props.author}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

const styles = StyleSheet.create({

})

export default HomeList;