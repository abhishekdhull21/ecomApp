import { View, Text, StyleSheet,  FlatList, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Icon,ListItem    } from '@rneui/themed';
import app from '../../app.json'
import Profile from './Profile';
const DATA = [
    {id:1,title:'The First', subTitle:'The Second'},
    {id:3,title:'The First', subTitle:'The Second'},
    {id:4,title:'The First', subTitle:'The Second'},
    {id:5,title:'The First'},
]

const HeaderType = {
    PROFILE:'PROFILE',
    MENU:'MENU',
}

const MEASUREMENTS = {
    HEADER_HEIGHT:70
}
const TopHeader = (props) => {
    const [menu, setMenu] = useState({})

    const Item = ({title,subTitle}) => {
        return<ListItem>
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          {subTitle && <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>}
        </ListItem.Content>
      </ListItem>
    }

    const toggleMenu = (type) => {
        setMenu({[type]:!menu[type]})
    }
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Icon
                        name="user-circle-o"
                        size={32}
                        type='font-awesome'
                        color="#ffffff"
                        onPress={() => toggleMenu(HeaderType.PROFILE)}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{props.title || app.displayName}</Text>
                </View>
                <View>
                    <Icon
                        name="menu"
                        size={32}
                        color="#ffffff"
                        onPress={() =>toggleMenu(HeaderType.MENU)}
                    />

                </View>
            </View>

            <View style={{ ...styles.sidebar, justifyContent: !menu[HeaderType.PROFILE] && menu[HeaderType.MENU] ? 'flex-end' : 'space-between' }}>
                {menu[HeaderType.PROFILE] &&
      <View style={styles.sidebarItem}>
                        <Profile />
                    </View>
                }
                {menu[HeaderType.MENU] && <View style={{ ...styles.sidebarItem, }}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item title={item.title} subTitle={item.subTitle} />}
                        keyExtractor={item => item.id}
                    />

                </View>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        minHeight: MEASUREMENTS.HEADER_HEIGHT,
        // maxHeight: 70,
    },
    container: {
        flex: 1,
        minHeight: MEASUREMENTS.HEADER_HEIGHT,
        maxHeight: MEASUREMENTS.HEADER_HEIGHT,
        alignContent: 'center',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "#ffffff",
        backgroundColor: app.color.primary,
        // zIndex: app.zIndex.topHeader
    },
    title: {
        color: app.color.primaryText

    },
    sidebar: {
        position: 'absolute',
        top: MEASUREMENTS.HEADER_HEIGHT, 
        left: '0', 
        width: '100%',
        height: '90%',
        zIndex: 1,
        flex: 1,
        flexDirection: 'row',
        // zIndex:app.zIndex.sidebarItems,
        justifyContent: 'space-between',

    },
    sidebarItem: {
        paddingTop: '100px',
        width: '60%',
        height: '90%',
       
        backgroundColor: app.color.background,
        zIndex: app.zIndex.sidebarItems,
        shadowOffset: {width: 2, height: 8},  
        shadowColor: '#070707',  
        shadowOpacity: 0.8,  
        shadowRadius: 8,  
        shadowColor: app.color.shadow,  
        elevation: 20,  
    },

});

export default TopHeader