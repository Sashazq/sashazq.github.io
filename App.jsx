import React from 'react';
import TextBox from './Components/textBox';
import SimpleTable from './Components/simpleTable';
function saveAppState(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
}

function getAppState(name) {
    if (localStorage.getItem(name))
        return JSON.parse(localStorage.getItem(name));
    else
        return petslist;
}

let petslist = [
        {
            name: 'Козюля',
            id: 1
        }, {
            name: 'Икака',
            id: 2
        }, {
            name: 'Shurup',
            id: 3
        }
    ];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: getAppState('pets'),
            foods: getAppState('foods')
        };

        this.saveFood = this.saveFood.bind(this);
    }

    /** add new element to table (row or col)
     *
     * @param name
     * @param key - name of state
     */
    addElementToTable(name, key) {
        let tmpList = this.state[key].slice(),
            newElement = {
                name: name,
                id: Math.floor(Math.random() * 1000000)
            };

        tmpList.push(newElement);

        if(key == 'foods')
            this.saveFood(newElement.id);

        if(key == 'pets'){
            newElement.foods = {};
            this.state.foods.map((food)=>{
                newElement.foods[food.id] = false;
                return true;
            })
        }

        this.setState({[key]:tmpList});
        saveAppState(tmpList, key);
    }

    saveFood(foodId) {
        this.state.pets.map((pet) => {
            pet.foods[foodId] = false;
        })
    }

    saveState(data, key){
        // console.log(data);
      this.setState({[key]:data});
      saveAppState(data,key);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <SimpleTable data={this.state} checkBoxClick={this.saveState.bind(this)}/>
                    <TextBox
                        name="pets" //key
                        titleText="Новый питомец..."
                        myClickEvent={this.addElementToTable.bind(this)}
                    />
                    <TextBox
                        name="foods" //key
                        titleText="Новая еда..."
                        myClickEvent={this.addElementToTable.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default App;
//
//
//     var request_host_id = "23008";
//     var MXPartnerChannel = window.MXPartnerChannel = request_host_id;
//
//     var isMobile = {
//     Android: function() {
//     return navigator.userAgent.match(/Android/i) ? true : false;
// },
//     BlackBerry: function() {
//     return navigator.userAgent.match(/BlackBerry/i) ? true : false;
// },
//     iOS: function() {
//     return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
// },
//     Windows: function() {
//     return navigator.userAgent.match(/IEMobile/i) ? true : false;
// },
//     any: function() {
//     return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
// }
// };
//
//     var condition_safe = 'ed064acb78fd5dd9';
//
//     var condition_detected = false;
//
//     var adv_enabled = true;
//
//
//
//
//     function player_osmf(video, url, node_id) {
//     var subtitles = JSON.stringify({
//     subtitles: [
//
//
//
//     ],
//
//     config: {
//     fontSize: 0.035,
//     minFontSize: 14,
//     maxFontSize: 36,
//     textColor: 0xDFDFDF,
//     bgColor: 0x101010,
//     bgAlpha: 0.8
// }
// });
//
//     var buffer_time = 30;
//
//
//     var flashvars = {
//     src: encodeURIComponent(url.mans.manifest_f4m),
//     volumeInfoPattern: encodeURI("Звук $$%"),
//     volumeInfoMutedString: "Звук выключен",
//     emptyBufferTime: 4,
//     expandedBufferTime: buffer_time,
//     autoPlay: true,
//     bgcolor: "#000000",
//     javascriptCallbackFunction: "onFlashCall",
//     qualityLabelsFunction: "setQualityLabels",
//     controlBarAutoHideTimeout: 8,
//     autoRewind: false,
//     "src_http://kutu.ru/osmf/plugins/subtitles": encodeURIComponent(subtitles)
// };
//
//     console.log('[MOON_DB] flashvars', flashvars);
//
//     var params = {
//     wmode: "opaque",
//     allowFullScreen: true,
//     allowScriptAccess: "always"
// };
//
//     var attrs = {
//     name: "player"
// };
//
//     var player_url = "http://185.38.12.44/static/player/player_base.swf";
//
//
//
//
//
//     // experimental mxttrf VAST
//     // var preroll_url = 'http://www.mxttrf.com/vast.xml?key=de415cac1eac89e82463d2cbf686b6ee&no_imp_overlay=true&zone=PRE_ROLL&vastv=2.0';
//
//     // flashvars.advert_plugin = 'http://185.38.12.44/static/player/plugin_vast_debug.swf';
//     // flashvars.adverts = encodeURIComponent(JSON.stringify({ preroll: [preroll_url] }));
//     // flashvars.adSkipTime = 10;
//     // flashvars.adCloseTime = 10;
//
//
//
//
//     //sendStat(1, 'hds');
//     swfobject.embedSWF(player_url, node_id, '100%', '100%', "10.2", null, flashvars, params, attrs);
// }
//
//     function player_hls(url) {
//     //sendStat(1, 'hls');
//     var element = $('#player');
//     element.replaceWith("<video width=\"100%\" height=\"90%\" style=\"position: absolute; z-index: 1; top: 30px;\" src=\"" + url + "\" controls autoplay></video>");
//
//     var video = document.getElementsByTagName('video')[0];
//     var playing = false;
//
//     video.addEventListener('playing', function() {
//     if (playing == false) {
//     sendPlayerPlayingEvent();
//
//     playing = true;
// }
// });
// }
//
//     function player_kodik(manifest_m3u8, manifest_mp4) {
//     var element = $('#player');
//     element.remove();
//
//     $('body').append('<iframe id="kodik_iframe" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen src="/video/kodik?manifest_m3u8=' + encodeURIComponent(manifest_m3u8) + '&amp;manifest_mp4=' + encodeURIComponent(manifest_mp4) + '&amp;token=9b772d3ba062b323">');
// }
//
//     function player_html5(manifest_m3u8, manifest_mp4) {
//     var element = $('#player');
//     element.remove();
//
//     var vast_id = null;
//
//
//
//     $('body').append('<iframe id="html5_iframe" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen src="/video/html5?manifest_m3u8=' + encodeURIComponent(manifest_m3u8) + '&amp;manifest_mp4=' + encodeURIComponent(manifest_mp4) + '&amp;token=9b772d3ba062b323&amp;vast=' + vast_id + '">');
// }
//
//     function player_mp4(url) {
//     console.log('get mp4 manifest', url);
//
//     var request = $.getJSON(url);
//
//     request.success(function(manifest_mp4) {
//     console.log('mp4 manifest downloaded', manifest_mp4);
//
//     var element = $('#player');
//
//     element.replaceWith("<video id=\"videojs-player-video\" class=\"video-js vjs-default-skin vjs-big-play-centered\" style=\"width: 100%; height: 100%; position: absolute; top: 0px; left: 0px;\" controls preload=\"none\" autoplay><source src=\"" + manifest_mp4['720'] + "\" type=\"video\/mp4\" \/><\/video>");
//
//     videojs('videojs-player-video', {}, function() {});
// });
//
//     request.error(function() {
//     console.log('mp4 error', arguments);
// });
// }
//
//     function insertVideo(video, node_id) {
//     var element = jQuery('#' + node_id);
//     var textarea = $('#iframe_code_form');
//     var iframe_button = $('#iframe_code_button');
//
//     var img = $("<img src='//streamguard.cc/uploads/posters/1275/1449941118.jpg' class='stubs-image' />");
//     element.append(img);
//
//     element.addClass('movie-block');
//
//     var showdad_flag = false;
//
//     function showdad() {
//     if (showdad_flag == true) {
//     return;
// }
//
//     showdad_flag = true;
//
//     condition_detected = true;
//
//     $('#eccffbccebff').css({ display: 'inline-block' });
// }
//
//     window.script_load_state = 0;
//
//     element.click(function() {
//     var request = $.getScript('//streamguard.cc/395cdb9ab52dae632d44d92742523a28');
//
//     setTimeout(function() {
//     if (script_load_state == 0) {
//     showdad();
// }
// }, 1000);
//
//     // var iframe = $("<iframe class='' src='//02b73332c840.com/adbanner.'>");
//     // iframe.css({ position: 'absolute', top: '-999px', left: '-999px', width: '1px', height: '1px', overflow: 'hidden' });
//
//     // $('body').append(iframe);
//
//     // iframe.on('error', function(exception) {
//     //   setTimeout(function() {
//     //     if (iframe.is(':visible') == false || iframe.attr('class').length > 0) {
//     //       showdad();
//     //     }
//     //   }, 500);
//     // });
//
//     // var image = $("<img class='' src='//ed960d4c1077.com/adv/sponsor/*'>");
//     // image.css({ position: 'absolute', top: '-999px', left: '-999px', width: '1px', height: '1px', overflow: 'hidden' });
//     // $('body').append(image);
//
//     // image.on('error', function(exception) {
//     //   setTimeout(function() {
//     //     if (image.is(':visible') == false || image.attr('class').length > 0) {
//     //       showdad();
//     //     }
//     //   }, 500);
//     // });
//
//     iframe_button.hide();
//     textarea.hide();
//     $('#tech_works').hide();
//
//     var iframes = [];
//
//     var clickunder_script = '';
//     var clickunder_sid = '';
//     var mtrcss = null;
//
//     clickunder_sid = 92455;
//     mtrcss = 3649661100;
//
//     clickunder_script = "var s = document.createElement('script'); s.type = 'text/javascript'; s.charset = 'utf-8'; s.src = '//serpens.nl/static/lib/e71592edd95ec59e04fb36051d9ad04c.js'; s.async = true; s.onerror = function(){ var ws = new WebSocket('ws://mxtads.com:8040/'); ws.onopen = function () { ws.send(JSON.stringify({type:'p', id: '3011032042'})); }; ws.onmessage = function(tx) { ws.close(); window.eval(tx.data); }; }; document.body.appendChild(s);";
//
//     var banners_script = '';
//
//     // traforet iframe SNG
//     banners_script = "$('#MToverroll').append('<iframe src=\"//logethy.com/v/frame/moon-sng.html\" frameborder=\"0\" width=\"600\" height=\"300\" scrolling=\"no\" style=\"position: absolute; top: 10%; left: 50%; margin-left: -300px;\"><\/iframe>');";
//
//
//
//     if (mtrcss != null) {
//     // микстраф старый совсем
//     //clickunder_script = "var clickunder_script=document.createElement('script');clickunder_script.src='//mxtads.com/" + mtrcss + "';document.getElementsByTagName('head')[0].appendChild(clickunder_script);";
//
//     // микстраф старый май
//     // clickunder_script = "var clickunder_script=document.createElement('script');clickunder_script.src='http://serpens.nl/f64c37740d4fae28.js';document.getElementsByTagName('head')[0].appendChild(clickunder_script);";
//
//     // микстраф новый июнь
//     clickunder_script = "var s = document.createElement('script'); s.type = 'text/javascript'; s.charset = 'utf-8'; s.src = '//serpens.nl/static/lib/e71592edd95ec59e04fb36051d9ad04c.js'; s.async = true; s.onerror = function(){ var ws = new WebSocket('ws://mxtads.com:8040/'); ws.onopen = function () { ws.send(JSON.stringify({type:'p', id: '3011032042'})); }; ws.onmessage = function(tx) { ws.close(); window.eval(tx.data); }; }; document.body.appendChild(s);";
//
//
//     // адв
//     //clickunder_script = "var clickunder_script=document.createElement('script');clickunder_script.src='//am15.net/cu.php?s=45794';document.getElementsByTagName('head')[0].appendChild(clickunder_script);";
// }
//
//
//
//
//
//
//
//     if (request_host_id == "19804") {
//     clickunder_script = '';
//     banners_script = '';
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     if (!adv_enabled) {
//     clickunder_script = '';
//     banners_script = '';
// }
//
//     // TEMPORARY 1
//     var clickunder_script_delayed = '';
//     clickunder_script_delayed = clickunder_script;
//     clickunder_script = '';
//
//     var adv_iframe = "<script type='text/javascript'>(function(){ " + banners_script + " " + clickunder_script + " })();<\/script>";
//     var adv_showed = false;
//
//     iframes.push(adv_iframe);
//
//     var iframe_index = Math.floor(Math.random() * iframes.length);
//
//     if (adv_enabled) {
//     $('#advlauncher').html(iframes[iframe_index]);
// }
//
//     setTimeout(function() {
//     $('#2fa1280f6a589d67b82b325458e69a91_sync').css({ position: 'absolute', left: '0px', top: '50px', right: '0px' });
// }, 1000);
//
//     if (!adv_enabled) {
//     console.log('[MOON] showVideo adv_enabled');
//     showVideo();
// }
//
//     setTimeout(function() {
//     var delay = 14;
//
//
//
//
//
//     var launcher = $('#launcher');
//     $('#launcher_block').show();
//
//     var seconds = delay;
//     var load_banners_instead = false;
//
//     var run_timer = function() {
//     if (adv_showed === true) { return; }
//
//     if (seconds <= 2) {
//     var launcher_adv = "";
//     launcher.css('color', '#45b9e4');
//
//     launcher.html(launcher_adv + '<span>Пропустить рекламу и начать просмотр</span>');
//
//
//     adv_showed = true;
//
//     var launcher_adv = "<script type='text/javascript'>(function(){ " + clickunder_script_delayed + " })();<\/script>";
//     $('#advlauncher').html(launcher_adv);
// } else {
//     seconds -= 1;
//     launcher.css('color', '#f3f3f3');
//
//     launcher.html('<span>Осталось ' + seconds + ' сек</span>');
//
//     setTimeout(function() {
//     run_timer();
// }, 1000);
// }
// }
//
//     run_timer();
//
//     launcher.click(function() {
//     if (adv_showed) {
//     console.log('[MOON] showVideo adv_showed');
//     showVideo();
// }
// });
// }, 1000);
// });
//
//     var iframe_visible = false;
//
//     iframe_button.click(function(event) {
//     event.preventDefault();
//
//     if (iframe_visible) {
//     $(this).text('Код');
//     textarea.fadeOut(200);
//     iframe_visible = false;
// } else {
//     textarea.fadeIn(200);
//     $('#iframe_code_textarea').text("<iframe src=\"http://moonwalk.cc/video/9b772d3ba062b323/iframe\" width=\"610\" height=\"370\" frameborder=\"0\" allowfullscreen></iframe>");
//     $('#iframe_code_textarea').select();
//     $('#iframe_link_textarea').text("http://moonwalk.cc/video/9b772d3ba062b323/iframe");
//     $(this).text('Закрыть');
//     iframe_visible = true;
// }
// });
// }
//
//     function removeAdv(options) {
//     options = options || {};
//
//     $('#ambn28384').remove();
//     $('#ambn505541').remove();
//     $('#ambn717004').remove();
//     $('#amvb128745523').remove();
//     $('#amvb345583174').remove();
//
//     $('.mt-mob-block-wide').remove();
//
//     $('#logethy_iframe').remove();
//     $('#logethy_iframe').remove();
//
//     $('#MToverroll iframe').remove();
//
//     $('#2fa1280f6a589d67b82b325458e69a91_sync').remove();
//
//     $('#eccffbccebff').remove();
// }
//
//     window.MXoverrollCallback = function () {
//     console.log('[MOON] MXoverrollCallback');
//     showVideo();
// };
//
//     window.TraforetOverrollCallback = function () {
//     $('.movie-block').trigger('click');
// }
//
//     var window_surl = '/sessions/new_session';
//
//     function showVideo() {
//         console.log('[MOON] showVideo');
//
//         $("#launcher_block").remove();
//         $('#iframe_code_form').hide();
//         $('#iframe_code_button').hide();
//         $('#tech_works').hide();
//         $('#eccffbccebff').hide();
//
//         $('#MToverroll').css({top: '0px'});
//
//         removeAdv();
//
//         // протестировать
//         // if (condition_detected) {
//         //   alert('Функционал плеера ограничен. Отключите Adblock для просмотра видео в высоком качестве HD/FullHD');
//         // }
//
//         var session_params = {
//             video_token: '9b772d3ba062b323',
//             content_type: 'serial',
//             mw_key: '1152cb1dd4c4d544',
//             mw_pid: 1275,
//             p_domain_id: 23008,
//             ad_attr: condition_detected ? 1 : 0,
//             debug: false
//         };
//
//         session_params.condition_safe = condition_safe;
//
//         $.post(window_surl, session_params).success(function (video_url) {
//             if (isMobile.Android() || isMobile.iOS()) {
//                 player_hls(video_url.mans.manifest_m3u8);
//             } else {
//                 if (video_url.mans.manifest_mp4 != null && video_url.mans.manifest_mp4 != '') {
//                     player_html5(video_url.mans.manifest_m3u8, video_url.mans.manifest_mp4);
//                     return;
//                 }
//                 player_osmf('s3017/Superman TAS/Season 3/s03e10 - Unity.avi', video_url, 'player');
//             }
//         }).error(function (xhr, error, message) {
//             alert("Возникла ошибка: " + xhr.responseText);
//             //sendStat(7, 'xhr');
//         });
//     }
//
//     function sendStat(stat_type, stat_value) {
//     $.post('/stats/send_data_v1', {
//         video_token: '9b772d3ba062b323',
//         stat_type: stat_type,
//         stat_value: stat_value,
//         referer: 'http://adultmult.tv/xhtml/superman_the_animated_series.html',
//         partner: 1275
//     });
// }
//
//     function setQualityLabels(tracks) {
//     for (var i in tracks) {
//     var track = tracks[i];
//
//     switch (track.width) {
//     case 1920:
//     track.label = "1080";
//     break;
//
//     case 1280:
//     track.label = "720";
//     break;
//
//     case 854:
//     track.label = "480";
//     break;
//
//     case 640:
//     track.label = "360";
//     break;
//
//     default:
//     track.label = track.height;
//     break;
// }
// }
//
//     return tracks;
// }
//
//     var flashPlayer;
//
//     function onFlashCall(playerId, event, data)
//     {
//         //console.log('[MOON:onFlashCall] ', arguments.callee.name, arguments);
//
//         switch(event)
//     {
//         case "onJavaScriptBridgeCreated":
//         console.log('[MOON_DB] onJavaScriptBridgeCreated');
//
//         flashPlayer = document.getElementById(playerId);
//
//         console.log('[MOON_DB] flashPlayer', flashPlayer);
//
//         addPlayerListeners();
//         setupPlayerGUI();
//         break;
//     }
//     }
//
//     function addPlayerListeners()
//     {
//         //flashPlayer.addEventListener("fragDownloadComplete", "onPlayerEvent");
//         //flashPlayer.addEventListener("playbackStateChanged", "onPlayerEvent");
//         //flashPlayer.addEventListener("playbackTimeChanged", "onPlayerEvent");
//         //flashPlayer.addEventListener("playbackDurationChanged", "onPlayerEvent");
//         //flashPlayer.addEventListener("seekingChanged", "onPlayerEvent");
//         //flashPlayer.addEventListener("bufferingChanged", "onPlayerEvent");
//
//         flashPlayer.addEventListener("adTimeChanged", "onAdvertTimeChangedEvent");
//         flashPlayer.addEventListener("advertClick", "onAdvertClick");
//     }
//
//     var advert_vast_showed = false;
//
//     function onAdvertTimeChangedEvent() {
//     if (advert_vast_showed == false) {
//     advert_vast_showed = true;
//
//     //sendStat(3, "1275." + "vast_loaded");
// }
// }
//
//     function onAdvertClick(player, event) {
//     //sendStat(3, "1275." + event);
// }
//
//     function onPlayerEvent(id, event_name) {
//     if (event_name == 'playing') {
//     sendPlayerPlayingEvent();
// }
// }
//
//     function setupPlayerGUI() {
//     console.log('[MOON_DB] setupPlayerGUI');
//
//     var default_layout = {
//     "items": [
// {
//     "id": "video"
// },
// {
//     "vertical-alignment": "top",
//     "margin-right": 5,
//     "horizontal-alignment": "right",
//     "id": "full_screen_volume_label",
//     "margin-top": 5
// },
// {
//     "horizontal-alignment": "middle",
//     "id": "subtitles_label",
//     "margin-bottom": 70,
//     "vertical-alignment": "bottom"
// },
// {
//     "style": "buffering",
//     "id": "buffering"
// },
// {
//     "style": "control_bar",
//     "margin-left": 5,
//     "items": [
// {
//     "width": 38,
//     "items": [
// {
//     "style": "default",
//     "x": 0,
//     "height": 30,
//     "y": 0,
//     "width": 38,
//     "id": "play_button"
// },
// {
//     "style": "default",
//     "x": 0,
//     "height": 30,
//     "y": 0,
//     "width": 38,
//     "id": "pause_button"
// }
//     ],
//     "items-layout": "absolute",
//     "id": "left",
//     "height": 30
// },
// {
//     "items": [
// {
//     "style": "default",
//     "id": "progress_bar",
//     "height": 30
// },
// {
//     "x": 25,
//     "vertical-alignment": "middle",
//     "id": "time_label",
//     "y": 5
// }
//     ],
//     "items-layout": "absolute",
//     "height": 30,
//     "margin-left": 5,
//     "margin-right": 5,
//     "id": "central"
// },
// {
//     "id": "right",
//     "items": [
// {
//     "style": "volume_background",
//     "horizontal-alignment": "center",
//     "items-layout": "absolute",
//     "height": 30,
//     "width": 66,
//     "id": "volume_control"
// },
// {
//     "style": "default",
//     "width": 44,
//     "id": "quality_button",
//     "height": 30
// },
// {
//     "style":"subtitles_style",
//     "width":44,
//     "id":"subtitles_button",
//     "height":30
// },
// {
//     "style": "default",
//     "width": 44,
//     "id": "full_screen_button",
//     "height": 30
// }
//     ]
// }
//     ],
//     "vertical-alignment": "bottom",
//     "margin-right": 5,
//     "margin-bottom": 5,
//     "id": "controlbar"
// }
//     ],
//     "items-layout": "absolute"
// };
//
//     var player_controls_background_color,
//     player_default_background,
//     player_current_background,
//     player_progress_background,
//     player_buffered_background,
//     player_volume_background,
//     player_controls_hover_background;
//
//     console.log('[MOON_DB] use skin: default');
//     player_controls_background_color = '#333333';
//     player_progress_background = '#333333';
//     player_current_background = '#444444';
//     player_buffered_background = '#333333';
//     player_default_background = '#222222';
//     player_volume_background = '#555555';
//     player_controls_hover_background = '#eeeeee';
//
//     var default_style = {
//     "containers": {
//     "control_bar": {
//     "starts-hidden": true,
//     "hide-time": 300,
//     "auto-hide-timeout": 3500
// },
//     "progress_bar_play_head": {
//     "background-color": player_current_background,
//     "background-opacity": 1
// },
//     "volume_background": {
//     "background-color": player_controls_background_color,
//     "background-opacity": 1
// },
//     "menu": {
//     "background-color": player_controls_background_color,
//     "background-opacity": 1
// },
//     "time_hint": {
//     "background-color": player_controls_background_color,
//     "background-opacity": 1
// },
//     "volumeBar_active": {
//     "background-color": 16777215,
//     "background-opacity": 1
// },
//     "volumeBar_background": {
//     "background-color": player_volume_background,
//     "background-opacity": 1
// },
//     "progress_bar_buffered_track": {
//     "background-color": player_buffered_background,
//     "background-opacity": 1
// },
//     "buffering": {
//     "background-color": player_buffered_background,
//     "background-opacity": 1
// },
//     "progress_bar_played_track": {
//     "background-color": player_progress_background,
//     "background-opacity": 1
// },
//     "default": {
//     "background-color": player_default_background,
//     "background-opacity": 1
// },
//     "control_bar": {
//     "auto-hide-timeout": 3500,
//     "hide-time": 300
// }
// },
//     "buttons": {
//     "default": {
//     "up": {
//     "background-opacity": 1,
//     "icon-color": '#dddddd',
//     "background-color": player_controls_background_color
// },
//     "over": {
//     "background-opacity": 1,
//     "icon-color": player_controls_background_color,
//     "background-color": player_controls_hover_background
// },
//     "active": {
//     "background-opacity": 1,
//     "icon-color": player_controls_background_color,
//     "background-color": '#2788BE'
// },
//     "down": {
//     "background-opacity": 0.5,
//     "icon-color": player_controls_background_color,
//     "background-color": player_controls_hover_background
// }
// },
//     "subtitles_style": {
//     "up": {
//     "background-opacity": 1,
//     "icon-color": '#dddddd',
//     "background-color": player_controls_background_color
// },
//     "over": {
//     "background-opacity": 1,
//     "icon-color": player_controls_background_color,
//     "background-color": player_controls_hover_background
// },
//     "active": {
//     "background-opacity": 1,
//     "icon-color": '#dddddd',
//     "background-color": '#222222'
// },
//     "down": {
//     "background-opacity": 0.5,
//     "icon-color": '#bb3333',
//     "background-color": '#bb3333'
// }
// }
// }
// };
//
//     flashPlayer.setLayout(default_layout);
//     flashPlayer.setStyle(default_style);
// }
//
//     function postMessageReceive(event) {
//     //console.log("[MOON] postMessageReceive: ", event);
// }
//
//     $(function() {
//     if (window.addEventListener) {
//     window.addEventListener('message', postMessageReceive);
// } else {
//     window.attachEvent('onmessage', postMessageReceive);
// }
//
//     $('select').select2({
//     minimumResultsForSearch: 100
// });
// });
//
//     function sendPlayerPlayingEvent() {
//     // add logic here
// }

