import { Card } from '@mui/material';
import React from 'react'
import { usePortfolio } from '../hooks/useCryptoData'

type Props = {}

export const Portfolio = (props: Props) => {
    const {data: portfolio, error, isFetching} = usePortfolio();
    if (error) {
        return <div>Oh no couldn't fetch portfolio</div>
    }
    return (
        <>
        {isFetching && <div>Loading portfolio...</div>}
        {!!portfolio?.length && portfolio?.map((coin: any) => 
            <Card variant='outlined' key={coin.name}>
                <h1>{coin.name}</h1>
                <h2>Rank: {coin.cmc_rank}</h2>
                <h2>Ticker: {coin.symbol}</h2>
                <h2>Price: {coin.price}</h2>
                <h2>Price as of: {coin.last_updated}</h2>
            </Card>
        )}
        {!isFetching && !portfolio.length && <div>Your portfolio is empty!</div>}
        </>
    )
}