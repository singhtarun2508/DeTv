import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import ytlogo from '../media/ytlogo.png'
import web3context from '../Context/web3context';
import './CSS/Video.css'

export default function Video() {
  let { uri } = useParams();
  const [myVideoTitle, setmyVideoTitle] = useState("")
  const [myVideoDesc, setmyVideoDesc] = useState("")
  const [myVideoChannel, setmyVideoChannel] = useState("")
  const [videoHash, setVideoHash] = useState("")
  const [tagArray, setTagArray] = useState([])
  const context = useContext(web3context)
  const [num, setNum] = useState(0)
  const { connection, getData, reward, getCategoryData } = context;

  useEffect(() => {
    const trial = async () => {
      if (connection) {
        const temp = await getData();
        setVideoHash(`https://detv.infura-ipfs.io/ipfs/${temp[uri - 1].hash}`)
        setmyVideoChannel(temp[uri - 1].author)
        setmyVideoTitle(temp[uri - 1].title)
        setmyVideoDesc(temp[uri - 1].description)
        const tag = (temp[uri - 1].tag)
        const finalArray = await getCategoryData(tag);
        setTagArray(finalArray.map((item) => temp[item - 1]));
        let len = (Math.floor((Math.random() * finalArray.length)) - 8)
        setNum(len >= 0 ? len : 0)
      }
    }
    trial()
  }, [connection])

  const newTrial = async () => {
    if (connection) {
      const temp = await getData();
      setVideoHash(`https://detv.infura-ipfs.io/ipfs/${temp[uri - 1].hash}`)
      setmyVideoChannel(temp[uri - 1].author)
      setmyVideoTitle(temp[uri - 1].title)
      setmyVideoDesc(temp[uri - 1].description)
      const tag = (temp[uri - 1].tag)
      const finalArray = await getCategoryData(tag);
      setTagArray(finalArray.map((item) => temp[item - 1]));
      window.location.reload()
    }
  }

  return (
    <>
      <div className="videopage">
        <div className='myVideo'>
          <video key={Date.now()} className='actualVideo' height="100%" width="100%" preload=''
            autoPlay controls
          >
            <source cache={false} src={videoHash} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='topline'>
            <div className="myVideotitle">
              {myVideoTitle}
            </div>
            <button className='rewardbutton' onClick={() => { reward(myVideoChannel) }}> reward creator</button>
          </div>
          <div className="detailWrapper">
            <div className="myChannelLogo">
              <img className=' myHomeLogo' src={ytlogo} alt='logo' />
            </div>
            <div className="myVideoDetails">

              <div className="myVideochannel">
                {myVideoChannel}
                <br />
                <div className="author"> Author</div>
              </div>
            </div>
          </div>
          <div className="myVideodesc">
            {myVideoDesc}
          </div>
        </div>
        <div className='videoList'>
          {tagArray.slice(num, num + 8).map((elem) => {
            return (
              <Link onClick={() => { newTrial(); }} key={elem.id} to={`/video/${elem.id}`}>
                <div className='videotiles' >
                  <div className='VideoCardWrapper'>
                    <div className='myvideocard'>
                      <div className="thumbnailtile">
                        <video className='tilevideo' src={`https://detv.infura-ipfs.io/ipfs/${elem.hash}`} width="100%" height="100%" preload='none' />
                      </div>
                      <div className="tiledetail">
                        <div className="tiletitle">
                          {`${(elem.title).length > 30 ? (elem.title).slice(0, 30).concat("...") : (elem.title)}`}
                        </div>
                        <div className="tilechannel">
                          {elem.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
