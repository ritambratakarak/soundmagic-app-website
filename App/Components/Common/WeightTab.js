import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { FONT, COLORS, GAP, HEIGHT, WIDTH } from '../../Utils/constants';

const screenwidth = Dimensions.get('window').width;

const WeightTab = (props) => {
    const activeTab = props.active
    const changeTab = props.onPress
    const tab = props.data.length

    const g=(100/tab)-1

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: 'row', height: 40, width: "100%", marginBottom: 15 }}>

                {props.data != undefined ? props.data.map((data, i) => {
                    return (
                        <TouchableOpacity onPress={() => changeTab(i)} style={[{ justifyContent: "center", height: 40, alignItems: 'center', borderRadius: 25,  margin: 5, marginRight: WIDTH * 0.050}]}>
                            {activeTab == i ?
                                <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center",}}>
                                    <Text style={[{ textAlign: 'center', fontSize: FONT.SIZE.MEDIUM, color: COLORS.PRIMARY, marginVertical:5 }, activeTab == i ? { fontWeight: "bold"} : { fontWeight: "200", color: "#fff", }]}>{data}</Text>
                                    <View style={{height:2, width:"100%", backgroundColor:"#fff"}}/>
                                </View>
                                :
                                <Text style={[{ textAlign: 'center', fontSize: FONT.SIZE.MEDIUM },  {color: COLORS.GRAY }]}>{data}</Text>
                            }
                        </TouchableOpacity>
                    )
                }) : null}


            </View>
        </View>


    )
}

export default WeightTab;
