import { useEffect, useState } from 'react';
import '../progress/ProgressBar.css'

interface Props {
    todoItems: Array<{ id: string, title: string, completed: boolean }>;
    onChange: (param: number) => void;
}

function Progressbar(props: Props) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let doneCount = 0;
        props.todoItems.forEach(element => {
            if (element.completed) {
                doneCount++;
            }
        });
        setProgress((doneCount / props.todoItems.length) * 100);
        props.onChange(doneCount);
    }, [props.todoItems])

    const progressBar = {
        borderRadius: "25px",
        backgroundColor: "#FFFFFF",
        width: progress + "%",
        height: "9px",
    }
    return (
        <>
            <div className='progress-bar-size'>
                <div style={progressBar}>
                </div>
            </div>
        </>
    );
}

export default Progressbar

