import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight,TouchableOpacity, Alert } from 'react-native';
import Screens from '../screen';

const Table = ({ data = [],dataKey, tableStyle, rowStyle, colStyle, cellStyle, navigation, onPress}) => {
  const[tableData,setTableData] = React.useState([]);
  let colSize = 3;
  React.useEffect(()=>{
    let modified = [];
    for(let i=0,row=0; i<data.length; row++) {
      if(!modified[row]){
        modified[row] = [];
      }
      for(let j=0; j<colSize && i<data.length; j++){
        modified[row][j] = data[i];
        i++;
      }
    }
    setTableData(modified);
  },[data])
  
  const Col = ({data}) =>{
    return (
      <View style={{ ...styles.column, ...colStyle }} >
        <TouchableOpacity style={{...styles.cell,...cellStyle}} onPress={()=>{onPress(data._id || data.id)}}>
        <Text>{data[dataKey]}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{ ...styles.table, ...tableStyle }} onPress={onPress}>
      {tableData.map((rowData, i) =>
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
