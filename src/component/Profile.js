import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Avatar,Divider } from '@rneui/themed';
import app from '../../app.json'
const Profile = () => {
  return (
    <View>
        <View style={styles.avatarContainer}>
             <Avatar
          size={96}
          rounded
          icon={{ name: 'user-circle-o', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#eb1561' }}
        />
        <View style={styles.avatarTitleSection}>
            <Text style={{color:app.color.primary, fontSize:32}}>Title</Text>
            <Text  style={{color:app.color.secondary, fontSize:24}}>Designation</Text>
        </View>
        </View>
        <Divider width={2} color={app.color.secondary} />
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
})

export default Profile