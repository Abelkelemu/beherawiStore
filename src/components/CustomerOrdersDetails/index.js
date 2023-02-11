import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  TableContainer, Table, TableHead,
  TableBody, TableRow, TableCell
} from '@material-ui/core';

import { setOrderDetails } from './../../redux/Orders/orders.actions';

const columns = [
  {
    id: 'productThumbnail',
    label: ''
  },
  {
    id: 'productName',
    label: 'Name'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'quantity',
    label: 'Quantity'
  },
  {
    id:'provider',
    label:'Provider'
  }
]

const styles = {
  fontSize: '16px',
  width: '10%'
};

const formatText = (columnName, columnValue) => {
  switch(columnName) {
    case 'price':
      return `${columnValue} Br`;
    case 'productThumbnail':
      return <img src={columnValue} width={250} />;
    case 'productName':
      return columnValue.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())  
      default:
      return columnValue;
  }
}

const CustomerOrdersDetails = ({ order }) => {

  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(
        setOrderDetails({})
      );
    }
  }, []);

  return (

    <TableContainer>
      <Table>

        <TableHead>

          <TableRow>

            {columns.map((col, pos) => {

              return (
                <TableCell
                  key={pos}
                  style={styles}
                >
                  {col.label}
                </TableCell>
              )
            })}

          </TableRow>
          
        </TableHead>

        <TableBody>

          {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {

            return (
              <TableRow key={pos}>

                {columns.map((col, pos) => {
                    
                  const columnName = col.id;
                  const columnValue = row[columnName];

                  return (
                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formatText(columnName, columnValue)}
                    </TableCell>
                  )
                })}

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
  )
}

export default CustomerOrdersDetails;