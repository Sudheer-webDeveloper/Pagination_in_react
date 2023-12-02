import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [todosPerPage, setTodosPerPage] = useState(10);
  const numberOfPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1); // returns [1,2,3,...20]
  console.log("pages", pages);


  const [currentPage,setCurrentPage] = useState(1)
  // console.log(currentPage)


  const lastIndex = currentPage * todosPerPage // suppose if I click on button 1 the calulation will be lastIndex = 1 * 10 ; lastIndex = 10
  const firstIndex = lastIndex - todosPerPage //// suppose if I click on button 1 the calulation will be firstIndex = 10 -10  ; firstIndex = 0

  console.log(firstIndex,lastIndex)  // based on the above calculation it will print 0,10 
   
  const todoItems = todos.slice(firstIndex,lastIndex) // (0 ,10) if 2nd button  click (10,20) ....if 20th button click(190,200)



  // for prev and next buttons

  function nextButton(){
    return setCurrentPage(currentPage>=pages.length ? 1 : currentPage + 1)
  }
  console.log("currentpage" ,currentPage,"todosPerPage",pages.length)


  function prevButton(){
    return setCurrentPage(currentPage===1 ? 1 : currentPage - 1)
  }







  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos`
        );
        const data = await response.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchingData();
  }, []);

  return (
    <>
      <section>
        <select onClick={(e)=>setTodosPerPage(e.target.value)}>
          <option>select</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
        <div className="card-1">
          {todoItems.map((todo) => {
            return (
              <div className="card" key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.complete ? "Finished" : "Pending"}</p>
                <p>{todo.id}</p>
              </div>
            );
          })}
        </div>
        <div className="button-1">
          <button onClick={prevButton}>Prev</button>
          <div>
            {pages.map((page,index) => {
              return <button key={page} onClick={()=>setCurrentPage(page)} className={`${index===currentPage-1 ? "active" : ""}`}>{page}</button>;
            })}
          </div>
        <button onClick={nextButton}>Next</button>
        </div>
      </section>
    </>
  );
};

export default App;
