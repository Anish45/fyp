import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Recommend() {

  const [recipes, setRecipes] = useState([]);
  const [length, setLength] = useState(0);

useEffect(() => {

  Axios.get(`http://localhost:5000/recommendation/${localStorage.getItem("title")}/${localStorage.getItem("rating")}`).then((res) => {
    var s = res.data;
    var keys = []
    for (var k in s ) keys.push(k);
    console.log(keys[0]);
    setLength(res.data.length)
  })
  
})

  return (
    <>
    {length != 0  ? (
      <>
        Getting Recommendations
      </>
    ) : (<h1>No any Posts Here</h1>)}
    
    </>
  )
}

export default Recommend