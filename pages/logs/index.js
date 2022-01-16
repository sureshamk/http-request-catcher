import Head from 'next/head'

import {useState} from "react";
import {useRouter} from 'next/router'

Index.getInitialProps = async (ctx) => {
    const router = useRouter()
    const {pid} = router.query
    const res = await fetch(process.env.API_ENDPOINT + '/api/capture/' + pid)
    const json = await res.json()
    return {
        list: json,
    }
}


function Index({list}) {
    let [detail, setDetail] = useState({});

    // let [list,setList] = useState(json)
    function RequestList(props) {
        console.log(props)
        const requestes = props.requestes;
        const listItems = requestes.map((request, index) =>
            <div className="item">
                <div className="content" css={{mw: "400px"}} key={index} onClick={() => setDetails(request, props)}>
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
                <div>
                    <h6>Headers </h6>
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
                </div>

            </div>

        );
    }

    function setDetails(detail, propsData) {
        setDetail(detail);
        console.log('>>>>>>>>>>>>>>', detail);
        // this.setProps({detail},()=>{
        //     console.log(detail,propsData);
        // })

        // props.detail = detail;
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
            <div className="ui grid">
                <div className="five wide column">
                    <RequestList requestes={list}/>
                </div>
                <div className="eleven wide column">
                    {Object.keys(detail).length !== 0 &&
                    <Details detail={detail}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Index;
