import axios from "axios"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCryptoData = () => {
   const getCryptoData = async () => (await axios.get('/crypto_data'))?.data;
   return useQuery(['crypto-data'], getCryptoData, {
      // staleTime: 5000,
      // staleTime: Infinity,
      // cacheTime: 1000, 
      // refetchInterval: 1000,
      // select: (data) => {
      //    return data.slice(0, 3);
      // }
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
   });
}

export const usePortfolio = () => {
   const getPortfolio = async () => (await axios.get('/portfolio'))?.data;
   return useQuery(['portfolio'], getPortfolio, {
      staleTime: Infinity,
      // initialData: () => [{
      //    name: 'Dummy Coin',
      //    cmc_rank: 0,
      //    symbol: 'N/A',
      //    price: '$0.00',
      //    last_updated: new Date().toDateString()
      // }],
      // placeholderData: () => [{
      //    name: 'Dummy Coin',
      //    cmc_rank: 0,
      //    symbol: 'N/A',
      //    price: '$0.00',
      //    last_updated: new Date().toDateString()
      // }],
   })
}

export const useAddToPortfolio = () => {
   const queryClient = useQueryClient()

   return useMutation(
      (coin) => {
         return axios.post(`/portfolio`, { coin }, {
            headers: {
               'content-type': 'application/json'
            }
         })
      },
      {
         onSuccess: () => {
            // ✅ refetch portfolio
            queryClient.invalidateQueries(['portfolio'])

            // ✅ refetch crypto data
            // queryClient.invalidateQueries(['crypto-data'])
         },
      }
   )
}