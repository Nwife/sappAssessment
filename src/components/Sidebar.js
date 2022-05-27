//styles & images
import './Sidebar.css';
import pager from '../assets/pager.svg';
import sidebarImg from '../assets/sidebarImg.svg';

export default function Sidebar({text}) {
  return (
    <div className='sidebar'>
        <div className="sidebar__img">
            <img src={sidebarImg} alt="sidebar img" />
        </div>
        <div className="sidebar__text">
            <h1>{text}</h1>
            <p>Just a couple of clicks and we start</p>
        </div>
        <div className="sidebar__controls">
            <img src={pager} alt="pager img" />
        </div>
    </div>
  )
}
