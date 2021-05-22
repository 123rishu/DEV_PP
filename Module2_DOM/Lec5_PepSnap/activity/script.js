let videoPlayer = document.querySelector("video");
let constraints = {video:true};
let recordBtn = document.querySelector("#record-video");
let photoBtn = document.querySelector("#capture-photos");
let recordingState = false;
let recordedData;
let mediaRecorder;

(async function(){
    try{
        // let devices = await navigator.mediaDevices.enumerateDevices();
        // console.log(devices);
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoPlayer.srcObject = mediaStream; 
        mediaRecorder = new MediaRecorder(mediaStream, {mimeType: "video/webm; codecs=vp9"});
        // so next we have attached functions to these events
        mediaRecorder.onstop = function(e){
            console.log("Inside on stop !!");
            console.log(e);
        }
        mediaRecorder.onstart = function(e){
            console.log("Inside on start !!");
            console.log(e);
        }
        mediaRecorder.ondataavailable = function(e){
            console.log("Inside on data available !!");
            console.log(e);
            recordedData = e.data;
            //console.log(recordedData);
            saveVideoToFs();
        }
        console.log(mediaRecorder);

        //attach click event on recordButton
        recordBtn.addEventListener("click", function(){
            if(recordingState){
                //stop the recording
                mediaRecorder.stop();
                recordBtn.innerHTML = "Record";
            }
            else{
                //start the recording
                mediaRecorder.start();
                recordBtn.innerHTML = "Recording";
            }
            recordingState = !recordingState;
        })

        photoBtn.addEventListener("click", capturePhotos);
    }
    catch(error){
    }
})();

function capturePhotos() {
    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
  
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0);
  
    let imageUrl = canvas.toDataURL("image/jpg"); //canvas object => file url String
  
    let aTag = document.createElement("a");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;
    aTag.click();
  }

function saveVideoToFs(){
    console.log("Saving video");
    //file object in recordedData
    let videoUrl = URL.createObjectURL(recordedData);// convert Blob object into Blob url
    console.log(videoUrl);
    
    let aTag = document.createElement("a");
    aTag.download = "video.webm";
    aTag.href = videoUrl;

    aTag.click();
}