import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import Screens from '../screen';

const Table = ({ data = [], tableStyle, rowStyle, colStyle, cellStyle, navigation, onPress}) => {
  const Col = ({data}) =>{
    return (
      <View style={{ ...styles.column, ...colStyle }} >
        <TouchableOpacity style={{...styles.cell,...cellStyle}} onPress={()=>{
          navigation?.navigate(Screens.PRODUCTS_SCREEN)}}>
        <Text>{data}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{ ...styles.table, ...tableStyle }} onPress={onPress}>
      {data.map((rowData, i) =>
      (<View key={i} style={{ ...styles.row, ...rowStyle }}>
        {Array.isArray(rowData) && rowData.map((cellData,index) =>
          <Col key={index} data={cellData} />
        )}
      </View>)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    // borderWidth: 1,
    // borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: '#000',
  },
  column: {
    flex: 1,
    padding: 10,
    marginBottom:5,

  },
  cell: {
    textAlign: 'center',
  },
    container: {
    // backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 8,
  },
});

export default Table;
