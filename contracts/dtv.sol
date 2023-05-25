// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Dtv {
    uint256 public videoCount=0;
    mapping(uint256 => video[]) public videos;
    mapping(address => userVideo[]) public userVideos;
    mapping(address => uint256) userVideoId;
    mapping(string=>uint256[]) tag;

    struct video {
        uint256 id;
        string hash;
        string title;
        string description;
        string tag;
        address author;
    }
    struct userVideo {
        uint256 globalId;
        uint256 localId;
        string hash;
        string title;
        string description;
        string tag;
    }

    userVideo[] public temp;

    event videoUploaded(uint256 id, string hash, string title,string description,string tag, address author);
    event videoDeleted(uint256 id, string title);


//function to upload video details on the blockchain
// first checking the that the updated data is not empty
// then updating video on the global list and the list which contain the videos of owner only
    function uploadVideo(string memory _videoHash, string memory _title, string memory _description, string memory _tag)
        public
    {
        require(bytes(_videoHash).length > 0, "video does not exist");
        require(bytes(_title).length > 0, "title does not exist");
        require(bytes(_description).length > 0, "description does not exist");
        require(bytes(_tag).length > 0, "tag does not exist");
        require(msg.sender != address(0), "address does not exist");

        videoCount++;
        videos[1].push( video(videoCount, _videoHash, _title,_description,_tag, msg.sender));
        userVideoId[msg.sender]++;
        userVideos[msg.sender].push(
            userVideo(videoCount, userVideoId[msg.sender], _videoHash, _title,_description,_tag)
        );
        tag[_tag].push(videoCount);
        emit videoUploaded(videoCount, _videoHash, _title,_description,_tag, msg.sender);
    }


// function to reward the creator 
// first enter function to transfer value from sender to contract
// then transfer function to transfer money from the contract to the crearor address.
    function enter() public payable {
        payable(msg.sender);
    }

     function transfer(address payable receiver) external {
        receiver.transfer(address(this).balance);
    }

// function to display all the video uploaded on the app, returning the data in form of array
    function getAllVideos() public view returns(video[] memory){
        return videos[1];
    }


// function to display all the video uploaded by the particular user, returning the data in form of array
    function getUserVideos(address creator) public view returns(userVideo[] memory){
        return userVideos[creator];
    }


// function to sort the videos according to the particular tags, helping in grouping videos
    function videoByTag(string memory _tag) public view returns(uint[] memory){
        return tag[_tag];
    }
    
}
