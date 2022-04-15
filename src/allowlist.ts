import { CommandPermissionLevel } from "bdsx/bds/command";
import { CustomForm, FormButton, FormInput, FormLabel, ModalForm, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { command } from "bdsx/command";
import { CommandResultType } from "bdsx/commandresult";
import { bedrockServer } from "bdsx/launcher";
import * as fs from 'fs';

let _allowlist = false;

bedrockServer.level.setCommandsEnabled(true);

getServer();

command.register('allow', 'allowlist.command.info',CommandPermissionLevel.Operator).overload((param, origin, output)=>{
    const actor = origin.getEntity();
    if(actor){
        if(actor.isPlayer()){
            if(!_allowlist){
                formActivate(actor.getNetworkIdentifier());
            }
            else{
                formOptions(actor.getNetworkIdentifier());
            }
        }
        else{
            output.error('allowlist.command.error');
        }
    }
    else{
        output.error('allowlist.command.error');
    }
}, {});

async function userOptions(net: NetworkIdentifier,username: string) {
    const form = new SimpleForm();
    form.setTitle("AllowList");
    form.setContent("\n* "+username+" *\n\n");
    form.addButton(new FormButton("allowlist.remove"),"remove");
    form.addButton(new FormButton("allowlist.return"),"return");
    form.sendTo(net, (data,net) =>{
        if(data.response == "remove"){
            userRemoveConfirm(net, username);
        }
        else{
            formOptions(net);
        }
    });
}

async function userRemoveConfirm(net: NetworkIdentifier, username: string) {
    const form = new ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.user.remove\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data,net) =>{
        if(data.response){
            bedrockServer.executeCommand("kick " + username + " allowlist.message.kick",CommandResultType.Mute);
            bedrockServer.executeCommand("allowlist remove " + username,CommandResultType.Mute);
            alertForm(net,"allowlist.message.user.remove.success");
        }
        else{
            userOptions(net,username);
        }
    });
}

async function alertForm(net: NetworkIdentifier, message: string) {
    const form = new SimpleForm();
    form.setTitle("AllowList");
    form.setContent("\n"+message+"\n\n\n");
    form.addButton(new FormButton("allowlist.confirm"),"ok");
    form.sendTo(net, (data,net) =>{
        formOptions(net);
    });
}

async function formOptions(net: NetworkIdentifier) {
    const form = new SimpleForm();
    form.setTitle("AllowList");
    //form.setContent("\n\n");
    form.addButton(new FormButton("allowlist.add"),"add");
    if (fs.existsSync('allowlist.json')){
        let data = fs.readFileSync('allowlist.json', 'utf8');
        let json = JSON.parse(data);
        for(var user of json){
            if(user.name.toLowerCase() != net.getActor()?.getName().toLowerCase()){
                form.addButton(new FormButton(user.name,"url", "https://raw.githubusercontent.com/salasxd/allowlist/main/user.png"),user.name.toLowerCase());
            }
        }
    }
    form.sendTo(net, (data,net) =>{
        if(data.response == "add"){
            formAddUser(net);
        }
        else if(data.response == "null" || data.response == null || data.response == undefined){

        }
        else{
            userOptions(net,data.response);
        }
    });
}

async function formAddUser(net: NetworkIdentifier) {
    const form = new CustomForm();
    form.setTitle("AllowList");
    //form.setContent("\n\n");
    form.addComponent(new FormLabel("Username: "));
    form.addComponent(new FormInput("","username"),"username");
    form.sendTo(net, (data,net) =>{
        if(data.response.username.toLowerCase() != net.getActor()?.getName().toLowerCase()){
            userAddConfirm(net,data.response.username);
        }
        else{
            alertForm(net, "allowlist.message.error.user.self");
        }
    });
}

async function userAddConfirm(net: NetworkIdentifier, username: string) {
    const form = new ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.user.add\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data,net) =>{
        if(data.response){
            bedrockServer.executeCommand("allowlist add " + username,CommandResultType.Mute);
            alertForm(net,"allowlist.message.user.add.success");
        }
        else{
            userOptions(net,username);
        }
    });
}

async function formActivate(net: NetworkIdentifier) {
    const form = new ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.activate\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data,net) =>{
        if(data.response){
            if (fs.existsSync('server.properties')){
                let data = fs.readFileSync('server.properties', 'utf8');
                data = data.replace("allow-list=false","allow-list=true");
                fs.writeFile('server.properties', data, function (err2: any) {
                    if (err2) throw err2;
                    bedrockServer.executeCommand("allowlist add " + net.getActor()?.getName(),CommandResultType.Mute);
                    bedrockServer.serverInstance.disconnectAllClients("allowlist.message.activate.success");
                    const down = setTimeout(function(){
                        clearTimeout(down);
                        bedrockServer.stop();
                    },1000);
                });
            }
        }
    });
}

async function getServer() {
    if (fs.existsSync('server.properties')){
        let data = fs.readFileSync('server.properties', 'utf8');
        if(data.indexOf("allow-list=false") > 0){
            _allowlist = false;
        }
        else{
            _allowlist = true;
        }
    }
}