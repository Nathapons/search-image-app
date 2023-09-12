import { useState } from 'react'
import './App.css'
import Picture from './components/Picutre';

function App() {
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);

  function searchImage(e) {
    e.preventDefault()
    if (!text) {
      alert("กรุณาป้อนชื่อรูปภาพ")
      setPhotos([])
    } else {
      // เรียกใช้งาน api
      fetchImageFromAPI()
    }
  }

  async function fetchImageFromAPI() {
    const accessKey = import.meta.env.VITE_CLIENT_KEY;
    const url = `${import.meta.env.VITE_API_URL}?page=1&query=${text}&client_id=${accessKey}&per_page=15`
    const res = await fetch(url)
    const data = await res.json()
    const results = data.results
    if (results.length === 0) {
      alert("ไม่มีรูปภาพ")
      setText('')
    } else {
      setPhotos(results)
    }
  }

  return (
    <>
      <h1>ระบบค้นหารูปภาพด้วย API</h1>
      <form onSubmit={searchImage}>
        <input type="text" placeholder='ป้อนชื่อรูปภาพที่ต้องการค้นหา' onChange={(e) => setText(e.target.value)} value={text}/>
        <button type='submit'>ค้นหา</button>
      </form>
      <div className='search-result'>
        {photos.map((data, index) => {
          return <Picture key={index} {...data} />
        })}
      </div>
    </>
  )
}

export default App
