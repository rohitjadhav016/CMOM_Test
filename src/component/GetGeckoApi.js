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
const [marketSearchData, setmarketSearchData] = useState([]);
const[search, setSearch] = useState(null); 
let marketDataCols, marketDataSearchCols = [];
let url, searchUrl = "";
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
  let keyword = search.toLowerCase();
  searchUrl = `https://api.coingecko.com/api/v3/coins/${keyword}`;
  marketDataSearchCols = [
    {field: "name", headerName: "Name"},
    {field: "symbol", headerName: "Symbol"},
    {field: "hashing_algorithm", headerName: "Hashing Algorithm"},
    {field: "description", headerName: "Description"},
    {field: "genesis_date", headerName: "Genesis Date"},
    {field: "coingecko_score", headerName: "Market Cap in Euro"},
    {field: "homepage", headerName: "Homepage"},
  ]

}

//get data from the api
 const getMarketData = async () => {
   const response = await fetch(url);
   const data = await response.json();
  if(data){
  setmarketTableData(data);
  }
}

function displayData(data){
return(
  data.map((curElem) => (
    <StyledTableRow>
      <>
        <StyledTableCell align="center"><img src={curElem.image} alt="Icon" height={25} width={25}/></StyledTableCell>
        <StyledTableCell align="center">{(curElem.name) ? curElem.name : ''}</StyledTableCell>
        <StyledTableCell align="center">{(curElem.symbol) ? curElem.symbol : ''}</StyledTableCell>
        <StyledTableCell align="center">{(curElem.current_price) ? curElem.current_price : ''}</StyledTableCell>
        <StyledTableCell align="center">{(curElem.high_24h) ? curElem.high_24h : ''}</StyledTableCell>
        <StyledTableCell align="center">{(curElem.low_24h) ? curElem.low_24h : ''}</StyledTableCell>
      </>
    </StyledTableRow>
    ))
  )              
}

  //get search data from the api
const getSearchData = async () => {

  const response = await fetch(searchUrl);
  const data = await response.json();
  if(data){
    setmarketSearchData(data);
    // eslint-disable-next-line no-const-assign
    }else{
      errorMessage = 'No Data Found';
    }
  
  }


function displaySearchData(data){
  if(data){
    var values = Object.values(data);
  }
  return(     
    <StyledTableRow>
      <>
        <StyledTableCell align="center">{(values) ? values[2] : ''}</StyledTableCell>
        <StyledTableCell align="center">{(values) ? values[0] : ''}</StyledTableCell>
        <StyledTableCell align="center">{(values) ? values[6] : ''}</StyledTableCell>
        <StyledTableCell align="center"><p>{(values) ? values[11]['en'] : ''}</p></StyledTableCell>
        <StyledTableCell align="center">{(values) ? values[15] : ''}</StyledTableCell>
        <StyledTableCell align="center">{(values) ? values[25]['market_cap']['eur'] : ''}</StyledTableCell>
        <StyledTableCell align="center">{(values) ? values[12]['homepage'][0] : ''}</StyledTableCell>
      </>
    </StyledTableRow>
  )
}

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
  <input type="search" placeholder="Eg: bitcoin, ethereum" autoComplete="off" onChange={(event) => {setSearch(event.target.value);}}></input>
  <button className="btn-submit" onClick={() => {getSearchData()}}>Submit</button>

  <div>
    {(marketSearchData || marketTableData) ? 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {
            (marketDataCols)?
            (marketDataCols.map((curElem) => (
              <StyledTableCell align="center">{curElem.headerName}</StyledTableCell>
            )))
            :
            (marketDataSearchCols.map((curElem) => (
              <StyledTableCell align="center">{curElem.headerName}</StyledTableCell>
            )))
          }
          </TableRow>
        </TableHead>
      <TableBody>
      {
        (marketTableData)?
        displayData(marketTableData) : 
        displaySearchData(marketSearchData)
        
      }
        </TableBody> 
      </Table>
  </TableContainer>
  :
  <p className='errorMessage'> {errorMessage} </p>
  }
  </div>
</div>  
  )
}
export default GetGeckoApi;