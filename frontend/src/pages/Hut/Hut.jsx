import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import './Hut.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownlooad/AppDownload'

const Hut = () => {
    const [category,setCategory] = useState("All");
  return (
    
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category ={category}/>
      <AppDownload/>
    </div>
  )
}

export default Hut
