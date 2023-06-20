import React, { Component } from 'react';
import axios from 'axios';
import { disableValidation } from 'schema-utils';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: '',
            buttonText: 'Send'
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        this.getTasks();
    }

    addTask(e) {
        if(this.state._id) {
            axios.put(`/api/tasks/${this.state._id}`, this.state)
            .then(res => {
                console.log(res.data)
                M.toast({html: 'Task Updated'});
                this.setState({title: '', description: '', _id: '', buttonText: 'Send'});
                this.getTasks();
            })
        } else {
            axios.post('/api/tasks', this.state)
            .then(res => {
                console.log(res.data);
                M.toast({html: 'Task Saved'});
                this.setState({title: '', description: ''});
                this.getTasks();
            });
        }
        e.preventDefault();
    }
    getTasks() {
        axios.get('/api/tasks')
            .then(res => {
                console.log(res.data);
                this.setState({tasks: res.data})
            });
    }
    deleteTask(id){
        if (confirm('Are you sure you want to delete task?')) {
            axios.delete(`/api/tasks/${id}`)
            .then(res => {
                console.log(res.data);
                M.toast({html: 'Task Deleted'});
                this.getTasks();
            })
        }
    }
    editTask(id){
        axios.get(`/api/tasks/${id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    _id: res.data._id,
                    buttonText: 'Edit'
                })
            })
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className='container'>
                        <a className='brand-logo' href='/'>MERN Stack</a>
                    </div>
                </nav>

                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' onChange={this.handleChange} type="text" placeholder='Task Title' value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} placeholder='Task Description' className='materialize-textarea' value={this.state.description}/>
                                            </div>
                                        </div>
                                        <button className='btn light-blue darken-4' type='submit'>
                                            {this.state.buttonText}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' style={{margin: '4px'}} onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className='btn light-blue darken-4' style={{margin: '4px'}} onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;