//密码为不能包含,'&quot;%\并且头尾不能是空格的6-16位的非空值
Validator = {
    Require: /\S+/,
    Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    Phone: /^((\(\d{2,3}\))|(\d{3}\-?))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
    Mobile: /^((\(\d{2,3}\))|(\d{3}\-))?1\d\d{9}$/,
    Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    IdCard: "this.IsIdCard(value)",
    BankCard: "this.luhmCheck(value)", //检验银行卡号的方法
    HzCard: /^[a-zA-Z][0-9a-zA-Z]{3,18}$/,
    Currency: /^\d+(\.\d+)?$/,
    Number: /^\d+$/,
    Zip: /^[0-9]\d{5}$/,
    QQ: /^[1-9]\d{4,15}$/,
    Integer: /^[-\+]?\d+$/,
    Double: /^[-\+]?\d+(\.\d+)?$/,
    English: /^[A-Za-z]+$/,
    Chinese: /^[\u0391-\uFFE5]+$/,
    Username: /^[A-Za-z\u0391-\uFFE5]+[0-9a-zA-Z\u0391-\uFFE5]{1,}$/, //2个字符以上 Username : /^[a-z]\w{3,}$/i,
    UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
    IsSafe: function (str) { return !this.UnSafe.test(str); },
    SafeString: "this.IsSafe(value)",
    Pwd: /^[^\s,'"%\\]{1,}[^,'"%\\]{3,16}[^\s,'"%\\]{1,}$/,
    Filter: "this.DoFilter(value, getAttribute('accept'))",
    LimitEn: "this.limit(this.EncodeSpChar(value).length,getAttribute('min'),  getAttribute('max'))",
    Limit: "this.limit(value.length,getAttribute('min'),  getAttribute('max'))",
    LimitB: "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
    Date: "this.IsDate(value, getAttribute('format'), getAttribute('min'), getAttribute('max'))",
    LimitDate: "this.limitDate(value,getAttribute('min'), getAttribute('max'), getAttribute('format'))",
    Repeat: "value == document.getElementsByName(getAttribute('to'))[0].value",
    Range: "getAttribute('min') < (value|0) && (value|0) < getAttribute('max')",
    FloatRange: "getAttribute('min') <= parseFloat(value) && parseFloat(value) <= getAttribute('max')",
    Compare: "this.compare(value,getAttribute('operator'),getAttribute('to'))",
    Custom: "this.Exec(value, getAttribute('regexp'))",
    Group: "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
    ErrorItem: [document.forms[0]],
    ErrorMessage: ["以下原因导致提交失败：\t\t\t\t"],
    bgcolor: "#fff7a6",
    Img: '',
    Validate: function (theForm, mode) {
        //	    debugger;
        var obj = theForm || document;
        if (mode == 4) {//独立元素blur验证
            var objelem = [theForm];
            var count = 1;
        } else {
            var objelem = obj.getElementsByTagName("*");
            var count = objelem.length;
        }
        this.ErrorMessage.length = 1;
        this.ErrorItem.length = 1;
        this.ErrorItem[0] = objelem;
        for (var i = 0; i < count; i++) {
            if (!objelem[i]) continue;
            with (objelem[i]) {
                var _dataType = getAttribute("dataType");
                if (typeof (_dataType) == "object" || typeof (this[_dataType]) == "undefined") continue;
                this.ClearState(objelem[i], getAttribute("errorbgcolor"));
                var oldvalue = "", value1 = "";
                if (objelem[i].value==undefined) try{value = getAttribute("value") || "";}catch(e){}
                else if (objelem[i].selector && $(objelem[i].selector).editableSelectInstances()) {
                    oldvalue = value; value = $(selector).editableSelectInstances()[0].current_value;
                }
                value1 = value;
                if (editor = objelem[i].xheditor) {
                    oldvalue = value; value = editor.getSource(); value1 = editor.getSourceText(1);
                }
                var ochosen = $(objelem[i]).data('chosen');
                if (ochosen && !value) {
                    value1 = value = $(ochosen.form_field).attr('text') || "";
                }
                if (getAttribute("require") == "false" && value == "") continue;
                switch (_dataType) {
                    case "IdCard":
                    case "BankCard":
                    case "Date":
                    case "LimitDate":
                    case "Repeat":
                    case "Range":
                    case "FloatRange":
                    case "Compare":
                    case "Custom":
                    case "Group":
                    case "LimitEn":
                        //					    if(_dataType=="LimitEn"){
                        if (getAttribute("require") == "true" && (!value || !value1)) {
                            this.AddError(i, getAttribute("msg"));
                            break;
                        }
                        //					    }
                    case "Limit":
                    case "LimitB":
                    case "SafeString":
                    case "Img":
                        if (_dataType == "Img") {
                            var arrsname = [];
                            $(objelem[i]).find('div').each(function () {
                                arrsname.push($('#' + $(this).attr('id').replace('div', 'txt')).val())
                            });
                            var max = $(objelem[i]).attr('max');
                            if ((max && Math.floor(max) < arrsname.length) || (getAttribute("require") == "true" && arrsname.length == 0)) {
                                this.AddError(i, getAttribute("msg"));
                            }
                            break;
                        }
                    case "Filter":
                        //debugger;
                        if (!eval(this[_dataType])) {
                            this.AddError(i, getAttribute("msg"));
                        }
                        break;
                    default:
                        if (getAttribute("require") == "true" && (!value || !value1)) {
                            this.AddError(i, getAttribute("msg"));
                            break;
                        }
                        if (!this[_dataType].test(value)) {
                            this.AddError(i, getAttribute("msg"));
                        }
                        break;
                }
                if (oldvalue)
                    value = oldvalue;
            }
        }
        if (this.ErrorMessage.length > 1) {
            mode = mode || 1;
            var errCount = this.ErrorItem.length;
            switch (mode) {
                case 2:
                    for (var i = 1; i < errCount; i++) {
                        if (!this.ErrorItem[i].selector) {
                            this.ErrorItem[i].style.backgroundColor = this.bgcolor;
                            this.ErrorItem[i].setAttribute('errorbgcolor', this.bgcolor);
                        }
                        this.ErrorItem[i].style.color = "red";
                    }
                case 1:
                    if (jQuery.getparent && jQuery.getparent().jAlert)
                        jQuery.getparent().jAlert(this.ErrorMessage.join("\n"));
                    else if (parent.jAlert)
                        parent.jAlert(this.ErrorMessage.join("\n"));
                    else 
                        alert(this.ErrorMessage.join("\n"));
                    if (this.ErrorItem[1].style.display != 'none')
                        try { this.ErrorItem[1].focus(); } catch (e) { }
                    break;
                case 3:
                    for (var i = 1; i < errCount; i++) {
                        try {
                            var span = document.createElement("SPAN");
                            span.id = "__ErrorMessagePanel";
                            span.style.color = "red";
                            this.ErrorItem[i].parentNode.appendChild(span);
                            span.innerHTML = this.ErrorMessage[i].replace(/\d+:/, "*");
                        }
                        catch (e) { alert(e.description); }
                    }
                    this.ErrorItem[1].focus();
                    break;
                case 4:
                    break;
                default:
                    if (jQuery.getparent().jAlert)
                        jQuery.getparent().jAlert(this.ErrorMessage.join("\n"));
                    else
                        alert(this.ErrorMessage.join("\n"));
                    break;
            }
            return false;
        }
        return true;
    },
    limit: function (len, min, max) {
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },
    EncodeSpChar:function(str)
    {
        var a={"\\r":"%0D","\\n":"%0A","\\\\r":"\\\\r","\\\\n":"\\\\n","\\t":"%09"};
        var t="";
        for(var i in a)
        {
            if(typeof(a[i])=="string")t+=i+"|";
        }
        t=t.substr(0,t.length-1);       
        var p=new RegExp(t,"gim");
        return str.replace(p,function(c){
            var r1= jQuery.SpecialChars["\\"+c]||jQuery.SpecialChars[c] ;
            if(!r1){
                if(c=="\n")return "%0A";
                if(c=="\r")return "%0D";
                if(c=="\t")return "%09";
            }else
                return r1;
        });
    },
    LenB: function (str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    ClearState: function (elem, bcolor) {
        with (elem) {
            if ((elem.selector) && (style.backgroundColor == this.bgcolor || bcolor == this.bgcolor))
                style.backgroundColor = "";
            if (style.color == "red")
                style.color = "";
            var lastNode = parentNode.childNodes[parentNode.childNodes.length - 1];
            if (lastNode.id == "__ErrorMessagePanel")
                parentNode.removeChild(lastNode);
        }
    },
    AddError: function (index, str) {
        this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0][index];
        this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
    },
    Exec: function (op, reg) {
        return new RegExp(reg, "g").test(op);
    },
    compare: function (op1, operator, op2) {
        switch (operator) {
            case "NotEqual":
                return (op1 != op2);
            case "GreaterThan":
                return (op1 > op2);
            case "GreaterThanEqual":
                return (op1 >= op2);
            case "LessThan":
                return (op1 < op2);
            case "LessThanEqual":
                return (op1 <= op2);
            default:
                return (op1 == op2);
        }
    },
    MustChecked: function (name, min, max) {
        var groups = document.getElementsByName(name);
        var hasChecked = 0;
        min = min || 1;
        max = max || groups.length;
        for (var i = groups.length - 1; i >= 0; i--)
            if (groups[i].checked) hasChecked++;
        return min <= hasChecked && hasChecked <= max;
    },
    DoFilter: function (input, filter) {
        return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
    },
    IsIdCard: function (number) {
        var date, Ai;
        var verify = "10x98765432";
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var area = ['', '', '', '', '', '', '', '', '', '', '', '北京', '天津', '河北', '山西', '内蒙古', '', '', '', '', '', '辽宁', '吉林', '黑龙江', '', '', '', '', '', '', '', '上海', '江苏', '浙江', '安微', '福建', '江西', '山东', '', '', '', '河南', '湖北', '湖南', '广东', '广西', '海南', '', '', '', '重庆', '四川', '贵州', '云南', '西藏', '', '', '', '', '', '', '陕西', '甘肃', '青海', '宁夏', '新疆', '', '', '', '', '', '台湾', '', '', '', '', '', '', '', '', '', '香港', '澳门', '', '', '', '', '', '', '', '', '国外'];
        var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
        if (re == null) return false;
        if (re[1] >= area.length || area[re[1]] == "") return false;
        if (re[2].length == 12) {
            Ai = number.substr(0, 17);
            date = [re[9], re[10], re[11]].join("-");
        }
        else {
            Ai = number.substr(0, 6) + "19" + number.substr(6);
            date = ["19" + re[4], re[5], re[6]].join("-");
        }
        if (!this.IsDate(date, "ymd")) return false;
        var sum = 0;
        for (var i = 0; i <= 16; i++) {
            sum += Ai.charAt(i) * Wi[i];
        }
        Ai += verify.charAt(sum % 11);
        return (number.length == 15 || number.length == 18 && number.toLowerCase() == Ai.toLowerCase());
    },
    luhmCheck: function (bankno) {
        var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();  //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array();  //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {//奇数位
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;

        if (lastNum == luhm) {
           // $("#banknoInfo").html("Luhm验证通过");
            return true;
        }
        else {
          //  $("#banknoInfo").html("银行卡号必须符合Luhm校验");
            return false;
        }
    },
    limitDate: function (value, min, max, format) {
        var dt = new Date();
        var minValue = (min != "today") ? document.getElementById(min).value : (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
        if (!this.IsDate(value, format || "ymd", minValue, max)) {//不是日期格式直接返回错误
            return 0;
        }
        var thistime, mintime
        if (format == "ymdhms") {
            var arr0 = value.split(' ');
            var arr = arr0[0].split("-");
            var arr2 = arr0[1].split(':');
            thistime = new Date(arr[0], arr[1], arr[2] ? arr[2] : 0, arr2[0], arr2[1], arr2[2]);
            var arrm0 = minValue.split(' ');
            var arrs = arrm0[0].split("-");
            var arrm2 = arrm0[1].split(':');
            mintime = new Date(arrs[0], arrs[1], arrs[2] ? arrs[2] : 0, arrm2[0], arrm2[1], arrm2[2]);
        } else {
            var arr = value.split("-");
            thistime = new Date(arr[0], arr[1], arr[2] ? arr[2] : 0);
            var arrs = minValue.split("-");
            mintime = new Date(arrs[0], arrs[1], arrs[2] ? arrs[2] : 0);
        }
        var thistimes = thistime.getTime();
        var mintimes = mintime.getTime();
        var re = (thistimes >= mintimes);
        if (max && re) {
            var dt = new Date();
            var maxtimes = new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
            if (max != "today") {
                var arr2 = max.split("-");
                if (arr2.length < 2) return 0;
                maxtimes = new Date(arr2[0], arr2[1], arr2[2] ? arr2[2] : 0);
            }
            return maxtimes.getTime() >= thistimes;
        }
        return re;
    },
    IsDate: function (op, formatString, min, max) {
        formatString = formatString || "ymd";
        var m, year, month, day;
        switch (formatString) {
            case "ymd":
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
                if (m == null) return false;
                day = m[6];
                month = m[5] * 1;
                year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            case "dmy":
                m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
                if (m == null) return false;
                day = m[1];
                month = m[3] * 1;
                year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
                break;
            case "ymdhms":
                m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2}) (\\d{1,2}):(\\d{1,2}):(\\d{2})$"));
                if (m == null) return false;
                day = m[6];
                month = m[5] * 1;
                year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
                break;
            default:
                break;
        }
        if (!parseInt(month)) return false;
        month = month == 0 ? 12 : month;
        var date = new Date(year, month - 1, day);
        var re = (typeof (date) == "object" && year == date.getFullYear() && month == (date.getMonth() + 1) && day == date.getDate());
        function GetFullYear(y) { return ((y < 30 ? "20" : "19") + y) | 0; }
        if (max && re) {//是时间
            var dt = new Date();
            var maxtimes = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
            if (max != "today") {
                var arr2 = value.split("-");
                if (arr2.length < 2) return 0;
                maxtimes = new Date(arr2[0], arr2[1], arr2[2] ? arr2[2] : 0);
            }
            return maxtimes.getTime() >= date.getTime();
        }
        return re;
    }
};

