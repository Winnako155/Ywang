const rightView_title = document.getElementById("rightView_title");
const rightView_quotes = document.getElementById("rightView_quotes");
const rightView_time = document.getElementById("rightView_time");
const rightView_date = document.getElementById("rightView_date");
const rightView_timeCapsuleText = document.getElementById("rightView_timeCapsuleText");
const yearProcessText = document.getElementById("yearProcessText");
const yearProcessContent = document.getElementById("yearProcessContent");

// 自定义光标
const customCursor = document.createElement("img");
customCursor.src = "./res/normal.png";
customCursor.id = "customCursor";
customCursor.style.cssText = "position:fixed;pointer-events:none;z-index:9999;display:none; width: 50px; height: 50px;";
document.body.appendChild(customCursor);

// 点击效果
const clickEffect = document.createElement("div");
clickEffect.id = "clickEffect";
clickEffect.style.cssText = "position:fixed;pointer-events:none;z-index:9998;display:none;width:20px;height:20px;border-radius:50%;background:#fff;transform:scale(1.2);opacity:0;transition:transform 0.3s ease, opacity 0.3s ease;";
document.body.appendChild(clickEffect);

function cursor(){
    document.body.style.cursor = "none";
    document.addEventListener("mousemove", (e) => {
        customCursor.style.display = "block";
        customCursor.style.left = e.clientX + "px";
        customCursor.style.top = e.clientY + "px";
        clickEffect.style.left = e.clientX - 10 + "px";
        clickEffect.style.top = e.clientY - 10 + "px";
    });
    document.addEventListener("mousedown", () => {
        clickEffect.style.display = "block";
        clickEffect.style.transform = "scale(1)";
        clickEffect.style.opacity = "0.2";
    });
    document.addEventListener("mouseup", () => {
        clickEffect.style.transform = "scale(2)";
        clickEffect.style.opacity = "0";
    });
}

var isBeginExecuted = false;
var titleAnimationComplete = false;
var quotesAnimationRunning = false;

