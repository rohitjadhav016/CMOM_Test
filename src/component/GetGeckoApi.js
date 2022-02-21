//importing the required libraries and components
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './css/GetGeckoApi.css';

//styling the output table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8bacd6',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#c4d7ef',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#adc3dd',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const GetGeckoApi = () => {
//defining the required const and variables
const [marketTableData, setmarketTableData] = useState([]);
const[search, setSearchData] = useState(null);
let marketDataCols = [];
let url = "";
let errorMessage = "";
marketDataCols = [
  {field: "image", headerName: "Image"},
  {field: "name", headerName: "Name"},
  {field: "symbol", headerName: "Symbol"},
  {field: "current_price", headerName: "Current Price"},
  {field: "high_24h", headerName: "High 24 hour price"},
  {field: "low_24h", headerName: "Low 24 hour price"}
];
url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

//setting the url based on input by user
if(search){
  marketDataCols = [
    {field: "name", headerName: "Name"},
    {field: "symbol", headerName: "Symbol"},
    {field: "hashing_algorithm", headerName: "Hashing Algorithm"},
    {field: "description", headerName: "Description"},
    {field: "coingecko_score", headerName: "Market Cap in Euro"},
    {field: "homepage", headerName: "Homepage"},
  ];
  let keyword = search.toLowerCase();
  url = `https://api.coingecko.com/api/v3/coins/${keyword}`;
}

//get data from the api
const getMarketData = async () => {
  alert(url);
  const response = await fetch(url);
  const data = await response.json();
  if(!data){
    errorMessage = 'No Data Found';
  }
  console.log(data);
  setmarketTableData(data);
  }

function soemDate(data) {
  return Object.values(data).map((curElem) => (console.log(curElem)));
}

// function displayData(data, search){
//   return(
//     data.map((curElem) => (
//       <StyledTableRow>
//         {!curElem.image && search ? (
//         <>
//           <StyledTableCell align="center">{curElem.name}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.symbol}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.hashing_algorithm}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.coingecko_score}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.low_24h}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.low_24h}</StyledTableCell>
//         </>
//         ):(
//         <>
//           <StyledTableCell align="center"><img src={curElem.image} alt="Icon" height={25} width={25}/></StyledTableCell>
//           <StyledTableCell align="center">{curElem.name}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.symbol}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.current_price}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.high_24h}</StyledTableCell>
//           <StyledTableCell align="center">{curElem.low_24h}</StyledTableCell>
//         </>
//         )}
//       </StyledTableRow>
//       ))
//   )              
// }


useEffect(() => {
getMarketData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

return (
<div className="container">
    <div className="header-div">
        <h2>Welcome to CoinGecko CryptoCurrency Tracker</h2>
        <p> Following API Results are ordered by <strong>Market Cap Description</strong> and using Euro as default <strong>VS_Currency</strong> </p>
        <p>Please Enter the Coin ID below to get the results by Coin ID</p>
    </div>
    <input type="search" placeholder="Eg: bitcoin, ethereum" onChange={(event)=>{setSearchData(event.target.value)}}></input>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {!marketTableData && !search ? (<p style={{color:'red'}}> {errorMessage} </p>) : (marketDataCols.map((curElem) => (
            <StyledTableCell align="center">{curElem.headerName}</StyledTableCell>
          )))}
          </TableRow>
        </TableHead>
      <TableBody>
        {soemDate(marketTableData)}
        </TableBody> 
      </Table>
    </TableContainer>
</div>  

  )
}
export default GetGeckoApi;