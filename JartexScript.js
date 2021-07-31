
/// api_version=2
var script = registerScript({
    name: "Intave Script|",
    version: "1.0",
    authors: ["FaaatPotato"]
});

//hellom

//Thanks @Anonzme for the functions that are needed for the AutoUpdate! <3 (I got these from ScriptCloud thats sum amazing work!)
//Credits: @liulihaocai made the AutoL I use it bc im laizy ok
//Also thanks to @CzechHek for helping me with problems i had in the past <3
//Thanks to @shurpe - (Get item in Hotbar function <3)

var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook')
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C09 = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var C02 = Java.type("net.minecraft.network.play.server.S02PacketChat");
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var thePlayer = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var DCT = Java.type("net.minecraft.network.login.server.S00PacketDisconnect");
var Regen = Java.type("net.minecraft.network.play.server.S06PacketUpdateHealth");

var FreeCam = moduleManager.getModule("FreeCam");
var Fly = moduleManager.getModule("Fly");
var Reach = moduleManager.getModule("Reach");
var Teleport = moduleManager.getModule("Teleport");
var Spammer = moduleManager.getModule("Spammer");
var ChestStealer = moduleManager.getModule("ChestStealer");

function vClip(d) {
mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + d, mc.thePlayer.posZ);
}

function setTimeout(func, milliseconds) {
    var timer = new Timer("setTimeout", true);
    timer.schedule(function () {
        func();
    }, milliseconds);

    return timer;
}

Math.rad = function(deg) {
    return deg * Math.PI / 180;
}