function begin() {
    if (isBeginExecuted) return;
    isBeginExecuted = true;
    setTimeout(function() {
        if (!quotesAnimationRunning) {
            quotesAnimationRunning = true;
            quotesLoop();
        }
    }, 200);
    getYear();
    getTimeLoop();
    cursor();
    getIssues();
    initPlayer();
}
function quotesLoop(){
    function run() {
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        textInputAnimation(quote, rightView_quotes, 100, function() {
            setTimeout(function() {
                textDeleteAnimation(quote, rightView_quotes, 50, function() {
                    setTimeout(run, 2000);
                });
            }, 5000);
        });
    }
    run();
}
function getTimeLoop(){
    rightView_time.innerHTML = new Date().toLocaleTimeString();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var week = new Date().getDay();
    var weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    rightView_date.innerHTML = year + "年" + month + "月" + day + "日 " + weekMap[week];

    setInterval(() => {
        rightView_time.innerHTML = new Date().toLocaleTimeString();
        rightView_date.innerHTML = year + "年" + month + "月" + day + "日 " + weekMap[week];
    }, 1000);
}
function getYear(){
    rightView_timeCapsuleText.innerHTML = new Date().getFullYear()+ "年已经过去了:";
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysPassed = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    yearProcessContent.style.width = Math.round(daysPassed / 365 * 100) + "%";
    yearProcessText.innerHTML = Math.round(daysPassed / 365 * 100) + "%";
}
function getIssues(){
    const issuesList = document.getElementById("issues");
    issuesList.innerHTML = '';
    getGithubIssues().then(issues => {
        issues.forEach(issue => {
            var li = document.createElement("li");
            li.innerHTML = issue.title;
            issuesList.appendChild(li);
            li.addEventListener("click", () => {
                showDialog(issue.title, issue.context, true);
            });
        });
    });
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

function waitForLoadingComplete() {
    const bgContainer = document.querySelector('.bg-container');
    const mainView = document.getElementById('mainView');
    const loadingScreen = document.getElementById('loading-screen');

    bgContainer.style.animation = 'scale_Background 2s ease forwards';
    mainView.classList.add('animate');

    setTimeout(() => {
        hideLoadingScreen();
        begin();
    }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
    waitForLoadingComplete();
});

function initPlayer(){
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        //autoplay: true, //自动播放
        audio: [
            {
                name: 'DayBreak',
                artist: 'ずんだもん',
                url:
                    'http://music.163.com/song/media/outer/url?id=2714577391.mp3',
                cover:
                    'http://p1.music.126.net/I_TlT6cAh0gSGfOrwBjIMg==/109951171294878501.jpg?param=130y130',
                lrc: 
                    ''
            },
            {
                name: 'Machine Love',
                artist: '重音テト',
                url:
                    'http://music.163.com/song/media/outer/url?id=2632381841.mp3',
                cover:
                    'http://p1.music.126.net/-gJd4suSEU0UNDKAYAlEFA==/109951170004618040.jpg?param=130y130',
                lrc: 
                    ''
            },
            {
                name: 'ネ 土 会 ェ 貝 南 犬 ☆ カ ゞ ん I よ ″ る ノ D A !!',
                artist: 'ずんだもん',
                url:
                    'https://er-sycdn.kuwo.cn/9a469f42e757b1071e28b8ae6cafad9c/69f4c345/resource/30106/trackmedia/M800004LTi7B3fNVE3.mp3',
                cover:
                    'http://p1.music.126.net/jW1nUt7NF86oGpycAFTnTw==/109951171368179820.jpg?param=177y177',
                lrc: 
                    "blob:https://www.gequhai.com/cbe3d401-e09e-4f15-86ee-65316e1ca314"
            },
            {
                name: 'まにまに',
                artist: '初音ミク',
                url:
                    'http://music.163.com/song/media/outer/url?id=1939575649.mp3',
                cover:
                    'http://p1.music.126.net/rZkTrJg5BJZ4_5Fi_yAcrw==/109951167314446463.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'the Hole',
                artist: '足立レイ',
                url:
                    'http://music.163.com/song/media/outer/url?id=2662902611.mp3',
                cover:
                    'http://p1.music.126.net/hIEtfj2Sem9nUfWcVLSRPg==/109951170347903763.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'SHIAWASE FOR YOU!',
                artist: '初音ミク',
                url:
                    'http://music.163.com/song/media/outer/url?id=3336741715.mp3',
                cover:
                    'http://p2.music.126.net/rfTPy7vokQE1fwkt61D5Cw==/109951172551669401.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'どりーむもーど',
                artist: '歌愛ユキ＆音街ウナ',
                url:
                    'http://music.163.com/song/media/outer/url?id=2759783977.mp3',
                cover:
                    'http://p2.music.126.net/g1d9Iy9wK6vRQcrUP_EEQA==/109951172206096569.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'スポットレイト',
                artist: '歌愛ユキ',
                url:
                    'http://music.163.com/song/media/outer/url?id=3339111957.mp3',
                cover:
                    'http://p1.music.126.net/NJqouoVbbX-mWcYu5KfcVQ==/109951172585644050.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'ロストアンブレラ',
                artist: '歌愛ユキ',
                url:
                    'http://music.163.com/song/media/outer/url?id=1417885192.mp3',
                cover:
                    'http://p2.music.126.net/_qrgMQ6dFHi9PVBZoxLqXQ==/109951170987869438.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'ちっちゃな私',
                artist: '重音テト',
                url:
                    'http://music.163.com/song/media/outer/url?id=2084302199.mp3',
                cover:
                    'http://p1.music.126.net/ALUmiB2BBISOBxaSNeSqcQ==/109951169507943723.jpg?param=130y130',
                lrc: 
                    ""
            },
            {
                name: 'どこにもいかない',
                artist: '雨衣',
                url:
                    'http://music.163.com/song/media/outer/url?id=3348575819.mp3',
                cover:
                    'http://p1.music.126.net/7puBKF8GfMYUXVdqCF54XA==/109951172725512201.jpg?param=130y130',
                lrc: 
                    "[00:00:00] どこにもいかない"
            },
    	]
    });
    ap.init();

}