import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './landingpage.css'
const LandingPage = () => {
    const [data, setData] = useState([])
    const [toNum, seToNum] = useState(50)
    const [showLoadMoreBtn, setShowMoreBtn] = useState(true)
    const fromNum = 0
    const loadMore = () => {
        seToNum(toNum + 50)
        setShowMoreBtn(false)
    }

    useEffect(() => {
        let url = `https://api.coincap.io/v2/assets`
        axios.get(url)
            .then((res) => {
                console.log('res++', res)
                setData(res?.data?.data)
            })
            .catch((err) => console.log('err__', err))
    }, [])
    return (
        <div className='main_wrapper'>
            <div className='top-header'>
                {['Market Cap', "EXCHANGE VAL",
                    "ASSETS", "EXCHANGE", "MARKET",
                    "BTC DOM INDEX"]?.map((item, index) => {
                        return (
                            <div key={index} className='top-row'>
                                <div>{item}</div>
                            </div>
                        )
                    })}
            </div>
            <div className='table-wrapper'>
                <div className='table-header'>
                    <div>Rank</div>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Market Cap</div>
                    <div>VWAP (24Hr)</div>
                    <div>Supply</div>
                    <div>Valume (24Hr)</div>
                    <div>Change (24Hr)</div>
                </div>
            </div>
            <div className='table-body-wrapper'>
                {
                    data?.slice(fromNum, toNum)?.map((item, index) => {
                        return (
                            <div className='table-body-header' key={index}>
                                <div>{index + 1}</div>
                                <div>
                                    <span>
                                        <img alt="" src={`https://assets.coincap.io/assets/icons/${item?.symbol?.toLowerCase()}@2x.png`}/>
                                    </span>{item?.name}</div>
                                <div>${item?.priceUsd?.substring(0, 2)}</div>
                                <div>${item?.marketCapUsd?.substring(0, 2)}b</div>
                                <div>{item?.vwap24Hr?.substring(0, 2)}</div>
                                <div>{item?.supply?.substring(0, 2)}m</div>
                                <div>${item?.volumeUsd24Hr?.substring(0, 2)}b</div>
                                <div>{item?.changePercent24Hr?.substring(0, 2)}</div>
                            </div>
                        )
                    })
                }
            </div>
            {showLoadMoreBtn && <div className='load-more-btn' onClick={() => loadMore()}>Loade More...</div>}
        </div>
    )
}

export default LandingPage