import React, { useContext, useState } from 'react'
import { Buffer } from 'buffer';
import web3context from '../Context/web3context';
import Spinner from './Spinner';
import godzilla from '../media/godzilla.gif'
import './CSS/Upload.css'
const dotenv = require('dotenv')
dotenv.config()

const ipfsClient = require('ipfs-http-client')

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export default function Upload() {
  const url = "http://localhost:5000/chat/"
  const context = useContext(web3context)
  const { pushVideo } = context
  const [inp, setInp] = useState("")
  const [loading, setLoading] = useState(false)
  const [tag, setTag] = useState("")
  const [desc, setDesc] = useState("")
  const [titlePrompt, setTitlePrompt] = useState("")
  const [descPrompt, setDescPrompt] = useState("")
  const [aiText, setAiText] = useState("Ask Help from AI")
  const [hide, setHide] = useState("hide")
  const [buffer, setBuffer] = useState(null)
  const [title, setTitle] = useState("")

  const converter = event => {
    setInp(event.target.value)
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      var arrayBuffer = reader.result;
      var bytes = new Uint8Array(arrayBuffer);
      setBuffer(bytes)
    }
  }

  function generatePrompt(keyword, _content) {
    if (keyword.trim().length === 0) {
      alert("please enter details")
      return
    }
    const capitalizedText =
      keyword[0].toUpperCase() + keyword.slice(1).toLowerCase();
    return `Suggest ${_content} of youtube video with following content:
    ${capitalizedText}`;
  }

  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const changeDesc = (e) => {
    setDesc(e.target.value)
  }

  const getTitle = (e) => {
    setTitlePrompt(e.target.value)
  }

  const getDesc = (e) => {
    setDescPrompt(e.target.value)
  }

  const tagChange = (e) => {
    setTag(e.target.value)
  }

  const resetForm = () => {
    setInp("")
    setTitle("")
    setDesc("")
    setTag("")
  }

  const uploadVideo = (e) => {
    e.preventDefault();
    setLoading(true)
    client.add(Buffer.from(buffer), async (error, result) => {
      if (error) {
        console.log(error)
      }
      await pushVideo(result[0].path, title, desc, tag)
      setLoading(false)
    })
    resetForm();
  }

  const helpfromai = () => {
    if (hide === "hide") {
      setHide("")
      setAiText("I can do it myself!")
    }
    if (hide === "") {
      setHide("hide")
      setAiText("Ask Help from AI")
    }
  }

  const genTitle = async () => {
    setLoading(true)
    const prompt = generatePrompt(titlePrompt, "title")
    try {
      if (!prompt) {
        return
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setTitle(data.result)
      setLoading(false)
    } catch (error) {
      //implementing error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  const genDesc = async () => {
    setLoading(true)
    const prompt = generatePrompt(descPrompt, "description")
    try {
      if (!prompt) {
        return
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setDesc(data.result)
      setLoading(false)
    } catch (error) {
      // implementing error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      {loading && <Spinner message="Loading..." src={godzilla} />}
      <div className="uploadpagewrapper" style={{ opacity: loading ? "0.1" : "1" }}>
        <div className='upload'>
          <div className='uploadwrapper'>
            <form onSubmit={uploadVideo}>
              &nbsp;
              <input type='file' onChange={converter} value={inp} accept=".jpg, .mp4, .mkv, .ogg, .wmv " required />
              <div className="titlewrapper">
                <input id="videoTitle" type="text" className="title" placeholder="Title" onChange={changeTitle} value={title} required />
              </div>
              <div className="descwrapper">
                <textarea id="videoDesc" type="text" className="desc" placeholder="Description" onChange={changeDesc} value={desc} required />
              </div>
              <div className="titlewrapper">
                <div className="radio">
                  <input checked={tag === "education"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="education" required />
                  <label htmlFor="html">Education</label>
                </div>
                <div className="radio">
                  <input checked={tag === "comedy"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="comedy" />
                  <label htmlFor="css">Comedy</label>
                </div><div className="radio">
                  <input checked={tag === "kids"} onChange={tagChange} className='radiotag' type="radio" id="javascript" name="tag" value="kids" />
                  <label htmlFor="javascript">Kids</label>
                </div>
                <br />
                <div className="radio">
                  <input checked={tag === "action"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="action" />
                  <label htmlFor="html">Action</label>
                </div><div className="radio">
                  <input checked={tag === "music"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="music" />
                  <label htmlFor="css">Music</label>
                </div><div className="radio">
                  <input checked={tag === "games"} onChange={tagChange} className='radiotag' type="radio" id="javascript" name="tag" value="games" />
                  <label htmlFor="javascript">Games</label>
                </div>
                <br />
                <div className="radio">
                  <input checked={tag === "romance"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="romance" />
                  <label htmlFor="html">Romance</label>
                </div><div className="radio">
                  <input checked={tag === "adventure"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="adventure" />
                  <label htmlFor="css">Adventure</label>
                </div><div className="radio">
                  <input checked={tag === "horror"} onChange={tagChange} className='radiotag' type="radio" id="javascript" name="tag" value="horror" />
                  <label htmlFor="javascript">Horror</label>
                </div>
                <br />
                <div className="radio">
                  <input checked={tag === "programming"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="programming" />
                  <label htmlFor="html">Programming</label>
                </div><div className="radio">
                  <input checked={tag === "news"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="news" />
                  <label htmlFor="css">News</label>
                </div><div className="radio">
                  <input checked={tag === "science"} onChange={tagChange} className='radiotag' type="radio" id="javascript" name="tag" value="science" />
                  <label htmlFor="javascript">Science</label>
                </div>
                <br />
                <div className="radio">
                  <input checked={tag === "facts"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="facts" />
                  <label htmlFor="html">Facts</label>
                </div><div className="radio">
                  <input checked={tag === "sports"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="sports" />
                  <label htmlFor="css">Sports</label>
                </div><div className="radio">
                  <input checked={tag === "thoughts"} onChange={tagChange} className='radiotag' type="radio" id="javascript" name="tag" value="thoughts" />
                  <label htmlFor="javascript">Thoughts</label>
                </div>
                <br />
                <div className="radio">
                  <input checked={tag === "culture"} onChange={tagChange} className='radiotag' type="radio" id="html" name="tag" value="culture" />
                  <label htmlFor="html">Culture</label>
                </div><div className="radio">
                  <input checked={tag === "others"} onChange={tagChange} className='radiotag' type="radio" id="css" name="tag" value="others" />
                  <label htmlFor="css">Others</label>
                </div>
              </div>
              <button className='uploadbutton' type="submit">Upload!</button>
              &nbsp;
            </form>
          </div>
          <button onClick={helpfromai} className='aibutton'>{aiText}</button>
        </div>

        <div className={`chatwrapper ${hide}`}>
          <div className='chathelp'>Let me help you!!!</div>
          <div className="titlewrapper">
            <div className='generator'>Title Generator</div>
            <input onChange={getTitle} type="text" className="title" placeholder="Describe Your Video in Short" required />
          </div>
          <button className='chatbutton' onClick={genTitle}>Generate Title</button>
          <div className="chatdescwrapper">
            <div className='generator'>Description Generator</div>
            <textarea onChange={getDesc} id="videoTitle" type="text" className="desc" placeholder="A brief Description please" required />
          </div>
          <button className='chatbutton' onClick={genDesc}>Generate Desc</button>
        </div>
      </div>
    </>
  )
}







