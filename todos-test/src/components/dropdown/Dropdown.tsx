import { useState } from 'react';
import '../dropdown/Dropdown.css'
import arrowDown from '../../assets/image/svg/arrow-down.svg'

interface Props {
    onChange?: (param: string) => void;
}

function Dropdown(props: Props) {

    const Style = {
        padding: "5px 5px",
        cursor: "pointer",
        fontWeight: "400",
        zIndex: "999",
    }
    const zindex = {
        zIndex: "999"
    }

    const [open, setOpen] = useState(false);
    const [param, setParam] = useState("All");

    function opens() {
        setOpen(open => !open);
    }

    const handleParam = (param: string) => {
        if (props.onChange != undefined) {
            setParam(param);
            props.onChange(param);
        }
    }

    return (
        <>
            <div className="reletive">
                <button onClick={opens} style={Style} className='dropdown-background'>{param} <img src={arrowDown} alt="" /></button>
                {open ? (
                    <div style={zindex} className='absolute menu'>
                        <div className='menu-option' style={Style} onClick={() => handleParam('All')}>All</div>
                        <div className='menu-option' style={Style} onClick={() => handleParam('Done')}>Done</div>
                        <div className='menu-option' style={Style} onClick={() => handleParam('Undone')}>Undone</div>
                    </div>
                ) : <div></div>
                }
            </div>
        </>
    );
}

export default Dropdown
