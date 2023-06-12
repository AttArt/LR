import './topbar.css'
const Index = (props) => {
    
    return (
        //navbar-light bg-white
        <nav className="navbar navbar-expand-lg shadow-md fixed-top">
            <div className="container-fluid p-2">
                <a className="navbar-brand text-primary mr-0">Company Logo</a>
                <div className="form-inline ml-auto">
                    <div className="btn btn-nav" onClick={props.ToggleSidebar} >
                        BTN
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Index;
