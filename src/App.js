import {useEffect, useState} from "react";

function App() {
    const [name, setName] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/tasks');

            const content = await response.json();

            setTasks(content);
        })();
    }, []);

    const create = async e => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/tasks', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name
            })
        });

        const task = await response.json();

        setTasks([...tasks, task]);
    }

    const update = async (id, checked) => {
        await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                complete: checked
            })
        });
    }

    const del = async id => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await fetch(`http://localhost:8000/tasks/${id}`, {
                method: 'DELETE'
            });

            setTasks(tasks.filter(t => t.id !== id));
        }
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">

                        <div className="card" style={{borderRadius: '15px'}}>
                            <div className="card-body p-5">

                                <h6 className="mb-3">Tasks List</h6>

                                <form className="d-flex justify-content-center align-items-center mb-4"
                                      onSubmit={create}
                                >
                                    <div className="form-outline flex-fill">
                                        <input type="text" id="form3" className="form-control form-control-lg"
                                               onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg ms-2">Add</button>
                                </form>

                                <ul className="list-group mb-0">
                                    {tasks.map(task => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                                                <div className="d-flex align-items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value=""
                                                           aria-label="..."
                                                           defaultChecked={task.complete}
                                                           onChange={e => update(task.id, e.target.checked)}
                                                    />
                                                    {task.name}
                                                </div>
                                                <a href="#!" data-mdb-toggle="tooltip" title="Remove item"
                                                   onClick={e => del(task.id)}
                                                >
                                                    <i className="fas fa-times text-primary"></i>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
