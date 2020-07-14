import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Main = (props) => {
  const [category, setCategory] = useState('')
  return (
    <div>
      {props.categories.map((item) => (
        <div key={item}>
          <Link to={`/${item}`}>{item}</Link>
        </div>
      ))}
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button type="button" onClick={() => props.addCategory(category)}>
        Add
      </button>
    </div>
  )
}
export default Main
