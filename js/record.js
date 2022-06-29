let recorder;
const recoredChunks = [];

/* 화면에 띄움 */
export function preview_start(pvw){
    navigator.mediaDevices.getUserMedia({video:true, audio:true})
    .then(stream => {
        pvw.srcObject = stream;
        start_recording(pvw.captureStream()); 
    })
    .catch(e=>console.log('장비 없음 : ',e))
}//preview_start

/* 녹화 시작 */
function start_recording(stream){
    empty_arr(recoredChunks);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {recoredChunks.push(e.data)}
    recorder.start();
}//start_recording

function empty_arr(arr){
    while(arr.length){arr.pop();}
}//empty_arr

/* 녹화 종료 */
export function stop_recording(pvw){
    pvw.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop();
}//stop_recording

//Blob이 뭔데
//https://heropy.blog/2019/02/28/blob/

/* 녹화한거 재생 */
export function play_recording(rec,dnld){
    const recordedBlob = new Blob(recoredChunks, {type:"video/webm"});
    const url = URL.createObjectURL(recordedBlob); 
    rec.src = url
    rec.play();

    //다운로드 버튼 관련
    dnld.href= url;
    dnld.download = `recording_${new Date()}.webm`;
}//play_recording