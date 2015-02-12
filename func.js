//加法  
Number.prototype.add = function (arg) {
    var r1, r2, m;
    try { r1 = this.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (this * m + arg * m) / m
}

//减法  
Number.prototype.sub = function (arg) {
    return this.add(-arg);
}

//乘法  
Number.prototype.mul = function (arg) {
    var m = 0, s1 = this.toString(), s2 = arg.toString();
    try { m += s1.split(".")[1].length } catch (e) { m += 0 }
    try { m += s2.split(".")[1].length } catch (e) { m += 0 }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//除法  
Number.prototype.div = function (arg) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = this.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(this.toString().replace(".", ""))
        r2 = Number(arg.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
/*****************************************************
*                                                    *
*                     日期处理函数                   *
*                                                    *
*****************************************************/
Date.prototype.toString = function () {
    return getDateString(this);
};
function getMonthOnebynum(dstr, num) {//根据传的参数num 来加减月 获得月一号
    var arr = getDateArray(dstr);
    var d = new Date(arr[0], Math.floor(arr[1]) + num, "01");
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}
function getDateArray(datestr) {
    var arr = datestr.split("-");
    arr[1] = arr[1].replace(/^0(\d)/, "$1");
    arr[2] = arr[2].replace(/^0(\d)/, "$1");
    return [parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2])];
};
//根据日期判断周几 周一到周日   1-7表示
function getweek(date) {
    var currentDate = getDateByStr(date);
    var idendity = currentDate.getDay();  //返回值0-6 ,分别表示这个礼拜的星期日到星期六
    if (idendity == 0) {
        idendity = 7;
    }
    return idendity;
}
//获得本周周一日期
function getmonday(date) {
    var currentDate = getDateByStr(date);
    var idendity = currentDate.getDay();  //返回值0-6 ,分别表示这个礼拜的星期日到星期六
    var arr = [6, 0, 1, 2, 3, 4, 5];
    var d = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - arr[idendity]);
    return getStrByDate(d);
}
//获得num天后日期
function getnextday(date, num) {
    var currentDate = getDateByStr(date);
    var d = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + num);
    return getStrByDate(d);
}
/*
功能：日期串转日期类型的变量
*/
function getDateByStr(dstr) {
    var arr = getDateArray(dstr);
    return new Date(arr[0], arr[1], arr[2]);
}
/*
功能：得到格式为2008-8-8或2008年8月8日 日期串
*/
function getDateString(d, isChina) {
    var dstr = d.getFullYear() + ((isChina) ? "年" : "-");
    if ((d.getMonth() + 1) < 10)
        dstr += "0";
    dstr += d.getMonth() + 1;
    dstr += (isChina) ? "月" : "-";
    if (d.getDate() < 10)
        dstr += "0";
    dstr += d.getDate() + ((isChina) ? "日" : "");
    return dstr;
}

/*
功能：参数月最后一天
dt当前月 则0或省略 1表示下一个月 -1表示上一个月
*/
function getLastDay(str, dt) {
    if (!str) return '';
    var arrd = str.split('-');
    var d = new Date(arrd[0], Math.floor(arrd[1]) + (dt || 0), "00"); //当月最后一天
    return getStrByDate(d);
}

/*
功能：得到日期字符串
*/
function getStrByDate(d) {
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}