function r(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setYeet(_yeet) {
	var playerYaw = Math.rad(mc.thePlayer.rotationYaw);
	mc.thePlayer.motionX = _yeet * -Math.sin(playerYaw);
	mc.thePlayer.motionZ = _yeet * Math.cos(playerYaw);
}

var log = "https://raw.githubusercontent.com/FaaatPotato/Scripts/main/changelog.txt";
var url = "https://raw.githubusercontent.com/Really-why-not22/IntaveCore/main/JartexScript.js";
var name = "JartexScript";
var pName = "JartexScript.js";

var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var FileOutputStream = Java.type("java.io.FileOutputStream");
var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");

function getData(url) {
	
    var data = "";
    var connection = new URL(url);
    var http = connection.openConnection();
    http.setRequestMethod("GET");
    http.setRequestProperty("User-Agent", "Mozilla/5.0");
    var stream = http.getInputStream();
    var input = new InputStreamReader(stream, "utf-8");
    var bufferedReader = new BufferedReader(input);
    var inputLine;
    while ((inputLine = bufferedReader.readLine()) != null)
		data += "\n" + inputLine;
    input.close();
    bufferedReader.close();
    return data;
}

function createNewFile(name) {
	var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
	var b = new File(a, "scripts");
	(new File(b, name)).createNewFile();
}

function writeIn(name, msg) {
	try {
		var msg = getData(url);
		var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
		var b = new File(a, "scripts");
		var f = new File(b, name);
		var out = new FileOutputStream(f);
		out.write(msg.getBytes());
		out.close();
	} catch (err) {
		Chat.print("Error: " + err);
	}
}

//not used currently but working script check

function checkScript() {

		var a = new File(mc.mcDataDir, "LiquidBounce-1.8");
		var b = new File(a, "scripts");
        var reader = new BufferedReader(new FileReader(new File(b, pName)));
        var fileData = "";
        var data;
        
        while ((data = reader.readLine()) != null)
        	fileData += "\n" + data;
        	reader.close();
        	
        return fileData;
}

var homeSelected;
var X;
var Y;
var Z;

script.registerModule({
    name: " �IntaveManager|",
    description: "Is config loader and stuff",
    category: "Fun",
    tag: "JS",
    settings: {
        B73: Setting.boolean({
            name: "LoadConfigB73",
            default: false
		}),
        B72: Setting.boolean({
            name: "LoadConfigB72",
            default: false
		}),
        dld: Setting.boolean({
            name: "DownloadCurrent",
            default: false
		}),
        x: Setting.boolean({
            name: " ",
            default: false
		}),
        SetTP: Setting.boolean({
            name: " ",
            default: false
		}),
        TP: Setting.boolean({
            name: "have fun",
            default: false
		}),
        s: Setting.boolean({
            name: " ",
            default: false
		}),
        HomePoint: Setting.text({
            name: "gg",
            default: ""
        }),
        Reset: Setting.boolean({
            name: " ",
            default: false
		}),
        Key: Setting.boolean({
            name: " ",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    });
    module.on("disable", function () {
    commandManager.executeCommands(".config load https://pastebin.com/raw/Dh6Qx2Sa")
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    
    //homepoints
    
    if (packet instanceof C04 && homeSelected == true && module.settings.TP.get() && mc.thePlayer.isInWeb) {
    packet.x = X
    packet.y = Y
    packet.z = Z
    }
    });
    module.on("update", function () {				
    	
    //update, download	
    	
    if (module.settings.dld.get()) {
    createNewFile(name + ".js");	
    writeIn(name + ".js");
    Chat.print(getData(log));
    module.settings.dld.set(false);	
    }	
    	
    //homepoints
    
    if (module.settings.TP.get() && !mc.thePlayer.isInWeb) {
    module.settings.TP.set(false);	
    }	
    	
    if (module.settings.SetTP.get()) {
    X = mc.thePlayer.posX;
    Y = mc.thePlayer.posY;
    Z = mc.thePlayer.posZ;	
    homeSelected = true;	
    module.settings.SetTP.set(false);
    module.settings.HomePoint.set( )
    }	
    
    if (homeSelected == true && mc.thePlayer.posX == X && mc.thePlayer.posZ == Z && module.settings.TP.get()) {
    module.settings.TP.set( );
    if (module.settings.Reset.get()) {
    homeSelected = false;	
    module.settings.HomePoint.set(" ");
    }
    }
   
    //config
    
    if (module.settings.B73.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexB73.txt");
    module.settings.B73.set(false);
    }
    
    if (module.settings.B72.get()) {
    commandManager.executeCommands(".config load https://raw.githubusercontent.com/FaaatPotato/Configs/main/JartexB72.txt");
    module.settings.B72.set(false);
    }
    });
    
    module.on("key", function (e) {
    key = e.getKey();
    if (module.settings.Key.get()) {
    if (key == 210) {
    module.settings.SetTP.set(true);	
    }
    if (key == 211) {
    module.settings.TP.set(true);	
    }
    }
    });
});

var c2;
var c1;

var target;
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');

var SL = ['login'];
var SR = ['register'];
var PW = ['sx72ujak8'];
var sendReminder;

var Y;
var isBoost;
var isBoat;
var sneakPossible;

var combat;

script.registerModule({
    name: " �IntaveSpeed|",
    description: "makes you fast af (feels like you turn black)",
    category: "Fun",
    tag: "JS",
    settings: {
		M: Setting.list({
			name: "Mode",
			default: "TimerHop",
			values: ["TimerHop", "Test"]
		}),
        c: Setting.boolean({
            name: "CancelTimer",
            default: false
		}),
    }

}, function (module) {
    module.on("enable", function () {
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();	
    });
    module.on("disable", function () {
    mc.timer.timerSpeed = 1;
    mc.thePlayer.speedInAir = 0.02;
    });
    module.on("update", function () {

    if (module.settings.M.get() == "TimerHop") {
    if (mc.thePlayer.onGround && thePlayer.isMoving()) {
    combat = false;	
    if (combat == false) {	
    mc.thePlayer.speedInAir = 0.0204;	
    mc.timer.timerSpeed = 1.00;
    } else {
    mc.thePlayer.speedInAir = 0.02
    mc.timer.timerSpeed = 1;
    }
    mc.gameSettings.keyBindJump.pressed = true;
    } else {
    mc.timer.timerSpeed = 1;	
    mc.gameSettings.keyBindJump.pressed = false;
    }
    	
    if (thePlayer.isMoving() && combat == false) {
    if (mc.thePlayer.fallDistance < 0.1) {
    mc.timer.timerSpeed = 1;
    }
    if (mc.thePlayer.fallDistance > 0.2) {
    mc.timer.timerSpeed = 1.2;
    }
    if (mc.thePlayer.fallDistance > 0.6) {
    mc.timer.timerSpeed = 1.00;
    mc.thePlayer.speedInAir = 0.02019
    }
    }
    
    if (mc.thePlayer.fallDistance > 1) {
    mc.timer.timerSpeed = 1;
    mc.thePlayer.speedInAir = 0.02;
    }
    }
    
    if (module.settings.M.get() == "Test") {
    }
    });
    module.on("attack", function () {
    if (mc.thePlayer.hurtTime > 0 && module.settings.M.get() == "TimerHop" && module.settings.c.get()) {
    mc.timer.timerSpeed = 1;
    mc.thePlayer.speedInAir = 0.02
    combat = true;
    }
    });
});

var falseground;
var waitFlag;
var hasFallen;

script.registerModule({
    name: " �AutoJump|",
    description: "AutoJump",
    category: "Fun",
    tag: "JS",
}, function (module) {

    module.on("motion", function(eventData) {
        if (mc.thePlayer.onGround){
            mc.thePlayer.jump();
        }
    });

    module.on("enable", function() {
        Chat.print("AutoJump enabled");
    });

    module.on("disable", function() {
        Chat.print("AutoJump disabled");
    });

});
