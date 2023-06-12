import { useState, useEffect } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './table.css'
import { Input } from 'antd';

const Table = props => {

    const { Search } = Input;

    // const onSearch = value => console.log(value);
    const [data, setData] = useState(props.bodyData)
    const [SearchData, setSearchData] = useState(props.bodyData)

    useEffect(() => {
        setData(props.bodyData);
        setSearchData(props.bodyData);

    }, [props.bodyData]);

    const onSearch = value => {

        const filteredRows = data.filter((row) => {
            const rowcolumm = row.iduser
            return rowcolumm.toLowerCase().includes(value.toLowerCase());
        });
        setSearchData(filteredRows);
    }

    const initDataShow = props.limit && SearchData ? SearchData.slice(0, Number(props.limit)) : SearchData
    const [dataShow, setDataShow] = useState(initDataShow)

    useEffect(() => {
        setDataShow(props.limit && SearchData ? SearchData.slice(0, Number(props.limit)) : SearchData);
    }, [SearchData]);



    // useEffect(() => {
    //     setDataShow(initDataShow);
    // }, [SearchData]);

    let pages = 1

    // let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(SearchData.length / Number(props.limit))
        pages = SearchData.length % Number(props.limit) === 0 ? page : page + 1
        // range = [...Array(pages).keys()]
    }
    const [currPage, setCurrPage] = useState(0)

    const handleChange = (value) => {
        const start = Number(props.limit) * (value-1)
        const end = start + Number(props.limit)

        setDataShow(SearchData.slice(start, end))

        setCurrPage(value-1);

        console.log(value)

    };

    // const [page, setPage] = useState(1)
    useEffect(() => {
        console.log(currPage)
    }, [currPage]);
    
    return (
        <div className="table-area">
            {
                true ?
                    <Search className="search-table" placeholder="data search.." allowClear onSearch={onSearch} style={{ width: 200 }} />
                :null
            }
            <div className={""}>
                <table className={props.class ? props.class : ""}>
                    {
                        props.headData && props.renderHead ? (
                            <thead >
                                <tr>
                                    {
                                        props.headData.map((item, index) => props.renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) : null
                    }
                    {
                        props.bodyData && props.renderBody ? (
                            <tbody>
                                {
                                    // dataShow.length == 0 ?  <td className="non-style transform-origin" colSpan="7"><Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box></td> :
                                        
                                        dataShow.length == 0 ?  <tr> <td colSpan="3" className='TdTextCenter'>No Users found</td> </tr> : dataShow.map((item, index) => props.renderBody(item, index))

                                }
                            </tbody>
                        ) : null

                    }
                </table>
            </div>
            {
                pages > 1 ? (
                    <div className={"PaginationControlTable"}>
                        <PaginationControl
                            page={currPage+1}
                            between={3}
                            total={SearchData.length}
                            limit={props.limit}
                            changePage={(page) => {
                                handleChange(page); 

                            }}
                            ellipsis={1}
                            next
                            last
                        />
                        {/* { 
                                <StyledEngineProvider injectFirst>
                                        <PaginationNewStyle
                                            variant="outlined" 
                                            shape="rounded" 
                                            size="small"  
                                            // color="secondary" 
                                            sx={{ marginRight: '0' }} 
                                            count={Math.ceil(props.bodyData.length/props.limit)} 
                                            page={currPage+1}
                                            onChange={handleChange} 
                                        />
                                </StyledEngineProvider>
                        } */}
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