/*
功能 得到两个日期的差值 
interval：y表示得到年差；m表示得到月差；d表示得到天差
*/
function DateDiff(interval, date1, date2) {
    var y1 = date1.getFullYear();
    var y2 = date2.getFullYear();
    var m1 = date1.getMonth();
    var m2 = date2.getMonth();
    var d1 = date1.getDate();
    var d2 = date2.getDate();
    var parse = function (s) {
        return Date.parse(s.toString().replace(/-/g, '/'));
    };
    switch (interval) {
        case "y":
            return Math.abs(y2 - y1);
        case "m":
            return (y2 == y1) ? Math.abs(m2 - m1) : Math.abs(y2 - y1) * 12 + Math.abs(m2 - m1);
        case "d":
            var step = 1000 * 60 * 60 * 24;
            return Math.floor(Math.abs(parse(date2) - parse(date1)) / step);
    }
}
function getPreviousDate(dstr) {
    var arr = getDateArray(dstr);
    var d = new Date(arr[0], arr[1], arr[2] - 1);
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}
function getNextDate(dstr) {
    var arr = getDateArray(dstr);
    var d = new Date(arr[0], arr[1], arr[2] + 1);
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}
function getNextMonth(dstr) {//得到下一个月的今天
    var arr = getDateArray(dstr);
    var d = new Date(arr[0], Math.floor(arr[1]) + 1, arr[2]);
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}
function getNextMonthOne(dstr) {//得到下一个月一号
    var arr = getDateArray(dstr);
    var d = new Date(arr[0], Math.floor(arr[1]) + 1, "01");
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}
function getSevenLaterDate(objdate) {
    return new Date(objdate.getFullYear(), objdate.getMonth(), objdate.getDate() + 6);
}
function getDateByLen(objdate, len) {
    return new Date(objdate.getFullYear(), objdate.getMonth(), objdate.getDate() + parseInt(len));
}
function getDateByMLen(objdate, len) {

    return new Date(objdate.getFullYear(), objdate.getMonth() + parseInt(len), objdate.getDate());
}
function getCurrentDate() {
    return getDateString(new Date());
}
function getCurrentTime() {
    var d = new Date();
    var s = "";
    s += d.getHours();
    s += ":";
    if (d.getMinutes() < 10)
        s += "0" + d.getMinutes();
    else
        s += d.getMinutes();
    s += ":";
    if (d.getSeconds() < 10)
        s += "0" + d.getSeconds();
    else
        s += d.getSeconds();

    return s;
};
/*
功能：根据2010-1-1 得到2010-01-01格式
*/
function getdoubledate(d) {
    var arrdate = getDateArray(d);
    if (arrdate[1] < 9)
        arrdate[1] = '0' + (arrdate[1] + 1);
    else
        arrdate[1] = arrdate[1] + 1;
    if (arrdate[2] < 10)
        arrdate[2] = '0' + arrdate[2];
    return arrdate.join('-');
};

