import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css' 
const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/api/persons').then(response=>setPersons(response.data))

  },[])
  
  const [newName, setNewName] = useState('')
  const[placeholder,setPlaceholder]=useState("Add a name")

  const removeHandler=(id)=>{
    
    let url = `http://localhost:3001/api/persons/${id}`;
    console.log(url)
    axios.delete(url).then(console.log("deleted")).then( setPersons(persons.filter(person=>person.id!==id)))
  }
  const placeholderHandler=(event)=>{
    setPlaceholder(event.target.value)
  }
  const addPerson=(event)=>{
    event.preventDefault()
    const person={"name": placeholder,id:'1'}
    if(persons.some(person=>person.name===placeholder)){
      if(window.confirm(`${placeholder} already exists in the phonebook. You still wanna add?`)){
        setPersons(persons.concat(person))
        setPlaceholder("Add a name")
        axios.post('http://localhost:3001/api/persons',person).then(console.log('posted'))
      }
      else{
        setPlaceholder("Add a name")
      }
    }
    else{
    setPersons(persons.concat(person))
    axios.post('http://localhost:3001/api/persons',person).then(console.log('posted'))
    setPlaceholder("Add a name")
  }
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div className='adder'>
          Name: <input type="text" value={placeholder} onChange={placeholderHandler}/>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Names</h2>
      <ul>
        {persons.map(person=><li>{person.name}<button onClick={()=>removeHandler(person.id)}>Delete</button></li>)}
      </ul>
    </div>
  )
}

export default App