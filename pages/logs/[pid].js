import Head from 'next/head'

import {useState} from "react";
import {useRouter} from 'next/router'

// Logs.getInitialProps = async (ctx,query) => {
//     // const {pid} = query
//     console.log(query)
//     const pid = 12
//     const res = await fetch(process.env.API_ENDPOINT + '/api/capture/' + pid)
//     const json = await res.json()
//     return {
//         list: json,
//     }
// }
export const getServerSideProps = async (ctx, query) => {
    // const {pid} = query
    // const router = useRouter()
    const {pid} = ctx.query

    // console.log(ctx)
    // const pid = 12
    const res = await fetch(process.env.API_ENDPOINT + '/api/capture/' + pid)
    const json = await res.json()
    return {
        props: {
            list: json
        },
    }
}


function Logs({list}) {
    let [detail, setDetail] = useState({});

    // let [list,setList] = useState(json)
    function RequestList(props) {
        console.log(props)
        const requestes = props.requestes;
        const listItems = requestes.map((request, index) =>
            <div className="item">
                <div className="content" css={{mw: "400px"}} key={request.requestId}
                     onClick={() => setDetails(request, props)}>
                    <a className="header"><strong>{request.method} </strong> {request.headers.host} {request.timestamp}
                    </a>
                </div>
            </div>
        );
        return (
            <div className="ui card" style={{'width': '100%'}}>
                <div className="content">
                    <div className="header">Requests</div>
                </div>
                <div className="content">
                    <div className="ui relaxed divided list">{listItems}</div>
                </div>
            </div>
        );
    }

    function Details(props) {
        console.log(props)
        const details = props.detail;

        return (
            <div>
                {
                    Object.keys(detail).length !== 0 &&


                    <div>
                        <h5>Headers </h5>
                        <ul>
                            {Object.entries(details.headers).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                        <hr/>
                        <h5>Files </h5>
                        <ul>
                            {Object.entries(details.fileData).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                        <hr/>
                        <h5>Query strings </h5>
                        <ul>
                            {Object.entries(details.query).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                        <hr/>
                        <h5>Body </h5>
                        <ul>
                            {Object.entries(details.body).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                        <hr/>
                    </div>
                }

                {
                    Object.keys(detail).length <= 0 &&


                    <h2>Request detail goes here.....</h2>
                }

            </div>

        );
    }

    function setDetails(detail, propsData) {
        setDetail(detail);
    }

// console.log(this.props)
    return (
        <div>
            <Head>
                <title>This page has a title 🤔</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </Head>
            <div className="grid grid-cols-3 gap-4 flex items-stretch bg-grey-lighter min-h-screen">
                <div className="p-4 col-span-1 bg-indigo-300 dark:bg-indigo-600 dark:text-indigo-400">
                    <RequestList requestes={list}/>
                </div>
                <div className="p-4  shadow-lg  col-span-2">
                    <Details detail={detail}/>
                </div>

            </div>
        </div>
    )
}

export default Logs;