/*
功能：根据出生日期strBirthday 得到格式（2.01）的年龄
参数都是字符串格式都是2008-08-08
d2不传时为当前日期2002-11-21
*/
function GetAge(strBirthday, d2) {
    if (!strBirthday) return "";
    var dtBeginTime = getDateByStr(strBirthday);
    var nowDate = d2 ? getDateByStr(d2) : jQuery.getparent().adminSetting.objcursysdate;
    var nowYear = nowDate.getFullYear();
    var birYear = dtBeginTime.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    var birMonth = dtBeginTime.getMonth() + 1;
    var nowDate = nowDate.getDate();
    var birDate = dtBeginTime.getDate();
    var ageMonth;
    var ageYear;
    if (birMonth > nowMonth) {
        nowYear -= 1;
        ageMonth = 12 - birMonth + nowMonth;
    }
    else
        ageMonth = nowMonth - birMonth;
    ageYear = nowYear - birYear;
    if (nowDate < birDate)
        ageMonth--;
    if (ageMonth < 0) {
        ageYear--;
        ageMonth = 11;
    }
    if (parseInt(ageMonth) == 0)
        return ageYear + ".00";
    else {
        if (ageMonth < 10)
            ageMonth = "0" + ageMonth;
        //        else if (ageMonth == 10)
        //            ageMonth = "1";
        return ageYear + "." + ageMonth;
    }
}
/*
功能：得到默认人群的平均年龄传入和当前时间相差天数
*/
function GetAgeDefault(dayno) {
    if (!ekangsetting.objcursysdate) return 0;
    var curdate = getDateByLen(ekangsetting.objcursysdate, -dayno).toString();
    return GetAge(curdate);
};
function checkIsDate(obj) {
    var v = obj.trim();
    if (v == "") return false;
    if (v.length > 10 || !isDate(v)) {
        obj = "";
        return false;
    } else {
        return true;
    }
}
function isDate(s) {
    //    var re=new RegExp("(((19)|(20))[0-9][0-9])[-,/](1[0-2]|0?[1-9])[-,/](3[0,1]|[1,2][0-9]|0?[1-9])");
    return s.length > 10 ? false : s.match(new RegExp("(((19)|(20))[0-9][0-9])[-](1[0-2]|0+[1-9])[-]((3[0,1])|([1,2][0-9])|(0?[1-9]))"));
}
/*
功能：得到某年某月去掉周末的天数
*/
function getDayNumByMonth(y, m) {
    var int1 = 0;
    var d = new Date(y, m - 1, "01");
    while (d.getMonth() == m - 1) {
        var w = d.getDay();
        if (w != 0 && w != 6)
            int1++;
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    return int1;
}
function checkIsBeforeNow(obj) {
    var v = obj.trim();
    if (v == "") return false;
    if (v.length <= 10 && isDate(v)) {
        if (getDateString(new Date()) >= v) {
            return true;
        }
        else {
            return false;
            //            dia.showMsg("选择日期不能在当前日期之后!");
        }
    }
    else {
        //        dia.showMsg("请输入正确的日期!");
        return false;
    }
};
/*
功能：得到对应日期在本年中的第几周
*/
function getYearWeek(strdate) {
    var arr = strdate.split('-');
    var d1 = new Date(arr[0], Math.floor(arr[1]) - 1, arr[2]), d2 = new Date(arr[0], 0, 1),
    d = Math.round((d1 - d2) / 86400000);
    var dd = Math.ceil((d + ((d2.getDay() + 1))) / 7);
    //1月1日是周五或六为上一年的最后一周 其他为第一周
    if (d2.getDay() <= 4) {
        //12月28是周日 29 30 31
        if (arr[1] == "12" && ((arr[2] == "28" && d1.getDay() == 0) || (arr[2] == "29" && d1.getDay() <= 1) || (arr[2] == "30" && d1.getDay() <= 2) || (arr[2] == "31" && d1.getDay() <= 3))) {
            return 1;
        }
        return dd;
    } else {
        //第一周的取上一年的最后一周         
        return dd == 1 ? getYearWeek((Math.floor(arr[0]) - 1) + '-12-31') : dd - 1;
    }
};

/*****************************************************
*                                                    *
*                     小数处理函数                   *
*                                                    *
*****************************************************/
/*
功能：保留小数点后一位 非零进一
*/
function getonevalue(value) {
    value = (value == "" || isNaN(value)) ? "" : parseFloat(value).toFixed(2);
    if (value != "") {
        var vtemp = value.split('.')[1];
        if (vtemp.substring(1, 2) != "0") {
            var addedvalue = parseInt(vtemp.substring(0, 1)) + 1;
            if (addedvalue < 10)
                value = value.split('.')[0] + "." + (parseInt(vtemp.substring(0, 1)) + 1);
            else
                value = (parseInt(value.split('.')[0]) + 1) + ".0";
        }
        else
            value = value.split('.')[0] + "." + (parseInt(vtemp.substring(0, 1)));
    }
    return value;
};
/*
功能：小数点保留一位且小数部分只能是5或0
*/
function getfzvalue(value) {
    if (value == "" || isNaN(value))
        return "";
    value = parseFloat(value).toFixed(1);
    var vtemp = value.split('.')[1];
    if (parseInt(vtemp) > 2 && parseInt(vtemp) < 8)
        value = (value.split('.')[0]) + ".5";
    else if (parseInt(vtemp) < 3)
        value = (value.split('.')[0]) + ".0";
    else
        value = (parseInt(value.split('.')[0]) + 1) + ".0";
    return value;
};
//检查是否为正整数
function isUnsignedInteger(strInteger, arrrange) {
    var newPar = /^(-|\+)?\d+$/;
    if (arrrange) {
        if (newPar.test(strInteger)) {
            if (strInteger <= arrrange[1] && strInteger >= arrrange[0])
                return true;
            else
                return false;
        } else
            return false;
    } else
        return newPar.test(strInteger);
};
/*
功能：转化为整型
*/
function parseToint(v) {
    if (v == "")
        return 0;
    else
        return parseInt(parseFloat(v));
}
/*
功能：保存1位精度
*/
function getOneFloat(v) {
    var ret = parseFloat((v + "").trim()).toFixed(1);
    if (ret == null || isNaN(ret) == true)
        return 0;
    //    if(ret.indexOf(".0")>0)
    //        return Math.round(ret);
    return ret;
};
/*
功能：保存两位(或num位)精度 
*/
function getFloatValue(v, num) {
    var ret = parseFloat((v + "").trim()).toFixed((num) ? num : 2);
    if (ret == null || isNaN(ret) == true)
        return 0;
    return ret;
}

function getFloat(v) {
    var ret = parseFloat((v + "").trim());
    if (ret == null || isNaN(ret) == true)
        return 0;
    return ret;
}
/* 
功能：转换String到Float,保存两位精度 
*/
function getMoneyValue(str) {
    return getFloatValue(str.replace(/,/g, ''));
}
/*
功能：根据年龄字符串得到对应的月数
*/
function getAgeMonth(str) {
    if (!str)
        return 0;
    var arrAge = str.toString().split(".");
    if (arrAge.length == 1)
        return parseInt(arrAge[0]) * 12;
    else {
        if (arrAge[1] == "1")
            return parseInt(arrAge[0]) * 12 + 10;
        else
            return parseInt(arrAge[0]) * 12 + Math.floor(arrAge[1]);
    }
};
/*
功能：根据传入的数字返回3位  传1返回001
*/
function thrno(v) {
    if (v < 9) {
        return '00' + (v + 1);
    } else if (v < 99 && v >= 10)
        return '0' + (v + 1);
    else
        return (v + 1);
};
/*
功能：在数组中获取指定值的元素索引
*/
function getinbyvalue(arr, value) {
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == value) {
            index = i;
            break;
        }
    }
    return index;
};
/*
功能：得到比例格式
flag为true表示 c2:c1 否则c1:c2
*/
function getBili(a1, a2, flag) {
    var c1 = a1;
    var c2 = a2;
    if (c1 == 0 || c2 == 0)
        return flag == true ? c2 + ":" + c1 : c1 + ":" + c2;
    else if (c1 == 0 && c2 == 0)
        return "1:1";
    //    for (var i = 2; i <= a1; i++) {
    //        var b1 = a1 / i;
    //        var b2 = a2 / i;
    //        if (b1 == parseInt(b1)) {
    //            if (b2 == parseInt(b2)) {
    //                c1 = b1;
    //                c2 = b2;
    //            }
    //        }
    //    }
    return (flag) ? c2 + ":" + c1 : c1 + ":" + c2;
}

