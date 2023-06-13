import './topbar.css'
import { Button } from 'primereact/button';

const Index = (props) => {
    
    return (
        //navbar-light bg-white
        <nav className="layout-topbar">
            <div className="layout-topbar-box">
                <a className="layout-topbar-logo">Company Logo</a>
                <div className="layout-topbar-menulist card flex justify-content-center">
                    <Button className='menulist' label="" severity="secondary" onClick={props.ToggleSidebar} icon="pi pi-align-justify"/>
                        {/* <div className="card flex justify-content-center">
                            <Button label="Submit" />
                        </div> */}
                </div>
            </div>
        </nav>
    );
}

export default Index;
