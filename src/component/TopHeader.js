import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Divider, Icon, ListItem } from '@rneui/themed';
import app from '../../app.json'
import Profile from './Profile';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Screens from '../screen';
const DATA = [
    { id: 1, title: 'The First', subTitle: 'The Second' },
    { id: 3, title: 'The First', subTitle: 'The Second' },
    { id: 4, title: 'The First', subTitle: 'The Second' },
    { id: 5, title: 'The First' },
]

const HeaderType = {
    PROFILE: 'PROFILE',
    MENU: 'MENU',
}

const MEASUREMENTS = {
    HEADER_HEIGHT: 70
}
const TopHeader = (props) => {
    const { menuComponent } = props;
    const navigation = useNavigation();
    const [menu, setMenu] = useState({})
    const [categories, setCategories] = useState([]);

    const Item = ({ title, subTitle, onPress }) => {
        return  <>
        <ListItem>
            <ListItem.Content>
                <ListItem.Title onPress={onPress} >{title}</ListItem.Title>
            </ListItem.Content>
        </ListItem> 
                <Divider width={2} color={app.color.secondary} />
        </>
    }

    const toggleMenu = (type) => {
        setMenu({ [type]: !menu[type] })
    }
    const closeMenu = () => {
        setMenu({});
    };

    const homeHandler = () => {
        navigation.navigate(Screens.HOME_SCREEN)
    }

    const loadCategories = async() => {
        const data =   await request('category',{method: 'GET'});
        setCategories(data)
     }
     React.useEffect(() =>{
       loadCategories()
     },[]);

     React.useEffect(() =>{
        closeMenu()
     },[props?.home]);
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
                <View style={{paddingStart:24,paddingTop:8}}>
                    <Text onPress={homeHandler} style={styles.title}>{props.title || app.displayName}</Text>
                </View>
                {/* <View> */}
                {/* <Text style={styles.title}>{props.title || app.displayName}</Text> */}

                {/* </View> */}
                <View  style={{flex:1,flexDirection:'row-reverse'}}>
                <View style={{marginLeft:1}}>
                    <Icon
                        name="menu"
                        size={32}
                        color="#ffffff"
                        onPress={() => toggleMenu(HeaderType.MENU)}
                    />
                </View>
                    {Array.isArray(menuComponent) && menuComponent.map((Comp,index) => {
                        return Comp
                    })}
                </View>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={closeMenu} style={[styles.overlay, { display: menu[HeaderType.PROFILE] || menu[HeaderType.MENU] ? 'flex' : 'none' }]} />

            <View style={{ ...styles.sidebar, height: menu[HeaderType.PROFILE] || menu[HeaderType.MENU] ? '90%' : '0', flexDirection: !menu[HeaderType.PROFILE] && menu[HeaderType.MENU] ? 'row-reverse' : 'row', alignSelf: !menu[HeaderType.PROFILE] && menu[HeaderType.MENU] ? 'flex-end' : 'flex-start' }}>
                {menu[HeaderType.PROFILE] &&
                    <View style={styles.sidebarItem}>
                        <Profile setHome = {props?.setHome} screens = {props.screens} />
                    </View>
                }
                {menu[HeaderType.MENU] && <View style={[styles.sidebarItem,  ]}>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => <Item key={item._id || item.id} onPress={()=>{navigation.navigate(Screens.PRODUCTS_SCREEN,{category:item._id || item.id})}} title={item.name || 'CATEGORY_NAME'} subTitle={item.description || 'CATEGORY_SUBTITLE'} />}
                        keyExtractor={item => item.id}
                        
                    />
                </View>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
       overlay: {
        ...StyleSheet.absoluteFillObject,
        marginTop:MEASUREMENTS.HEADER_HEIGHT,
        zIndex: 9, // Higher z-index than the menu to capture touch events
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
      },
    mainContainer: {
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
        // justifyContent: 'space-between',
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
        // width: '100%',
        // height: '90%',
        zIndex: 10,
        // flex: 1,
   
        alignSelf:'flex-start',
        flexDirection: 'row',
        zIndex:app.zIndex.sidebarItems,
        // justifyContent:'space-between'


    },
    sidebarItem: {
        // paddingTop: '100px',
        width: '75%',
        height: '90%',
        backgroundColor: app.color.background,
        zIndex: app.zIndex.sidebarItems,
        shadowOffset: { width: 2, height: 8 },
        shadowColor: '#070707',
        shadowOpacity: 0.8,
        shadowRadius: 8,
        shadowColor: app.color.shadow,
        elevation: 20,
    },

});

export default TopHeader