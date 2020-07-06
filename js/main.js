var _userData;
var _gameID = 999;
var _tokensToPlay = 1;
var gameJSONs = gameJsons;
var hit;
var monkey;
var knife;
var clown;
var monkey;
var balance;
var balanceTS;
var torchs;
var environment;
var winningScreen;
var startButton;
var againButton;
var celebration10;
var isMuted = false;
var preSound, soundMusic, hit, knife1, knife2, knife3, crowd;
var playID;
var loading;
var i = 0; i2= 0;
var valToken;
var tokensJAnim;


function init(){
	
    preSound    = document.getElementById('pre-sound');
    soundMusic  = document.getElementById('sound-music');
    hit         = document.getElementById('hit');
    knife1      = document.getElementById('knife1');
    knife2      = document.getElementById('knife2');
    knife3      = document.getElementById('knife3');
    crowd       = document.getElementById('crowd');

    preSound.loop = true
    preSound.play()

    $('#play-again').hide()
    $('#games').hide();
	$('.layer').css({
	    height: ($('.layer').width() * 720 / 720) + "px", 
        maxHeight: window.innerHeight + "px",
        maxWidth: ($(window).height() * 720 / 720) + "px"
    })

    $('.super-container').css({
        maxWidth: ($(window).height() * 720 / 720) + "px"
    })

    var tokensJ = {
        container: document.getElementById("tokens-amount"),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.tokensToPlay
    }

    tokensJAnim = lottie.loadAnimation(tokensJ)
    tokensJAnim.addEventListener("DOMLoaded", function() {
        
         tokensJAnim.renderer.elements[0].updateDocumentData({t: slider.value+"", s:120});
        //tokensJAnim.play()
    });

    $.ajax({
        type: "POST", 
        url: "https://everesttest.snowfly.com/gameapi/v1/getStartInfo", 
        data: { gameId: _gameID },
        success: function( data ) {
           _userData = data;
           if (_userData.tokenBalance == 0){ 
           		$('#no-tokens-screen').css({display: 'block', zIndex: 999}) 
           }
            gameJSONs.balanceTS.layers[0].t.d.k[0].s.t = _userData.pointBalance+"";
            gameJSONs.balanceTS.layers[1].t.d.k[0].s.t = _userData.tokenBalance+"";
            var balanceTSAnim = lottie.loadAnimation(balanceTS)
              if(_userData.status == 0){
                $('#t-s').text(_userData.message)
                $('#no-server-request').fadeIn()
                }
        }
    });

        balanceTS = {
        container: document.getElementById("balance-ts"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.balanceTS
    }

        $('.sound-toggle').click(function(){
        hit.play()
        isMuted = !isMuted
        setSoundSettings()
    })

    var startButton = {
        container: document.getElementById("start-button"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.startButton
    }
    var startButtonAnim = lottie.loadAnimation(startButton)
    startButtonAnim.play()

        var flag = {
        container: document.getElementById("flag"),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.flag
    }
    var flagAnim = lottie.loadAnimation(flag)
    flagAnim.play()
    $('#loading-screen').fadeOut()

     var startScreen = {
        container: document.getElementById("start-screen"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.startScreen
    }
    var startScreenAnim = lottie.loadAnimation(startScreen)
    startScreenAnim.play()

    if(window.location.href.match("no-init") != null){
        isMuted = (getParameterByName('isMuted') == 'true');
        setSoundSettings()
        startButtonAnim.playSegments([1, 10], true)
        $('#init-screen').fadeOut(function(){
            setupInitLayers()
        })
    }

    $('#start-button').click(function(){
        $(this).addClass('disabled')
        hit.play()
        $('#bar').css({zIndex: 102})
        startButtonAnim.playSegments([1, 10], true)
        $('#start-screen').fadeOut(function(){
             $('#s-layer').addClass('disabled')
            $('#start-button').fadeOut()
            setupInitLayers()
        })
    })

     slider = document.getElementById('myRange');
    var inputSlider = document.getElementsByTagName('input');

    slider.oninput = function() {
      tokensJAnim.renderer.elements[0].updateDocumentData({t: this.value+"", s: 30});
         tokensJAnim.play();
    }

    slider.addEventListener('mousemove', function(){
      var x = slider.value * 100 / 250;
      var color = 'linear-gradient(90deg, rgb(117,252,117)' + x + '%, rgb(214,214,214)' + x + '%)';
      slider.style.background = color;
    })

    slider.addEventListener('touchmove', function(){
        var x = slider.value * 100 / 250;
        var color = 'linear-gradient(90deg, rgb(117,252,117)' + x + '%, rgb(214,214,214)' + x + '%)';
        slider.style.background = color;
      })

      inputSlider.addEventListener('touchmove', function(){
        var x = slider.value * 100 / 250;
        var color = 'linear-gradient(90deg, rgb(117,252,117)' + x + '%, rgb(214,214,214)' + x + '%)';
        slider.style.background = color;
      })


}


function setUpWinning(){

    i2 = 1;
    gameJSONs.balance.layers[0].t.d.k[0].s.t = parseInt(slider.value)+"";
    gameJSONs.balance.layers[1].t.d.k[0].s.t = _userData.tokenBalance+"";
    
    gameJSONs.clown.layers[0].ef[playID-1].ef[0].v.k = 1
    gameJSONs.clown[playID-1];
    
    gameJSONs.environment.layers[0].ef[playID-1].ef[0].v.k = 1
    gameJsons.environment[playID-1];

    gameJSONs.balance.layers[2].ef[playID-1].ef[0].v.k = 1
    gameJsons.balance[playID-1];

    gameJSONs.torchs.layers[0].ef[playID-1].ef[0].v.k = 1
    gameJSONs.torchs[playID-1];

    gameJSONs.winningScreen.layers[0].ef[playID-1].ef[0].v.k = 1



    if (_tokensToPlay >= 1 && _tokensToPlay <= 99){
        gameJSONs.monkey.assets[0].layers[0].ef[0].ef[0].v.k = 1;
        gameJSONs.knife.layers[0].ef[0].ef[0].v.k = 1; //el segundo ef es el checkbox

        gameJSONs.winningScreen.layers[1].ef[0].ef[0].v.k = 1  //1cuchillo;
        gameJSONs.winningScreen.layers[1].ef[1].ef[0].v.k = 0  //2cuchillo;
        gameJSONs.winningScreen.layers[1].ef[2].ef[0].v.k = 0  //3cuchillo; 

        gameJSONs.winningScreen.layers[4].t.d.k[0].s.t = __tokensResponse.totalPoints+""

         gameJSONs.winningScreen.layers[2].t.d.k[0].s.t = parseInt(slider.value)+"";
         gameJSONs.winningScreen.layers[3].t.d.k[0].s.t = __tokensResponse.totalPoints+"" 
    }

    if (_tokensToPlay >= 100 && _tokensToPlay <= 199){

        var pt1 = 0; var pt2 = 0;

        pt1 = Math.floor(Math.random() * (0, __tokensResponse.totalPoints));
        pt2 = __tokensResponse.totalPoints - pt1;

        gameJSONs.monkey.assets[0].layers[0].ef[0].ef[0].v.k = 1;
        gameJSONs.monkey.assets[0].layers[0].ef[1].ef[0].v.k = 1;
        gameJSONs.knife.layers[0].ef[0].ef[0].v.k = 1; //el segundo ef es el checkbox
        gameJSONs.knife.layers[0].ef[1].ef[0].v.k = 1;

        gameJSONs.winningScreen.layers[1].ef[0].ef[0].v.k = 1  //1cuchillo;
        gameJSONs.winningScreen.layers[1].ef[1].ef[0].v.k = 1  //2cuchillo;
        gameJSONs.winningScreen.layers[1].ef[2].ef[0].v.k = 0  //3cuchillo; 
 
        gameJSONs.winningScreen.layers[4].t.d.k[0].s.t = pt1.toString();
        gameJSONs.winningScreen.layers[5].t.d.k[0].s.t = pt2.toString();

        gameJSONs.winningScreen.layers[2].t.d.k[0].s.t = parseInt(slider.value)+"";
        gameJSONs.winningScreen.layers[3].t.d.k[0].s.t = __tokensResponse.totalPoints+""
    }

    if (_tokensToPlay >= 200 && _tokensToPlay <= 250){

        var pt1 = 0; var pt2 = 0; var pt3 = 0; var ptrest= 0;

        pt1 = Math.floor(Math.random() * (0, __tokensResponse.totalPoints));
        pt2 = Math.floor(Math.random() * (0, __tokensResponse.totalPoints - pt1));
        pt3 = __tokensResponse.totalPoints - pt1 - pt2;

        gameJSONs.monkey.assets[0].layers[0].ef[0].ef[0].v.k = 1;
        gameJSONs.monkey.assets[0].layers[0].ef[1].ef[0].v.k = 1;
        gameJSONs.monkey.assets[0].layers[0].ef[2].ef[0].v.k = 1;

        gameJSONs.knife.layers[0].ef[0].ef[0].v.k = 1; //el segundo ef es el checkbox
        gameJSONs.knife.layers[0].ef[1].ef[0].v.k = 1;
        gameJSONs.knife.layers[0].ef[2].ef[0].v.k = 1;

        gameJSONs.winningScreen.layers[1].ef[0].ef[0].v.k = 1  //1cuchillo;
        gameJSONs.winningScreen.layers[1].ef[1].ef[0].v.k = 1  //2cuchillo;
        gameJSONs.winningScreen.layers[1].ef[2].ef[0].v.k = 1  //3cuchillo; 

        gameJSONs.winningScreen.layers[4].t.d.k[0].s.t = pt1.toString()
        gameJSONs.winningScreen.layers[5].t.d.k[0].s.t = pt2.toString()
        gameJSONs.winningScreen.layers[6].t.d.k[0].s.t = pt3.toString()

        gameJSONs.winningScreen.layers[2].t.d.k[0].s.t = parseInt(slider.value)+"";
        gameJSONs.winningScreen.layers[3].t.d.k[0].s.t = __tokensResponse.totalPoints+""

       // gameJSONs.winningScreen.layers[0].t.d.k[0].s.t = __tokensResponse.totalPoints+""
    }

    

    setTimeout(function(){

            knife = {
        container: document.getElementById("knife"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.knife
    }

    var knifeAnim = lottie.loadAnimation(knife)
    knifeAnim.play();


    }, 6700)
    
    balance = {
        container: document.getElementById("balance"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.balance
    }

    var balanceAnim = lottie.loadAnimation(balance)
    balanceAnim.play();

    
        monkey = {
        container: document.getElementById("monkey"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.monkey
    }

    var monkeyAnim = lottie.loadAnimation(monkey)
    monkeyAnim.play();

        torchs = {
        container: document.getElementById("torchs"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.torchs
    }

    var torchsAnim = lottie.loadAnimation(torchs)
    torchsAnim.play();

        clown = {
        container: document.getElementById("clown"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.clown
    }

    var clownAnim = lottie.loadAnimation(clown)
    clownAnim.play();

    environment = {
        container: document.getElementById("environment"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.environment
    }

        var environmentAnim = lottie.loadAnimation(environment)
    environmentAnim.play();


            setTimeout(function(){
            winningScreen = {
            container: document.getElementById("wininng-screen"),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
                progressiveLoad:false
            },

            animationData: gameJSONs.winningScreen
        }

        var winningScreenAnim = lottie.loadAnimation(winningScreen)
        winningScreenAnim.play();  
            playAgain()
        },8500)

            setTimeout(function(){
                $('#play-again').fadeIn()
            }, 15000)

    if (playID == 10){
            setTimeout(function(){

            celebration10 = {
            container: document.getElementById("celebration10"),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            rendererSettings: {
                progressiveLoad:false
            },

            animationData: gameJSONs.celebration10
        }

        var celebration10Anim = lottie.loadAnimation(celebration10) 
         celebration10Anim.play();  
        },8500)
        if (i == 0) {
            i++
             setTimeout(function(){
            crowd.play();
                    },14000)
        }
    }
}

function setupInitLayers(){
    var monkeyButton = {
        container: document.getElementById("monkey-button"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: {"v":"4.10.1","fr":24,"ip":0,"op":12,"w":250,"h":100,"nm":"Play_B","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"PLAY","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-31.506,325.509,0],"ix":2},"a":{"a":0,"k":[2.079,-69.7,0],"ix":1},"s":{"a":0,"k":[111.016,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[4.198,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-1.967,1.542],[0,3.319],[1.927,1.594]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[4.065,0],[1.966,-1.542],[0,-3.319],[-1.927,-1.594]],"v":[[-38.451,-83.401],[-47.955,-83.401],[-47.955,-56],[-43.282,-56],[-43.282,-64.036],[-38.372,-64.036],[-29.323,-66.349],[-26.373,-73.64],[-29.264,-81.01]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[2.587,0],[0,0],[0,0],[0,0],[-1.188,-0.784],[0,-1.894],[0.937,-0.98]],"o":[[0,0],[0,0],[0,0],[2.534,0],[1.188,0.784],[0,1.895],[-0.937,0.98]],"v":[[-37.857,-68.23],[-43.282,-68.23],[-43.282,-79.206],[-38.53,-79.206],[-32.947,-78.03],[-31.165,-74.012],[-32.57,-69.7]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"P","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-3.564,-56],[-3.564,-60.39],[-16.196,-60.39],[-16.196,-83.401],[-20.869,-83.401],[-20.869,-56]],"c":true},"ix":2},"nm":"L","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"L","np":2,"cix":2,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[19.325,-62.233],[22.097,-56],[27.086,-56],[14.89,-83.401],[9.9,-83.401],[-2.297,-56],[2.693,-56],[5.465,-62.233]],"c":true},"ix":2},"nm":"A","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[7.366,-66.506],[12.395,-77.795],[17.424,-66.506]],"c":true},"ix":2},"nm":"A","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"A","np":3,"cix":2,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[41.817,-66.819],[52.113,-83.401],[47.005,-83.401],[39.441,-70.935],[31.878,-83.401],[26.769,-83.401],[37.065,-66.819],[37.065,-56],[41.817,-56]],"c":true},"ix":2},"nm":"Y","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Y","np":2,"cix":2,"ix":4,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Mask","parent":4,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,325.749,0],"ix":2},"a":{"a":0,"k":[-28.263,325.749,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":20,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Circle","parent":4,"tt":1,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.51],"y":[1]},"o":{"x":[0.49],"y":[0]},"n":["0p51_1_0p49_0"],"t":0,"s":[0],"e":[33]},{"i":{"x":[0.51],"y":[1]},"o":{"x":[0.49],"y":[0]},"n":["0p51_1_0p49_0"],"t":4.714,"s":[33],"e":[0]},{"t":12}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,324.21,0],"ix":2},"a":{"a":0,"k":[-5,7,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.51,0.51,0.51],"y":[1,1,1]},"o":{"x":[0.49,0.49,0.49],"y":[0,0,0]},"n":["0p51_1_0p49_0","0p51_1_0p49_0","0p51_1_0p49_0"],"t":1.571,"s":[0,0,100],"e":[215.777,265.571,100]},{"t":10}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[140,140],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-5,7],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Button","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[127,84.467,0],"ix":2},"a":{"a":0,"k":[-28.263,361.677,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":0,"s":[90.077,100,100],"e":[83,92.143,100]},{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":5,"s":[83,92.143,100],"e":[90.077,100,100]},{"t":11}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":55,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.305499147901,0.580392156863,0.184359860888,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.117647058824,0.780392156863,0.36862745098,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Button 2","parent":4,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-28.263,331.774,0],"ix":2},"a":{"a":0,"k":[-28.263,325.749,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":0,"s":[100.426,100.426,100],"e":[92.536,92.536,100]},{"i":{"x":[0.44,0.44,0.44],"y":[1,1,1]},"o":{"x":[0.56,0.56,0.56],"y":[0,0,0]},"n":["0p44_1_0p56_0","0p44_1_0p56_0","0p44_1_0p56_0"],"t":5,"s":[92.536,92.536,100],"e":[100.426,100.426,100]},{"t":11}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[249.102,71.856],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":55,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":0,"k":[0.305499147901,0.580392156863,0.184359860888,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.011626296885,0.494117647059,0.195029434503,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-28.263,325.749],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":12,"st":0,"bm":0}]}
    }
    var monkeyButtonAnim = lottie.loadAnimation(monkeyButton);
    monkeyButtonAnim.playSegments([0, 2], true);

    $('#monkey-button').click(function(){
        $(this).addClass('disable')
        monkeyButtonAnim.play()
        monkeyButtonAnim.playSegments([3, 13], true);
        $('#init-animations').fadeOut();
        hit.play()
    })

    $('#monkey-button, #play-button').click(function(){
        monkeyButtonAnim.playSegments([3, 13], true)
        $(this).addClass('disabled')
        hit.play()

        $.ajax({
            type: "POST", 
            url: "https://everesttest.snowfly.com/gameapi/v1/playGame", 
            data: { tokens: slider.value, gameId: _gameID },
            success: function( data ) {

                preSound.pause()
                
                playID = data.playId
                //playID = 10;
                __tokensResponse = data;
                _tokensToPlay = slider.value;
                if (_tokensToPlay >= 1 && _tokensToPlay <= 99){
                    soundMusic.play()
                    knife1.play()
                }
                if (_tokensToPlay >= 100 && _tokensToPlay <= 199){
                    soundMusic.play()
                    knife2.play()
                }
                if (_tokensToPlay >= 200 && _tokensToPlay <= 250){
                    soundMusic.play()
                    knife3.play()
                }

                $('#init-animations').fadeOut()
                    if(i2==0)
                    {
                        setUpWinning()
                    }
            }
        }); 
    })

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setSoundSettings() {
    if(!isMuted) {$('.sound-toggle').attr('src','./assets/img/sound_on.png')}
    else {$('.sound-toggle').attr('src','./assets/img/sound_off.png')}

    preSound.volume    = (isMuted) ? 0 : 1
    soundMusic.volume  = (isMuted) ? 0 : 1
    hit.volume         = (isMuted) ? 0 : 1
    knife1.volume         = (isMuted) ? 0 : 1
    knife2.volume         = (isMuted) ? 0 : 1
    knife3.volume         = (isMuted) ? 0 : 1
    crowd.volume          = (isMuted) ? 0 : 1
}

function playAgain(){
    $('#play-again').click(function(){
                $(this).addClass('disabled')
                hit.play()
                setTimeout(function(){
                    var mainURL = location.protocol + '//' + location.host + location.pathname
                    window.location.href = mainURL+ "?no-init=true&isMuted=" + isMuted
                    $('#init-screen').hide();
                },500)
            }) 
}

function loading(){

    balanceTS = {
        container: document.getElementById("balance-ts"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.balanceTS
    }

     var loadingScreen = {
        container: document.getElementById("loading-screen"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        rendererSettings: {
            progressiveLoad:false
        },

        animationData: gameJSONs.loadingScreen
    }
    var loadingScreenAnim = lottie.loadAnimation(loadingScreen)
    loadingScreenAnim.play();

    setTimeout(function(){

        init();

    },1000)
    
}