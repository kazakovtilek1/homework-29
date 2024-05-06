import {useState} from 'react';

function MainPage() {

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    function changeValue(event) {
        const {value} = event.target;
        setInput(value)

    }

    function addTodo (event) {
        event.preventDefault();
        let todo = {}
        if(todos.length === 0){
            todo = {
                id: 1,
                title: input,
                status: false
            }
            } else {
                todo = {
                    id: todos[todos.length - 1].id + 1,
                    title: input,
                    status: false
                }
        }
        setTodos([...todos, todo]);
        setInput('')
    }

    function deleteTodo (id) {
        const filteredTodos = todos.filter(todo => todo.id !== id)
        setTodos(filteredTodos);
    }

    function changeStatus (event) {
        const {checked, value} = event.target;
        const id = +value

        const newTodos = todos.map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    status: checked
                }
            } else {
                return todo
            }
        })
        setTodos(newTodos)
    }

    function deleteAll () {
        setTodos([])
    }

    function updateTodo (id) {
        const newTodos = todos.map(todo => {
            if(todo.id === id) {
                return {
                    ...todo,
                    title: input
                };
            } else {
                return todo;
            }
        });
        setTodos(newTodos);
        setInput('');
    }

    return (
        <div>
            <h1>Main Page</h1>

            <form onSubmit={addTodo}>
                <input type="text" onInput={changeValue} value={input}/>
                <button type="submit">Add todo</button>
                <button onClick={deleteAll}>Delete All</button>
            </form>

            <ul>
                {todos.map(todo => <li key={todo.id}>
                    <input
                        checked={todo.status}
                        type="checkbox" onChange={changeStatus} value={todo.id}/>
                    {todo.status ? <s>{todo.title}</s> : <span>{todo.title}</span>}
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    <button onClick={() => updateTodo(todo.id)}>Update</button>
                </li>)}
            </ul>
        </div>
    );
}

export default MainPage;