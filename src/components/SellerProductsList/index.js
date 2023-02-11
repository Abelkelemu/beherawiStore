import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
  TableContainer, Table, TableHead,
  TableRow, TableBody, TableCell
} from '@material-ui/core';
import moment from 'moment';
import Button from '../forms/Button'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { deleteSellerProduct,getSellerProducts } from '../../redux/SellerProducts/sellerproducts.actions';




const columns = [
  {
    id: 'productCreatedDate',
    lable: 'Date'
  },
  {
    id: 'productName',
    lable: 'Product Name'
  },
  {
    id: 'condition',
    lable: 'Condition'
  },
  {
    id: 'quantity',
    lable: 'Quantity'
  },
  {
    id: 'price',
    lable: 'Price'
  },
  {
    id: 'fee',
    lable: 'Fee/unit sold or  Fee for rent/day'
  }
];

const styles = {
  
  fontSize: '16px',
  width: '10%',
  backgroundColor: 'lightGrey',
  cursor: 'pointer',
  
  
};

const styles2 = {
  
    fontSize: '16px',
    width: '0.1%',
    backgroundColor: 'lightGrey',
    cursor: 'pointer'
    
  };

const formatText = (columnName, columnValue, calcPrice) => {
  switch (columnName) {
    case 'price':
      return `${columnValue} Birr `;
    case 'productCreatedDate':
      return moment(columnValue.nano).format('DD/MM/YYYY')
    case 'fee':
      return `${(calcPrice-calcPrice/1.2).toFixed(2)} Birr`;
    default:
      return columnValue;
  }
};



const SellerProductsList = ({ sellerProducts }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  


  const handleDelete = (documentID) => {
    dispatch(
        deleteSellerProduct(documentID)
    )
    
} 


      
    

  return (
    <TableContainer>
      <Table>

        <TableHead>

          <TableRow>
            {columns.map((column, pos) => {
              const { lable } = column;

              return (
                <TableCell
                  key={pos}
                  style={styles}
                  
                >
                  {lable}

                
                  
                </TableCell>
              )
            })}
          </TableRow>

        </TableHead>

        <TableBody>

          {(Array.isArray(sellerProducts) && sellerProducts.length > 0) && sellerProducts.map((row, pos) => {
            const { documentID } = row;

            return (

              <TableRow
                key={pos}
                onClick={() => history.push(`/sellerProductInfo/${documentID}`)}
              >

                {columns.map((column, pos) => {

                  const columnName = column.id;
                  const columnValue = row[columnName];
                  const calcPrice = row['price']
                  const formattedText = formatText(columnName, columnValue,calcPrice);

                  return (

                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formattedText}
                      
                    </TableCell>
                    

                  )
                })}

                
                
                 <TableCell
                 style={styles2}
                 >
                 <button
                   style={{cursor: 'pointer'}}>
                      Edit/Delete
                  </button>

                 </TableCell>
                 
                 

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
  )
}

export default SellerProductsList;