
import React, { useEffect, useState } from 'react'
import './stock.css';
import axios from 'axios';
import moment from 'moment';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendData } from '../app/socket/socketActions';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Dashhead from '../Dashhead';
import Darkmode from '../Darkmode';


const Microbiologystock = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSettings, setRowSettings] = useState(() => {
    // Initialize row settings from local storage, or with default values
    const savedSettings = localStorage.getItem('rowSettings');
    return savedSettings ? JSON.parse(savedSettings) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  const uniqueItemCodes = [...new Set(data.map(item => item.itemCode))];
  const url = process.env.REACT_APP_DEVELOPMENT;
  const accessToken = "your_access_token_here";



  console.log(data,'data')



  
  // Columns setup
  const columns = [
    { label: "S.N", prop: "id" },
    { label: "Item Code", prop: "itemCode" },
    { label: "Expiry Dates", prop: "expiry" },
    { label: "Total Quantity", prop: "totalQuantity" },
    { label: "Product Name", prop: "product.productName" },
    { label: "S.K.U", prop: "product.sku" },
    { label: "Lot Number", prop: "product.lotNumber" },
    { label: "Manufacturer", prop: "product.manufacturer" },
    { label: "Range"},
    // { label: "Final Quantity", prop: "finalQuantity" }, // Adjusted prop name
  ];
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/stock/getAllStocks/MICROBIOLOGY`, {
          headers: { token: accessToken }
        });
        let newData = response.data.result.map((item, index) => {
          // Check if expiryArray exists and is an array before using it
          const totalQuantity = Array.isArray(item.expiryArray) 
            ? item.expiryArray.reduce((acc, curr) => acc + curr.quantity, 0)
            : 0;
          const expiryDates = Array.isArray(item.expiryArray) 
            ? item.expiryArray.map(e => e.expiry).join(', ')
            : 'No expiry info';
  
          const cleanItemCode = item.product && item.product.itemCode
            ? item.product.itemCode.replace(new RegExp(item.product.supplierName || '', 'g'), '').trim()
            : 'Unknown Code'; // Default or fallback code if product or itemCode is not available
  
          return {
            ...item,
            id: index + 1,
            totalQuantity,
            expiry: expiryDates,
            itemCode: cleanItemCode
          };
        });
  
        setData(newData);
        sortData(newData); // Sorting newData by itemCode after setting the state
      } catch (error) {
        console.error('Error fetching Microbiology stock data:', error);
      }
    };

    localStorage.setItem('rowSettings', JSON.stringify(rowSettings));
  
    fetchData();
  }, [url, accessToken,rowSettings]);
  
  const sortData = (dataToSort) => {
    let sortedData = [...dataToSort]; // Creating a copy of the original array
    sortedData = sortedData.sort((a, b) => {
      const codeA = parseInt((a.itemCode.match(/\d+/) || [0])[0], 10);
      const codeB = parseInt((b.itemCode.match(/\d+/) || [0])[0], 10);
      return codeA - codeB;
    });
    setData(sortedData); // Updating the state with the sorted array
  };
  
  
  
  

  const handleRowSelectionChange = (event, row) => {
    const isChecked = event.target.checked;
    setSelectedRows(prev => {
      if (isChecked) {
        return [...prev, row];
      } else {
        return prev.filter(r => r.id !== row.id);
      }
    });
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Microbiology stock.xlsx');
  };

  // Paginated data
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);



  console.log(currentData,'currentData')

  


  const handleSendData = () => {
    const dataToSend = selectedRows.map(row => ({
      ...row,
      labName: 'Microbiology Lab'
    }));
    dispatch(sendData(dataToSend));
    history.push('/Order');
  };



  const calculateTotalsByCode = (data) => {
    const totals = {};
    data.forEach((item) => {
      const codeMatch = item.itemCode.match(/\d+/);
  
      if (codeMatch) {
        const code = codeMatch[0];
        totals[code] = (totals[code] || 0) + item.totalQuantity;
      }
    });
    return totals;
  };
  
  const totalsByCode = calculateTotalsByCode(currentData);
  
  const calculateLastIndexes = (data) => {
    const lastIndex = {};
    data.forEach((item, index) => {
      const codeMatch = item.itemCode.match(/\d+/);
      if (codeMatch) {
        const code = codeMatch[0];
        lastIndex[code] = index; // Update to the current index as last index
      }
    });
    return lastIndex;
  };
  
  const lastIndexes = calculateLastIndexes(currentData);

  const handleSettingsChange = (index, start, end, color) => {
    setRowSettings(prevSettings => {
      const updatedSettings = [...prevSettings];
      updatedSettings[index] = { start, end, color };
      return updatedSettings;
    });
  };

  const getColorForIndex = (index, quantity) => {
    const settings = rowSettings[index];
    if (settings && quantity <= settings.start ) {
      return settings.color || 'transparent';
    }
    return 'transparent'; // Default color if no range matches
  };

  const filteredData = currentData.filter(item => item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()));

  
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} />
      </div>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
        <h1 className="my-5 title text-center">Microbiology Stock</h1>
        <div className='icondivright'>
          <Tooltip title="Back">
            <ArrowBackIcon className='exporticon' onClick={() => { history.push("/stock") }} />
          </Tooltip>
        </div>
        <div className='icondiv'>
          <Tooltip title="Export in Excel">
            <GetAppIcon className='exporticon' onClick={handleExport} />
          </Tooltip>
        </div>


        <div>
          <div className='text-center my-4'>
          <TextField
        id="outlined-basic"
        label="Search product name"
        variant="outlined"
        sx={{ width: 800 }}
        required
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
          </div>
 
      {searchQuery.length > 0 && (
        <div className="suggestions">
          {uniqueItemCodes
            .filter(code => code.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(code => (
              <div
                key={code}
                className="suggestion"
                onClick={() => setSearchQuery(code)}
              >
                {code}
              </div>
            ))}
        </div>
      )}
    </div>

       

        <table className="table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.prop}>{col.label}</th>
              ))}
              
            </tr>
          </thead>
          
         
          <tbody>
          {filteredData.map((item, index) => {
  const codeMatch = item.itemCode.match(/\d+/);
  const code = codeMatch ? codeMatch[0] : null;
  const showExtraRow = index === lastIndexes[code];
  const rowColor = getColorForIndex(index, item.totalQuantity);

  return (
    <React.Fragment key={index}>
      <tr style={{ backgroundColor: rowColor }}>
        <th scope="row">{index + 1}</th>
        <td>{item.itemCode.split(' ')[0]}</td>
        
        <td>{new Date(item.expiryArray[0].expiry).toLocaleDateString('en-GB')}</td>
      {console.log(new Date(item.expiryArray[0].expiry).toLocaleDateString('en-GB'))}
    {/* {    console.log( new Date (item.expiryArray[0].expiry).toLocaleDateString('en-GB')} */}
        <td>{item.totalQuantity}</td>
        <td>{item.product?.productName}</td>
        <td>{item.product?.sku}</td>
        <td>{item.product?.lotNumber}</td>
        <td>{item.product?.manufacturer}</td>
        <td>
          <input
            type="number"
            placeholder="Start Range"
            value={rowSettings[index]?.start || ''}
            onChange={(e) => handleSettingsChange(index, parseInt(e.target.value), rowSettings[index]?.end, rowSettings[index]?.color)}
          />
          <input
            type="color"
            value={rowSettings[index]?.color || ''}
            onChange={(e) => handleSettingsChange(index, rowSettings[index]?.start, rowSettings[index]?.end, e.target.value)}
          />
        </td>
      </tr>
      {showExtraRow && (
        <tr> 
 
          <td colSpan="7">Total Quantity for item code <span class="badge badge-primary tabel_itemcode">{item.itemCode.split(' ')[0]} </span>:  <span class="badge badge-success  tabel_itemcode_total">{totalsByCode[code]}</span></td>
          
        </tr>
      )}
    </React.Fragment>
  );
})}

</tbody>

        </table>
        <div className="pagination justify-content-center my-5">
      <button
        className="btn btn-primary mr-2"
        onClick={() => setCurrentPage(prev => prev > 0 ? prev - 1 : 0)}
      >
        Prev
      </button>
      <button
        className="btn btn-primary"
        onClick={() =>
          setCurrentPage(prev =>
            prev < Math.ceil(data.length / rowsPerPage) - 1 ? prev + 1 : prev
          )
        }
      >
        Next
      </button>
    </div>
        
      </div>
      <Darkmode />
    </div>
  );
};

export default Microbiologystock;


