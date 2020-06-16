import React, { useState } from 'react'
import axios from 'axios';

import Loader from './Loader'
import Dropzone from './Dropzone'
import ViewContent from './ViewContent'

const API_URL = '/api/contents'

export default function ImageTextReader() {
    const [view, setView] = useState('Home')
    const [content, setcontent] = useState({})
    const [fetching, setFetching] = useState(false)

    // async function getHistoryData() {
    //     setFetching(true)
    //     try {
    //         const res = await axios.get(API_URL)
    //         let contents = res.data.contents

    //         setcontents(contents)
    //         setView('ViewContent')
    //         setFetching(false)
    //     } catch (e) {
    //         console.log(e)
    //         setFetching(false)
    //     }
    // }

    async function callVisionApi(data) {
        setFetching(true)
        try {
            const res = await axios.post(API_URL, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            let res_data = res.data
            setcontent(res_data)
            setView('ViewContent')
            setFetching(false)
        } catch (e) {
            console.log(e)
            setFetching(false)
        }
    }

    function goToHome() {
        setView('Home')
    }

    return (
        fetching ? <Loader /> :
            <>
                {
                    view === 'Home' ?
                        <>
                            {/* <button type="button" onClick={getHistoryData}>Display previous results</button> */}
                            <Dropzone callVisionApi={callVisionApi} />
                        </>
                        :
                        <>
                            <button type="button" onClick={goToHome}>Home</button>
                            <ViewContent content={content} />
                        </>

                }
            </>
    )
}
