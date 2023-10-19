import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Avatar,Divider, Icon } from '@rneui/themed';
import app from '../../app.json'
import SellerCard from './SellerCard';
import { User,getToken,removeToken } from '../utils/common';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Screens from '../screen';
const screens = {
  ORDERS:'ORDERS',
  CATEGORY:'CATEGORY',
}
const Profile = ({setHome}) => {
  const [user,setUser] = useState(null);
  const navigation = useNavigation()
  const routes = useNavigationState(state => state.routes);
  const currentRoute = routes?.at(-1);

  useEffect(()=>{
      let fun = async()=>{
        let data = await User();
        setUser(data)
      }
      fun()
  },[])

  const logoutHandler = async()=>{
   await removeToken()
   let fetchToken = async() =>{
    const token = await getToken();
 if(!token) {
   navigation.navigate(Screens.LOGIN_SCREEN)
  }
}
 fetchToken();
  }
  return (
    <View style={{flex:1}}>
        <View style={styles.avatarContainer}>
             <Avatar
          size={96}
          rounded
          icon={{ name: 'user-circle-o', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#eb1561' }}
        />
        <View style={styles.avatarTitleSection}>
            <Text style={{color:app.color.primary, fontSize:26}}>{user?.fullName || 'User '}</Text>
            <Text  style={{color:app.color.secondary, fontSize:24}}>Desk</Text>
        </View>
        </View>
        <Divider width={2} color={app.color.secondary} />
        <Text onPress={()=>setHome && currentRoute?.name === Screens.HOME_SCREEN ?  setHome(screens.CATEGORY): navigation.navigate(Screens.HOME_SCREEN,{home:screens.CATEGORY})} style={{color:app.color.primary, fontSize:18, marginVertical:8, paddingStart:12}}>Home</Text>
        <Text onPress={()=>setHome && currentRoute?.name === Screens.HOME_SCREEN ?  setHome(screens.ORDERS) : navigation.navigate(Screens.HOME_SCREEN,{home:screens.ORDERS})}  style={{color:app.color.primary, fontSize:18, marginVertical:8, paddingStart:12}}>Order</Text>

        <Divider width={2} color={app.color.secondary} />
        <View style={styles.analytics}>
            <SellerCard />
        </View>
        {/* <Divider width={2} color={app.color.secondary} /> */}
        <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={logoutHandler} activeOpacity={1}>
          <Icon  name='logout' />
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    avatarContainer: {
    padding:16,
    alignItems: 'center',
    justifyContent:'center',
    },
    avatarTitleSection:{
        marginTop:10,
        alignItems: 'center',
        justifyContent:'center', 
    },
    analytics:{

    },
    logoutContainer: {
      position:'absolute',
      bottom:0,
      right:0,
      padding:16,
    }
})

export default Profile