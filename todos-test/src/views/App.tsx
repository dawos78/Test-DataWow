import { useEffect, useState } from 'react'
import '../assets/App.css'
import { initItems, addItem } from "../state/todoItem/todoSlice"
import { useDispatch, useSelector, } from "react-redux";
import axios from 'axios'
import Dropdown from '../components/dropdown/Dropdown'
import dotThree from '../assets/image/svg/dot-three.svg'
import Progressbar from '../components/progress/ProgressBar'
import { RootState } from '../state/store';
function App() {
  const dispatch = useDispatch();
  const margin = {
    marginBottom: "15px",
  }
  const Style = {
    padding: "5px 5px",
    cursor: "pointer",
    fontWeight: "400",
    zIndex: "999",
    left: -80,
    right: 0,
  }

  const [completed, setCompleted] = useState(0);
  const [currentDotThree, setCurrentDotThree] = useState("");
  const [interacting, setInteracting] = useState(false);
  const [editing, setEditing] = useState("");
  const [editFrom, setEditFrom] = useState();
  function opens(item: string) {
    if (interacting) {
      setCurrentDotThree("");
      setInteracting(false);
    } else {
      setCurrentDotThree(item);
      setInteracting(true);
    }
  }

  function saveEdit(item: string) {
    console.log('test');

    axios.patch(`http://localhost:3001/todos/${item}`, {
      title: editFrom,
    }).then((res) => {
      setEditFrom(res.data.title)
      setInteracting(false);
      setCurrentDotThree("");
      setEditing("");
      axios.get('http://localhost:3001/todos/').then((res) => {
        dispatch(initItems(res.data))
      });
    });
  }

  function editFunc(item: string) {
    if (interacting) {
      axios.get(`http://localhost:3001/todos/${item}`).then((res) => {
        setEditFrom(res.data.title)
      });
      setInteracting(true);
      setEditing(item);
    } else {
      setInteracting(false);
      setEditing("");
    }
  }

  //useEffectzone
  useEffect(() => {
    axios.get('http://localhost:3001/todos/').then((res) => {
      dispatch(initItems(res.data))
    });
  }, [dispatch]);
  function filterDropdown(item: string) {
    if (item === "Undone") {
      axios.get('http://localhost:3001/todos/?completed=false').then((res) => {
        dispatch(initItems(res.data))
      });
    } else if(item === "Done") {
      axios.get('http://localhost:3001/todos/?completed=true').then((res) => {
        dispatch(initItems(res.data))
      });
    } else {
      axios.get('http://localhost:3001/todos').then((res) => {
        dispatch(initItems(res.data))
      });
    }
  }
  //useSelectorzone
  const items = useSelector((state: RootState) => state.items.items);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const title = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
      axios.post('http://localhost:3001/todos/', {
        title: title.value,
        completed: false
      }).then(() => {
        try {
          axios.get('http://localhost:3001/todos/').then((res) => {
            dispatch(initItems(res.data))
          });
        } catch (error) {
          console.log(error)
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleCheckTodo = (id: string) => {
    try {
      const checkbox = document.getElementById("cb_" + id) as HTMLInputElement;
      axios.patch('http://localhost:3001/todos/' + id, {
        completed: checkbox.checked
      }).then((res) => {
        console.log(res.data)
        axios.get('http://localhost:3001/todos/').then((res) => {
          dispatch(initItems(res.data))
          setInteracting(false);
        });
      }
      );
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteTodo = (id: string) => {
    try {
      axios.delete('http://localhost:3001/todos/' + id).then((res) => {
        try {
          axios.get('http://localhost:3001/todos/').then((res) => {
            dispatch(initItems(res.data))
            setInteracting(false);
          });
        } catch (error) {
          console.log(error)
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditTodo = (id: string) => {
    try {
      axios.patch('http://localhost:3001/todos/' + id).then((res) => {
        console.log(res.data)
        try {
          axios.get('http://localhost:3001/todos/').then((res) => {
            dispatch(initItems(res.data))
            setInteracting(false);
          });
        } catch (error) {
          console.log(error)
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='card-todos'>
        <div className='card-todos-process'>
          <p className='text-header-progress'>Progress</p>
          <Progressbar onChange={(e) => setCompleted(e)} todoItems={items} />
          <p className='text-completed'>{completed} Completed</p>
        </div>
        <div className='flex justify-between'>
          <p className='task'>Tasks</p>
          <div className='dropdown-center'>
            <Dropdown onChange={(category) => { filterDropdown(category) }} />

          </div>
        </div>
        {items?.map((item, key) => {
          return (
            <div key={key} data-id={item} style={margin} className={editing !== item.id ? 'flex justify-between items-center todos-list-card' : ''}>
              <div className={editing !== item.id ? 'flex' : ''}>
                {editing !== item.id ? (
                  <div>
                    <input id={"cb_" + item.id} type='checkbox' className='cb1 checkbox' checked={item.completed} onChange={() => handleCheckTodo(item.id)}></input>
                    <label id={"lb_" + item.id} className={item.completed ? 'text-todos text-decoration-line' : 'text-todos'}>{item.title}</label>
                  </div>
                ) : <div className='flex items-center justify-content-end reletive'><input value={editFrom} onChange={e => setEditFrom(e.target.value)} className='flex justify-between items-center add-todos'></input><button onClick={() => saveEdit(item.id)} className='absolute button-save'>save</button></div>
                }
              </div>
              <div className="reletive">
                {editing !== item.id ? (<div onClick={() => opens(item.id)} className='cursor-pointer'><img src={dotThree} alt="" /></div>) : <div ></div>}
                {currentDotThree === item.id ? (
                  <div style={Style} className={editing !== item.id ? 'absolute menu' : 'hidden'}>
                    <div onClick={() => editFunc(item.id)} className='menu-option' style={Style}>Edit</div>
                    <div onClick={() => handleDeleteTodo(item.id)} className='menu-option text-red' style={Style}>Delete</div>
                  </div>
                ) : <div></div>
                }
              </div>
            </div>
          )
        })}
        <form className='flex items-center justify-content-end reletive' onSubmit={handleAddTodo}>
          <input placeholder='Add your todo...' className='flex justify-between items-center add-todos' id='title'></input>
        </form>
      </div>

    </>
  )
}

export default App
