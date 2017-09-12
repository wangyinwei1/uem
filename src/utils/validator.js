
export default class {
	static check(value, rules) {
		let result = {
			state: true,
			msg: ''
		};
		for(let key in rules) {
			result = this._valudateByKey(key, rules[key],value);
			if(!result.state)
				break
		}
		return result;
	}
	static _valudateByKey(key, constraint, value) {
		let state;
		switch(key) {
			case 'Length_50':
				state = true;
				if(value.length > 50){
					state = false;
				}
				return {
					state : state,
					msg : state ? "ok" : UEM_i18n.less_than_50[UEM_lang]
				}
				break;
			case 'Length_100':
				state = true;
				if(value.length>100){
					state = false;
				}
				return {
					state : state,
					msg : state? "ok" : UEM_i18n.less_than_100[UEM_lang]
				}
				break;
			case 'domain':
				const domainReg =  /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d{0,5}){0,1}$/;
				state = domainReg.test(value);

				return {
					state : state,
					msg : state? "ok" : UEM_i18n.illegal_domain_name[UEM_lang]
				}
				break;
			case 'url':
				const urlReg =  /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d{0,5}){0,1}$/;
				state = urlReg.test(value);

				return {
					state : state,
					msg : state? "ok" : UEM_i18n.Url_illegal[UEM_lang]
				}
				break;
			case 'ip':
				const ipReg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\d{0,5}$/;
				state = ipReg.test(value);
				return {
					state : state,
					msg : state? "ok" : UEM_i18n.ip_illegal[UEM_lang]
				}
				break;
			case 'email':
				const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				state = emailReg.test(value);
				return {
					state : state,
					msg : state? "ok" : UEM_i18n.E-mail_illegal[UEM_lang]
				}
				break;
			case 'appUrl' :
					const appUrlReg = new RegExp("^((https|http|ftp|rtsp|mms)?://)"
	                            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
	                            + "(([0-9]{1,3}\\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	                            + "|" // 允许IP和DOMAIN（域名）
	                            + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.
	                            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名
	                            + "[a-z]{2,6})" // first level domain- .com or .museum
	                            + "(:[0-9]{1,4})?" // 端口- :80
	                            + "((/?)|" // a slash isn't required if there is no file name
	                            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");

					state = appUrlReg.test(value)
 					return {
 							state: state,
 							msg: state?'ok': UEM_i18n.Url_illegal[UEM_lang]
 					}
					break;
			case 'require':
					state = value !=='';
					return {
							state: state,
							msg: state?'ok': UEM_i18n.can_not_empty[UEM_lang]
					}
					break;
			case 'positiveInt':
					const positiveIntReg = /^[1-9]\d*$/;
					state = positiveIntReg.test(value.toString());
					return {
							state: state,
							msg: state?'ok': UEM_i18n.enter_positive_integer[UEM_lang]
					}
					break;
			case 'whiteList':
					let str = value;
	        str = str.replace('http://','');
	        str = str.replace('ftp://','');
	        str = str.replace('https://','');
					state = this.check(str, {'domain': true}).state || this.check(str, {'ip': true}).state;
					return {
							state: state,
							msg: state?'ok': UEM_i18n.enter_correct_domain[UEM_lang]
					}
					break;
		}
	}
}