/*****************************************************
*                                                    *
*                     扩展Array方法                      *
*                                                    *
*****************************************************/
Array.prototype.indexOf = function (o) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == o)
            return i;
    }
    return -1;
};
Array.prototype.lastIndexOf = function (o) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] == o)
            return i;
    }
    return -1;
};
Array.prototype.contains = function (o) {
    return this.indexOf(o) != -1;
};
Array.prototype.copy = function (o) {
    return this.concat();
};
Array.prototype.insertAt = function (o, i) {
    this.splice(i, 0, o);
};
Array.prototype.insertBefore = function (o, o2) {
    var i = this.indexOf(o2);
    if (i == -1)
        this.push(o);
    else
        this.splice(i, 0, o);
};
Array.prototype.removeAt = function (i) {
    this.splice(i, 1);
};
Array.prototype.remove = function (o) {
    var i = this.indexOf(o); if (i != -1)
        this.splice(i, 1);
};
/*
*　方法:Array.remove(dx)
*　功能:删除数组元素.
*　参数:dx删除元素的下标.
*　返回:在原数组上修改数组
*/
//经常用的是通过遍历,重构数组.
Array.prototype.botremove = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};
//在数组中获取指定值的元素索引
Array.prototype.getIndexByValue = function (value) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] == value) {
            index = i;
            break;
        }
    }
    return index;
};
Array.prototype.clear = function () {
    this.splice(0, this.length);
};
Array.prototype.previousItem = function (o) {
    var i = this.indexOf(o);
    if (i > 0)
        return this[i - 1];
    return null;
};
Array.prototype.nextItem = function (o) {
    var i = this.indexOf(o);
    if ((i + 1) < this.length)
        return this[i + 1];
    return null;
};
/*
移除数组对应值通用方法
arr:对应数组
value：要移除的值
index:2维数组时对应值序号
修改：操作树数组出错，改为返回数组方法
*/
function removeArr(arr, value, index) {
    var len = arr.length;
    var arrtemp = [];
    for (var j = 0; j < len; j++) {
        if (index || index == 0) {
            if (arr[j][index] == value) {
                continue;
            }
        } else {
            if (arr[j] == value) {
                continue;
            }
        }
        arrtemp.push(arr[j]);
    }
    arr = arrtemp;
    return arrtemp;
}
/*****************************************************
*                                                    *
*                     扩展String方法                 *
*                                                    *
*****************************************************/
String.prototype.trim = function () {
    return this.replace(/(^\s+)|\s+$/g, "");
};
/*
功能：将金钱转换成大写的金钱
*/
function convertToChinNum(number) {
    var number = new String(Math.round(number * 100)); // 数字金额
    var chineseValue = "";           // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖";        // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分";      // 对应单位
    var len = number.length;          // number 的字符串长度
    var Ch1;              // 数字的汉语读法
    var Ch2;              // 数字位的汉字读法
    var nZero = 0;             // 用来计算连续的零值的个数
    var String3;             // 指定位置的数值
    if (len > 15) {
        return "超出计算范围";
    }
    if (number == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(number.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            } else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        } else {// 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            } else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            } else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) {// 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) {// 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    return chineseValue;
};
/*
 *重写小数四舍五入的的方法 
 */
Number.prototype.toFixed = function (s) {
    s = s || 2;
    var changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
    index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
        changenum = changenum + ".";
        for (i = 0; i < s; i++) {
            changenum = changenum + "0";
        }

    } else {
        index = changenum.length - index;
        for (i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + "0";
        }

    }
    return changenum;
}
/*
功能：得到周数的代码
*/
function getweekdata(date) {
    var predate = getPreMonthToday(date);
    var firstmonday = getmonday(date);
    var nextdate = getNextMonthToday(date);
    var premonthmonday = getmonday(predate);
    var arrfirst = getdatearray(premonthmonday, firstmonday);
    var arrsecond = getdatearray(firstmonday, nextdate);
    var defaultvalue = jparentwindow().getStrByDate(firstmonday) + "|" + jparentwindow().getStrByDate(new Date(firstmonday.getFullYear(), firstmonday.getMonth(), firstmonday.getDate() + 6)) + "|" + getISOYearWeek(date)
    return [arrfirst.concat(arrsecond), defaultvalue];
}
/*
功能：得到从一个时间到另一个日期的星期的数组
*/
function getdatearray(firstdate, seconddate) {
    var weeknum = 0, strcontent = "", strsunday = "", strmonday = "", sunday = "", strvalue = "";
    var arrdata = [];
    while (firstdate < seconddate) {
        weeknum = getISOYearWeek(firstdate);
        strmonday = jparentwindow().getStrByDate(firstdate);
        sunday = new Date(firstdate.getFullYear(), firstdate.getMonth(), firstdate.getDate() + 6);
        strsunday = jparentwindow().getStrByDate(sunday);
        strcontent = strmonday + "~" + strsunday + " 第" + weeknum + "周";
        strvalue = strmonday + "|" + strsunday + "|" + weeknum;
        arrdata.push([strcontent, strvalue]);
        firstdate = new Date(firstdate.getFullYear(), firstdate.getMonth(), firstdate.getDate() + 7);
    }
    return arrdata;
}
/*
功能：得到上一个月的今天
逻辑：得到上个月的今天,如果本月是31号，上个月的最后一天是28号，则选用28号
*/
function getPreMonthToday(date) {
    var predate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    var prelastdate = new Date(date.getFullYear(), date.getMonth(), 0);
    if (predate.getMonth() == date.getMonth()) {
        predate = prelastdate;
    }
    return predate;
}
/*
功能：得到下一个月的今天
逻辑：得到下个月的今天,如果本月是31号，下个月的最后一天是28号，则选用28号
*/
function getNextMonthToday(date) {
    var nextdate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    var nextlastdate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    if (nextdate.getMonth() != nextlastdate.getMonth()) {
        nextdate = nextlastdate;
    }
    return nextdate;
}
//获得本周周一日期
function getmonday(date) {
    var currentDate = date;
    var idendity = currentDate.getDay();  //返回值0-6 ,分别表示这个礼拜的星期日到星期六
    var arr = [6, 0, 1, 2, 3, 4, 5];
    var d = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - arr[idendity]);
    return d;
}
/*
功能：初始化周的chosen
*/
function initchosen(objcurdate, defaultvalue) {
    var arrdata = getweekdata(objcurdate);
    $("#selweek").chosen({ arrdata: arrdata[0] || [], width: 250, disable_search: true, allow_single_deselect: 0, default_value: defaultvalue || arrdata[1] }).change(function () {
        var chosenvalue = $("#selweek").val();
        if (chosenvalue) {
            var arrchosenvalue = chosenvalue.split('|');
            var objdate = jparentwindow().getDateByStr(arrchosenvalue[0]);
            initchosen(objdate, chosenvalue);
        }
    });
}
/*得到星期的下拉End*/
/*
功能：得到日期字符串
*/
function getStrByDate(d) {
    return d.getFullYear() + "-" + (((d.getMonth() + 1) < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate());
}