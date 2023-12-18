img="";
status1="";
object = [];
song="";
object_name="";

function preload(){
    img=loadImage("dog_cat.jpg");
    song=loadSound("emergency_alert.mp3");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380, 380);  
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        r=random(255);
        b=random(255);
        g=random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML="Status : Detected objects";
        for(i=0; i<object.length;i++){
            fill(r,g,b);
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%" , object[i].x+15 , object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
           
            if(object[i].label==object_name) {
                document.getElementById("baby_status").innerHTML=object_name+"Found";
                
            
            }
           

        }
    }
    
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function Start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    object_name=document.getElementById("object").value;
}