import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      error: '',
      id: ''
    }
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        console.log(response)
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log(error)
        this.setState({ errorMessage: 'Error retrieving data' })
      })
  }

  deleteRow = (id, e) => {
    e.preventDefault();

    axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(response => {
        console.log('Deleted', response);
        
        const posts = this.state.posts.filter(post => post.id !== id);  
        this.setState({ posts });  

      })
      .catch(err => console.log(err))

  }



  render() {
    const { posts, errorMessage } = this.state
    return (
      <>
        <h1>List of Albums</h1>
        <div >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Thumbnail</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, item) => 
                <tr key={(post.id)}>                
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td><img src={post.thumbnailUrl} alt="thumbnail"></img></td>                
                <td><button onClick={(e) => this.deleteRow(post.id, e)}>delete</button></td>                
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {
          <div>{errorMessage}</div>
        }
      </>
    )
  }
}

export default PostList