import { play_recording, preview_start, stop_recording } from "./record.js";

const $btns = document.getElementById('ctn-btn');
const btnType = Object.freeze({
    record : "btn-record",
    stop : "btn-stop",
    play : "btn-play",
    dnld : "btn-download"
});
const video = {
    preview: document.getElementById('preview'),
    record: document.getElementById('recording')
};

$btns.addEventListener('click',(e)=>{
    const target = e.target;
    const {record,stop,play,dnld} = btnType;
    const {preview:pvw, record:rec} = video;
    switch(target.className){
        case record :
            preview_start(pvw);
            break;
        case stop :
            stop_recording(pvw);
            break;
        case play :
            play_recording(rec,dnld);
            break;
        case dnld :
            break;
        default:
            break;
    }
});