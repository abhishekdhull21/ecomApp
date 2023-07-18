import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const Table = ({ data = [], row, col=3, tableStyle, rowStyle, colStyle, cellStyle}) => {
  const Col = ({data}) =>{
    return (
      <View style={{ ...styles.column, ...colStyle }}>
        <TouchableHighlight style={styles.container}>
        <Text style={{...styles.cell,...cellStyle}}>{data}</Text>
      </TouchableHighlight>
      </View>
    )
  }
  return (
    <View style={{ ...styles.table, ...tableStyle }}>
      {data.map((rowData, i) =>
      (<View key={i} style={{ ...styles.row, ...rowStyle }}>
        {Array.isArray(rowData) && rowData.map(cellData =>
          <Col data={cellData} />
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
