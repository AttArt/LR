import { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { Input } from 'antd';

// import Table from '../../components/table/Table'
// const UserTableHead = {
//     header: [
//         "iduser",
//         "name",  
//         "dept"  
//     ]
// }

const columns = [
    {
        name: 'iduser',
        selector: 'iduser',
        sortable: true,
    },
    {
        name: 'name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'dept',
        selector: 'dept',
        sortable: true,
    }
];


// const renderHead = (item, index) => <th key={index}>{item}</th>

// const renderBody = (item, index) => (
//     <tr key={index} className="">
//         <td className="">{item.iduser}</td>
//         <td className="">{item.name}</td>
//         <td className="">{item.dept}</td>
//     </tr>
// )


// const Export = ({ onExport }) => <button className="btn btn-light" claonClick={e => onExport(e.target.value)}>Export CSV</button>;


const Index = () => {
    const [Users, setUsers] = useState([]);


	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

    // const [Userstest, setUserstest] = useState([]);

    // const fetchUsers = async () => {
    //     await axios.get(`http://localhost:8000/api/users`).then(({data}) => {
    //         setUsers(data.data);
    //     })
    // }

    // const fetchtest = async () => {
    //     await axios.get(`http://localhost:8000/api/users?page=${1}&per_page=${10}`).then(({data}) => {
    //         setUserstest(data.data);
    //     })
    // }

    // useEffect(() => {
    //     fetchUsers();
    //     fetchtest();

    // }, []);

    // useEffect(() => {
    //     console.log(Userstest)

    // }, [Userstest]);

    const { Search } = Input;
    const [SearchData, setSearchData] = useState(Users)
    const [SearchStatus, setSearchStatus] = useState(false)
    const [paginationReset, setPaginationReset] = useState(false)

    useEffect(() => {
        setSearchData(Users);
    }, [Users]);

    const onSearch = async (value) => {
        if(value == null || value == "") {
            setSearchStatus(false)
            fetchUsersx(page);
            return ;
        }

        // const filteredRows = Users.filter((row) => {
        //     // const rowcolumm = row.iduser
        //     return (Object.values(row).map(element => element.toLowerCase())).some(e => e.includes(value.toLowerCase()));
        //     // return rowcolumm.toLowerCase().includes(value.toLowerCase());
        // });

        await axios.get(`http://localhost:8000/api/users/${value}`).then(({data}) => {
      
            setUsers(data.data)
            setTotalRows(10)
            setSearchStatus(true)
            setPaginationReset(true)

        })

        // setSearchData(filteredRows);
    }


    // function convertArrayOfObjectsToCSV(array) {
    //     let result;
    
    //     const columnDelimiter = ',';
    //     const lineDelimiter = '\n';
    //     const keys = Object.keys(Users[0]);
    
    //     result = '';
    //     result += keys.join(columnDelimiter);
    //     result += lineDelimiter;
    
    //     array.forEach(item => {
    //         let ctr = 0;
    //         keys.forEach(key => {
    //             if (ctr > 0) result += columnDelimiter;
    
    //             result += item[key];
                
    //             ctr++;
    //         });
    //         result += lineDelimiter;
    //     });
    
    //     return result;
    // }
        
    // function downloadCSV(array) {
    //     const link = document.createElement('a');
    //     let csv = convertArrayOfObjectsToCSV(array);
    //     if (csv == null) return;
    
    //     const filename = 'export.csv';
    
    //     if (!csv.match(/^data:text\/csv/i)) {
    //         csv = `data:text/csv;charset=utf-8,${csv}`;
    //     }
    
    //     link.setAttribute('href', encodeURI(csv));
    //     link.setAttribute('download', filename);
    //     link.click();
    // }

	const fetchUsersx = async page => {
		setLoading(true);

		await axios.get(`http://localhost:8000/api/users?page=${page}&per_page=${perPage}`).then(({data}) => {
            setUsers(data.data);
            setTotalRows(data.total);

        })

		setLoading(false);
	};

	const handlePageChange = page => {
        if(paginationReset) {
            setPage(page)
            fetchUsersx(page);
        } else {
            console.log("xxxxxxxxx")
        }
        
        
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		await axios.get(`http://localhost:8000/api/users?page=${page}&per_page=${newPerPage}`).then(({data}) => {
            setUsers(data.data);
        })

		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsersx(1); // fetch page 1 of users
		
	}, []);

    // const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(SearchData)} />, []);

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
                        highlightOnHover
                        // actions={actionsMemo}
                        pointerOnHover
                        // selectableRows
                        // dense
                        pagination
                        paginationResetDefaultPage={paginationReset}
                        paginationDefaultPage={page}
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                    />
            </div>
        {/*           
            <Table
                limit='5'
                headData={UserTableHead.header}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={Users}
                renderBody={(item, index) => renderBody(item, index)}
            /> */}

        </div>
    );
}

export default Index;