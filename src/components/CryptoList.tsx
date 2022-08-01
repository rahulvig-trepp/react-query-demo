import React from 'react'
import { Button, CircularProgress, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useAddToPortfolio, useCryptoData } from '../hooks/useCryptoData';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


const StyledTable = styled(Table)(({ theme }) => ({
    margin: '40px auto',
    fontFamily: 'Roboto',
    'TableCell': {
        width: '100px',
    },
    'th': {
        fontWeight: 'bold',
        fontSize: '20px',
        width: '100px'
    },
    'td': {
        fontSize: '17px',
    },
    'Button': {
        fontSize: '50px',
    },
    '.price': {
        fontWeight: 'bold',
        '&.inc': {
            color: 'green'
        },
        '&.dec': {
            color: 'red',
        },
        '&.dec::before': {
            content: '"▼"'
        },
        '&.inc::before': {
            content: '"▲"'
        }
    }
}))

export const CryptoList = () => {
    const { status, isFetching, data: cryptoData, error }: any = useCryptoData();
    const queryClient = useQueryClient();
    const { revertState: queryCache }: any = queryClient?.getQueryCache()?.find(['crypto-data'])
    const mutation = useAddToPortfolio()
    if (cryptoData) {
        return (
            <TableContainer component={Paper} variant={'elevation'} style={{ border: '1px solid lightgray' }}>
                <StyledTable sx={{ maxWidth: '100%' }} aria-label="simple SyledTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="right">Coin Name</TableCell>
                            <TableCell align="right">Ticker</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Last Updated</TableCell>
                            <TableCell align='right'>Add to Portfolio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoData.length && cryptoData?.map((coin: any, idx: number) => (
                            <TableRow
                                key={coin.cmc_rank}
                            >
                                <TableCell component="th" scope="row">
                                    {coin.cmc_rank}
                                </TableCell>
                                <TableCell align="right">{coin.name}</TableCell>
                                <TableCell align="right">{coin.symbol}</TableCell>
                                <TableCell align="right" className={`price ${Number(queryCache?.data?.[idx]?.price) > Number(coin.price) ? 'dec' : 'inc'}`}>${coin.price}</TableCell>
                                <TableCell align="right">{coin.last_updated}</TableCell>
                                <TableCell align="right"><Button color='primary' onClick={(event) => mutation.mutate(coin)}>+</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        )
    }

    if (error) {
        return <div>Oh no, something happened :/</div>
    }

    return <CircularProgress />
}
