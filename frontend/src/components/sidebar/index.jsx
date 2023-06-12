import { React, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import './sidebars.js'
import './sidebar.css'

const SidebarItem = props => {

    useEffect(() => {
        const buttons = document.querySelectorAll('div.ef-hover')
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function (e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;
                let ripples = document.createElement('span');
                ripples.classList.add('span-hover');

                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';

                this.appendChild(ripples);
                setTimeout(() => {
                    ripples.remove();
                }, 1000);

            })

        })
    }, []);

    const active = props.active ? 'active' : ''
    
    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <div className={`ef-hover ${active}`}>
                    <i className={props.icon}></i>  
                </div>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}


const Sidebar = (props) => {

    useEffect(() => {
        const buttonsNav = document.querySelectorAll('li.sd-link')
        buttonsNav.forEach(btn => {
            btn.addEventListener('click', function (e) {
                let sidebarOverlay = document.getElementsByClassName('sidebar-overlay');
                sidebarOverlay.classList.remove("active");
            })
    
        })
    }, []);

    const sidebar_items = { 

        Access :[
            {
                "display_name": "Home",
                "route": "/",
                "icon": "bx bx-category-alt"
            },
            {
                "display_name": "Menu x",
                "route": "/A",
                "icon": "bx bx-user-pin"
            },
            {
                "display_name": "Menu x",
                "route": "/B",
                "icon": "bx bx-wrench"
            },
            {
                "display_name": "Menu x",
                "route": "/C",
                "icon": "bx bx-task"
            },
            {
                "display_name": "Menu x",
                "route": "/D",
                "icon": "bx bxl-microsoft-teams"
            },
            {
                "display_name": "Menu x",
                "route": "/E",
                "icon": "bx bx-desktop"
            },
            {
                "display_name": "Menu x",
                "route": "/F",
                "icon": "bx bx-book-alt"
            },
            {
                "display_name": "Login",
                "route": "/Login",
                "icon": "bx bx-cog"
            },
        ]

    }

    let activeItem 
    activeItem = sidebar_items.Access.findIndex(item => item.route === props.location.pathname)



    return (
        <>
             <div className={`sidebar ${props.isOpen == true ? 'active' : ''}`}>
                <div className="sd-body">
                    <ul className="list-unstyled ps-0 ">
                        <li className="border-top my-3"></li>
                        {
                                    
                            sidebar_items.Access.map((item, index) => (
                                <Link to={item.route} key={index}>
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                    />
                                </Link>
                            ))
                            
                        }
                        <li className="border-top my-3"></li>

                        <li className="features-item mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                Orders
                            </button>
                            <div className="collapse" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li className="features-item"><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
                                <li className="features-item"><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
                                <li className="features-item"><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a></li>
                                <li className="features-item"><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>                    
            <div className={`sidebar-overlay ${props.isOpen == true ? 'active' : ''}`} onClick={props.ToggleSidebar}></div>
        </>
    );
}

export default Sidebar;

