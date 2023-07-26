import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar,Divider, Icon } from '@rneui/themed';
import app from '../../app.json'
import SellerCard from './SellerCard';
const Profile = () => {
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
            <Text style={{color:app.color.primary, fontSize:26}}>Abhishek Singh</Text>
            <Text  style={{color:app.color.secondary, fontSize:24}}>Desk</Text>
        </View>
        </View>
        <Divider width={2} color={app.color.secondary} />
        <Text style={{color:app.color.primary, fontSize:18, marginVertical:8, paddingStart:12}}>Customers</Text>

        <Divider width={2} color={app.color.secondary} />
        <View style={styles.analytics}>
            <SellerCard />
        </View>
        {/* <Divider width={2} color={app.color.secondary} /> */}
        <View style={styles.logoutContainer}>
        <TouchableOpacity activeOpacity={1}>
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