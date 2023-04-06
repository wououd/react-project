import {useState, useEffect}from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


const ArticleList = () => {
const [articles, setArticles]= useState([])

const getAllArticles = async() =>{
    try {
        const response = await axios.get("http://localhost:4000/articles")
        setArticles(response.data)
        
    } catch (error) {
        console.error(error);
    }

}

const deletArticle = (id) =>{
     
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete this article?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {

        try {
            if (result.isConfirmed) {
            const response = await axios.delete(`http://localhost:4000/articles/${id}`);
        
            if(response.status === 200){
                setArticles(articles.filter(article => article.id !== id))
                
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                  }
            }
            
        } catch (error) {
            console.error(error);  
        }
    
       
      })

}

useEffect(() =>{
    getAllArticles()
},[])

// const postArticle = async () => {
//     const article =({"title":"angular", "description": "learn how to create app with angular"})
//     await axios.post("http://localhost:4000/articles", article)
//     console.log("article added");
// }
  return (
    <>
    <h1>List of Articles</h1>

  

    {articles && articles.map(article => (
     <div key={article.id}>
     <h1>{article.title}</h1>
     <p>{article.description}</p>
     <button onClick={() => deletArticle(article.id)} className="btn btn-danger btn-sm">Delete</button>
     </div>
    ))}
    
   
    </>
  )
}

export default ArticleList