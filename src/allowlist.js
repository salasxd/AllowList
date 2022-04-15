"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const form_1 = require("bdsx/bds/form");
const command_2 = require("bdsx/command");
const commandresult_1 = require("bdsx/commandresult");
const launcher_1 = require("bdsx/launcher");
const fs = require("fs");
let _allowlist = false;
launcher_1.bedrockServer.level.setCommandsEnabled(true);
getServer();
command_2.command.register('allow', 'allowlist.command.info', command_1.CommandPermissionLevel.Operator).overload((param, origin, output) => {
    const actor = origin.getEntity();
    if (actor) {
        if (actor.isPlayer()) {
            if (!_allowlist) {
                formActivate(actor.getNetworkIdentifier());
            }
            else {
                formOptions(actor.getNetworkIdentifier());
            }
        }
        else {
            output.error('allowlist.command.error');
        }
    }
    else {
        output.error('allowlist.command.error');
    }
}, {});
async function userOptions(net, username) {
    const form = new form_1.SimpleForm();
    form.setTitle("AllowList");
    form.setContent("\n* " + username + " *\n\n");
    form.addButton(new form_1.FormButton("allowlist.remove"), "remove");
    form.addButton(new form_1.FormButton("allowlist.return"), "return");
    form.sendTo(net, (data, net) => {
        if (data.response == "remove") {
            userRemoveConfirm(net, username);
        }
        else {
            formOptions(net);
        }
    });
}
async function userRemoveConfirm(net, username) {
    const form = new form_1.ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.user.remove\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data, net) => {
        if (data.response) {
            launcher_1.bedrockServer.executeCommand("kick " + username + " allowlist.message.kick", commandresult_1.CommandResultType.Mute);
            launcher_1.bedrockServer.executeCommand("allowlist remove " + username, commandresult_1.CommandResultType.Mute);
            alertForm(net, "allowlist.message.user.remove.success");
        }
        else {
            userOptions(net, username);
        }
    });
}
async function alertForm(net, message) {
    const form = new form_1.SimpleForm();
    form.setTitle("AllowList");
    form.setContent("\n" + message + "\n\n\n");
    form.addButton(new form_1.FormButton("allowlist.confirm"), "ok");
    form.sendTo(net, (data, net) => {
        formOptions(net);
    });
}
async function formOptions(net) {
    var _a;
    const form = new form_1.SimpleForm();
    form.setTitle("AllowList");
    //form.setContent("\n\n");
    form.addButton(new form_1.FormButton("allowlist.add"), "add");
    if (fs.existsSync('allowlist.json')) {
        let data = fs.readFileSync('allowlist.json', 'utf8');
        let json = JSON.parse(data);
        for (var user of json) {
            if (user.name.toLowerCase() != ((_a = net.getActor()) === null || _a === void 0 ? void 0 : _a.getName().toLowerCase())) {
                form.addButton(new form_1.FormButton(user.name), user.name.toLowerCase());
            }
        }
    }
    form.sendTo(net, (data, net) => {
        if (data.response == "add") {
            formAddUser(net);
        }
        else if (data.response == "null" || data.response == null || data.response == undefined) {
        }
        else {
            userOptions(net, data.response);
        }
    });
}
async function formAddUser(net) {
    const form = new form_1.CustomForm();
    form.setTitle("AllowList");
    //form.setContent("\n\n");
    form.addComponent(new form_1.FormLabel("Username: "));
    form.addComponent(new form_1.FormInput("", "username"), "username");
    form.sendTo(net, (data, net) => {
        var _a;
        if (data.response.username.toLowerCase() != ((_a = net.getActor()) === null || _a === void 0 ? void 0 : _a.getName().toLowerCase())) {
            userAddConfirm(net, data.response.username);
        }
        else {
            alertForm(net, "allowlist.message.error.user.self");
        }
    });
}
async function userAddConfirm(net, username) {
    const form = new form_1.ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.user.add\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data, net) => {
        if (data.response) {
            launcher_1.bedrockServer.executeCommand("allowlist add " + username, commandresult_1.CommandResultType.Mute);
            alertForm(net, "allowlist.message.user.add.success");
        }
        else {
            userOptions(net, username);
        }
    });
}
async function formActivate(net) {
    const form = new form_1.ModalForm();
    form.setTitle("AllowList");
    form.setContent("\nallowlist.form.activate\n");
    form.setButtonCancel("allowlist.cancel");
    form.setButtonConfirm("allowlist.confirm");
    form.sendTo(net, (data, net) => {
        if (data.response) {
            if (fs.existsSync('server.properties')) {
                let data = fs.readFileSync('server.properties', 'utf8');
                data = data.replace("allow-list=false", "allow-list=true");
                fs.writeFile('server.properties', data, function (err2) {
                    var _a;
                    if (err2)
                        throw err2;
                    launcher_1.bedrockServer.executeCommand("allowlist add " + ((_a = net.getActor()) === null || _a === void 0 ? void 0 : _a.getName()), commandresult_1.CommandResultType.Mute);
                    launcher_1.bedrockServer.serverInstance.disconnectAllClients("allowlist.message.activate.success");
                    const down = setTimeout(function () {
                        clearTimeout(down);
                        launcher_1.bedrockServer.stop();
                    }, 1000);
                });
            }
        }
    });
}
async function getServer() {
    if (fs.existsSync('server.properties')) {
        let data = fs.readFileSync('server.properties', 'utf8');
        if (data.indexOf("allow-list=false") > 0) {
            _allowlist = false;
        }
        else {
            _allowlist = true;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsb3dsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxsb3dsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTBEO0FBQzFELHdDQUFvRztBQUVwRywwQ0FBdUM7QUFDdkMsc0RBQXVEO0FBQ3ZELDRDQUE4QztBQUM5Qyx5QkFBeUI7QUFFekIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBRXZCLHdCQUFhLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTdDLFNBQVMsRUFBRSxDQUFDO0FBRVosaUJBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFDLGdDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEVBQUU7SUFDbEgsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLElBQUcsS0FBSyxFQUFDO1FBQ0wsSUFBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUM7WUFDaEIsSUFBRyxDQUFDLFVBQVUsRUFBQztnQkFDWCxZQUFZLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzthQUM5QztpQkFDRztnQkFDQSxXQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzthQUM3QztTQUNKO2FBQ0c7WUFDQSxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDM0M7S0FDSjtTQUNHO1FBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQzNDO0FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsS0FBSyxVQUFVLFdBQVcsQ0FBQyxHQUFzQixFQUFDLFFBQWdCO0lBQzlELE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxR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