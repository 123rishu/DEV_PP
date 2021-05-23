let videoPlayer = document.querySelector("video");
let constraints = {video:true};
let recordBtn = document.querySelector("#record-video");
let photoBtn = document.querySelector("#capture-photos");
let zoomInBtn = document.querySelector(".zoom-in");
let zoomOutBtn = document.querySelector(".zoom-out");
let recordingState = false;
let recordedData;
let mediaRecorder;
let maxZoom = 3;
let minZoom = 1;
let currZoom = 1;

zoomInBtn.addEventListener("click", function(){
    if((currZoom+0.1) <= maxZoom){
        currZoom = currZoom + 0.1;
        videoPlayer.style.transform = `scale(${currZoom})`
        //videoPlayer.style.transform = scale(currZoom);
    }
});

zoomOutBtn.addEventListener("click", function(){
    if((currZoom-0.1) >= minZoom){
        currZoom = currZoom - 0.1;
        videoPlayer.style.transform = `scale(${currZoom})`
    }
});

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
                recordBtn.querySelector("div").classList.remove("record-animate");
            }
            else{
                //start the recording
                mediaRecorder.start();
                recordBtn.querySelector("div").classList.add("record-animate");
            }
            recordingState = !recordingState;
        })

        photoBtn.addEventListener("click", capturePhotos);
    }
    catch(error){
    }
})();

function capturePhotos() {

    photoBtn.querySelector("div").classList.add("capture-animate");

    setTimeout(function(){
        photoBtn.querySelector("div").classList.remove("capture-animate");
    }, 1000);


    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    let ctx = canvas.getContext("2d");

    //canvas is scaled according to currZoom
    if(currZoom != 1){
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(currZoom, currZoom);
        ctx.translate(-canvas.width/2, -canvas.height/2);
    }

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