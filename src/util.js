"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = exports.TimeToDate = exports.Print = exports.TypePrint = exports.Plugin = void 0;
const Name = "AllowList";
const Version = "1.0.0";
const Creador = "SalasCris";
const unixTime = require('unix-time');
class Plugin {
    static Name() {
        return Name;
    }
    static Version() {
        return Version;
    }
    static Creador() {
        return Creador;
    }
}
exports.Plugin = Plugin;
var TypePrint;
(function (TypePrint) {
    TypePrint[TypePrint["log"] = 0] = "log";
    TypePrint[TypePrint["info"] = 1] = "info";
    TypePrint[TypePrint["warn"] = 2] = "warn";
    TypePrint[TypePrint["err"] = 3] = "err";
    TypePrint[TypePrint["ok"] = 4] = "ok";
})(TypePrint = exports.TypePrint || (exports.TypePrint = {}));
async function Print(msg, type = TypePrint.info) {
    switch (type) {
        case TypePrint.err: {
            console.error(`[${Plugin.Name()}] `.magenta + msg.red);
            break;
        }
        case TypePrint.warn: {
            console.warn(`[${Plugin.Name()}] `.magenta + msg.yellow);
            break;
        }
        case TypePrint.info: {
            console.info(`[${Plugin.Name()}] `.magenta + msg.white);
            break;
        }
        case TypePrint.log: {
            console.log(`[${Plugin.Name()}] `.magenta + msg.gray);
            break;
        }
        case TypePrint.ok: {
            console.log(`[${Plugin.Name()}] `.magenta + msg.green);
            break;
        }
    }
}
exports.Print = Print;
function TimeToDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds();
}
exports.TimeToDate = TimeToDate;
function Time() {
    return unixTime(new Date());
}
exports.Time = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQ3pCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN4QixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUE7QUFDM0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLE1BQWEsTUFBTTtJQUNmLE1BQU0sQ0FBQyxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPO1FBQ1YsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPO1FBQ1YsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBVkQsd0JBVUM7QUFFRCxJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDakIsdUNBQUcsQ0FBQTtJQUNILHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0lBQ0osdUNBQUcsQ0FBQTtJQUNILHFDQUFFLENBQUE7QUFDTixDQUFDLEVBTlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFNcEI7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUFDLEdBQVcsRUFBRSxPQUFrQixTQUFTLENBQUMsSUFBSTtJQUNyRSxRQUFPLElBQUksRUFBQztRQUNSLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsTUFBTTtTQUNUO1FBQ0QsS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsTUFBTTtTQUNUO1FBQ0QsS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsTUFBTTtTQUNUO1FBQ0QsS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxNQUFNO1NBQ1Q7UUFDRCxLQUFLLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELE1BQU07U0FDVDtLQUNKO0FBQ0wsQ0FBQztBQXZCRCxzQkF1QkM7QUFFRCxTQUFnQixVQUFVLENBQUMsU0FBaUI7SUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNyQixHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3RCLEdBQUcsR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ25CLEdBQUcsR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ3JCLEdBQUcsR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQVJELGdDQVFDO0FBRUQsU0FBZ0IsSUFBSTtJQUNoQixPQUFPLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELG9CQUVDIn0=