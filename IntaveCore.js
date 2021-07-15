/// api_version=2
var script = registerScript({
    name: "Intave Script",
    version: "1.0",
    authors: ["FaaatPotato"]
});

//hi

//Thanks @Anonzme for the functions that are needed for the AutoUpdate! <3 (I got these from ScriptCloud thats sum amazing work!)
//Credits: @liulihaocai made the AutoL I use it bc im laizy ok
//Also thanks to @CzechHek for helping me with problems i had in the past <3

var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook')
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var HentaiPacket = Java.type("net.minecraft.network.play.server.S02PacketChat");
var Amanee = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
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

var url = "https://raw.githubusercontent.com/FaaatPotato/Scripts/main/Jartex%20Script.js";
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
var Update;
var X;
var Y;
var Z;

script.on("load", function() {
Update = true;
});

script.registerModule({
    name: "JartexManager",
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
        U: Setting.boolean({
            name: "AutoUpdate",
            default: true
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
            name: " ",
            default: false
		}),
        s: Setting.boolean({
            name: " ",
            default: false
		}),
        HomePoint: Setting.text({
            name: " ",
            default: ""
        }),
        Reset: Setting.boolean({
            name: " ",
            default: false
		}),
        Key: Setting.boolean({
            name: "UseKeyBinds",
            default: true
		}),
    }

}, function (module) {
    module.on("enable", function () {
    if (!module.settings.U.get()) {
    Update = false;	
    }
    });
    module.on("disable", function () {
    });
    module.on("packet", function (e) {
    var packet = e.getPacket();
    if (packet instanceof C04 && homeSelected == true && module.settings.TP.get() && mc.thePlayer.isInWeb) {
    packet.x = X
    packet.y = Y
    packet.z = Z
    }
    });
    module.on("update", function () {				
    		
    if (Update == true && module.settings.U.get()) {
    createNewFile(name + ".js");	
    writeIn(name + ".js");
    Chat.print(" ");
    Chat.print("type .scriptmanager reload to reload the script!");
    Chat.print("the old script has been updated");	
    Chat.print(" ");
    Update = false;
    }
    	
    if (module.settings.TP.get() && !mc.thePlayer.isInWeb) {
    module.settings.TP.set(false);	
    Chat.print("You are not in a Web");
    }	
    	
    if (module.settings.SetTP.get()) {
    X = mc.thePlayer.posX;
    Y = mc.thePlayer.posY;
    Z = mc.thePlayer.posZ;	
    homeSelected = true;	
    module.settings.SetTP.set(false);
    module.settings.HomePoint.set(X+", "+Y+", "+Z)
    Chat.print("Homepoint set to "+X+", "+Y+", "+Z);
    }	
    
    if (homeSelected == true && mc.thePlayer.posX == X && mc.thePlayer.posZ == Z && module.settings.TP.get()) {
    module.settings.TP.set(false);
    if (module.settings.Reset.get()) {
    homeSelected = false;	
    module.settings.HomePoint.set("No home selected!");
    }
    }
   
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
