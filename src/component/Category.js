import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Table from './Table'

const Category = () => {
  return (
    <View>
      <Table 
        data = {[['Abhishek', 'Singh', 'Dhull'], ['From','Ramrai','Jind']]}
        tableStyle={styles.tableStyle}
        cellStyle= {styles.cellStyle}
        colStyle={styles.colStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  tableStyle:{
    margin:8
  },
    colStyle: {
    borderColor:'red',
    borderWidth:.6
  },
    cellStyle: {

      },
})
export default Category