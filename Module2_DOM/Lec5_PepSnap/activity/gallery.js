function showMedia(){
    //assume db is connected
    let txn = db.transaction("Media", "readonly");
    let mediaStore = txn.objectStore("Media");
    let cursorObject = mediaStore.openCursor();
    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let media = cursor.value;
            console.log(media);
            if(media.mediaType == "image"){
                appendImage(media);
            }
            else if(media.mediaType == "Video"){
                appendVideo(media);
            }
            cursor.continue();
        }
    }
}
let iv = setInterval(function(){
    if(db){
        showMedia();
        clearInterval(iv);
    }
}, 100);

let backBtn = document.querySelector(".back-btn");
let gallery = document.querySelector(".gallery");


backBtn.addEventListener("click", function(){
    window.location.assign("index.html");
})

function createMediaDiv(){
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("gallery-item");
    mediaDiv.innerHTML = `<div class="media">

    </div>
    <div class="media-buttons">
        <div class="download-btn"><i class="fas fa-download"></i></div>
        <div class="delete-btn"><i class="fas fa-trash-alt"></i></div>
    </div>`;
    return mediaDiv;
}

function appendImage(media){
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid", media.mid);
    let img = document.createElement("img");
    img.src = media.mediaSource;

    mediaDiv.querySelector(".media").append(img);
    gallery.append(mediaDiv);

    let downloadBtn = mediaDiv.querySelector(".download-btn");
    let deleteBtn = mediaDiv.querySelector(".delete-btn");
    downloadBtn.addEventListener("click", function(){
        downloadMedia(media);
    })

    deleteBtn.addEventListener("click", function(){
        deleteMedia(media);
    })
}

function appendVideo(media){
    let blob = new Blob([media.mediaSource], {type:"video/mp4"});
    let videoUrl = URL.createObjectURL(blob);
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid", media.mid);
    let videoDiv = document.createElement("video");
    videoDiv.src = videoUrl;
    videoDiv.autoplay = "true";
    videoDiv.loop = "true";
    videoDiv.controls = "true";

    mediaDiv.querySelector(".media").append(videoDiv);
    let downloadBtn = mediaDiv.querySelector(".download-btn");
    let deleteBtn = mediaDiv.querySelector(".delete-btn");
    downloadBtn.addEventListener("click", function(){
        downloadMedia(media);
    })

    deleteBtn.addEventListener("click", function(){
        deleteMedia(media);
    })
    gallery.append(mediaDiv);
}

function downloadMedia(media){
    let aTag = document.createElement("a");
    if(media.mediaType == "image"){
        aTag.download = "photo.png";
        aTag.href = media.mediaSource;
    }
    else{
        let blob = new Blob([media.mediaSource], {type: "video/mp4"});
        let videoUrl = URL.createObjectURL(blob);
        aTag.download = "video.mp4";
        aTag.href = videoUrl;
    }
    aTag.click();
}

function deleteMedia(media){
    //delete from UI
    document.querySelector(`div[mid="${media.mid}"]`).remove();

    //delete from db
    let mid = media.mid;
    let txn = db.transaction("Media", "readonly");
    let mediaStore = txn.objectStore("Media");
    mediaStore.delete(mid);
}













