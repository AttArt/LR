import { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { Input } from 'antd';
import styled, { keyframes } from 'styled-components';

const columns = [
    {
        name: 'iduser',
        selector: row => row.iduser,
        sortable: true,
    },
    {
        name: 'name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'dept',
        selector: row => row.dept,
        sortable: true,
    }
];

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
    border-color: dodgerblue;
`;


const CustomLoader = () => (
	<div style={{ padding: '24px',textAlign:'center' }}>
		<Spinner />
		<div>... Loading ...</div>
	</div>
);

function convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {  
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;

const Index = () => {
    const { Search } = Input;

    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

    const [SearchData, setSearchData] = useState(data)
    const [SearchValue, setSearchValue] = useState("nosearch")

	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        setSearchData(data);

    }, [data]);

    const onSearch = async (value) => {

		setLoading(true);

        if(value == null || value == "") {
            setSearchValue("nosearch");
            console.log("nosearch")
            // setPage(1)
            // return ;
        }else {
            setSearchValue(value)
        }

        await axios.get(`http://localhost:8000/api/users?search=${value}&page=${page}&per_page=${perPage}`).then(({data}) => {
            setPage(1)
            const arr = Object.entries(data.data).map(([key, value]) => {
                return { id: key, ...value };
            });

            setData(arr);
            setTotalRows(data.total)
        })

		setLoading(false);

        // await axios.get(`http://localhost:8000/api/users/${value}`).then(({data}) => {
        //     setPage(1)
        //     setData(data.data)
        //     setTotalRows(data.data.total)
        // })

    }


	const fetchData = async page => {
		setLoading(true);

		await axios.get(`http://localhost:8000/api/users?search=${SearchValue}&page=${page}&per_page=${perPage}`).then(({data}) => {
            
            setTotalRows(data.total);
            const arr = Object.entries(data.data).map(([key, value]) => {
                return { id: key, ...value };
            });

            setData(arr);
        })

		setLoading(false);
	};

	const handlePageChange = page => {
        setPage(page)
        fetchData(page);        

	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);
		await axios.get(`http://localhost:8000/api/users?search=${SearchValue}&page=${page}&per_page=${newPerPage}`).then(({data}) => {
            const arr = Object.entries(data.data).map(([key, value]) => {
                return { id: key, ...value };
            });
            setData(arr);
            
        })

		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchData(1); 
		
	}, []);

    return (
        <div>
            <div>
                <h5>Data Users</h5>
                <Search className="search-table" placeholder="data search.." allowClear onChange={(event) => {onSearch(event.target.value)}} style={{ width: 200 }} />

                <DataTable
                    fixedHeader={true}
                    fixedHeaderScrollHeight={"65vh"}
                    title="Datatable"
                    columns={columns}
                    data={SearchData}
                    progressPending={loading}
                    progressComponent={<CustomLoader />}
                    highlightOnHover
                    pointerOnHover
                    pagination
                    paginationDefaultPage={page}
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[10,25,50,100]}
                    onChangePage={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Index;