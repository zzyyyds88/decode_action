//Sun Oct 19 2025 18:46:23 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const request = require("request");
const querystring = require("querystring");
const {
  SocksProxyAgent
} = require("socks-proxy-agent");
const COLORS = {
  RESET: "[0m",
  BRIGHT: "[1m",
  DIM: "[2m",
  UNDERSCORE: "[4m",
  BLINK: "[5m",
  REVERSE: "[7m",
  HIDDEN: "[8m",
  BLACK: "[30m",
  RED: "[31m",
  GREEN: "[32m",
  YELLOW: "[33m",
  BLUE: "[34m",
  MAGENTA: "[35m",
  CYAN: "[36m",
  WHITE: "[37m",
  GRAY: "[90m",
  GOLD: "[33m",
  BG_BLACK: "[40m",
  BG_RED: "[41m",
  BG_GREEN: "[42m",
  BG_YELLOW: "[43m",
  BG_BLUE: "[44m",
  BG_MAGENTA: "[45m",
  BG_CYAN: "[46m",
  BG_WHITE: "[47m",
  BG_GRAY: "[100m",
  BG_GOLD: "[43m"
};
const ICONS = {
  GOLD: "💰",
  CASH: "💸",
  SUCCESS: "✅",
  FAIL: "❌",
  WARNING: "⚠️",
  INFO: "ℹ️",
  START: "🚀",
  END: "🏁",
  SLEEP_ENABLED: process.env.KUAISHOU_SLEEP_ENABLED !== "false",
  LONG_SLEEP_INTERVAL: parseInt(process.env.KUAISHOU_LONG_SLEEP_INTERVAL) || 30,
  LONG_SLEEP_MIN: parseInt(process.env.KUAISHOU_LONG_SLEEP_MIN) || 20,
  LONG_SLEEP_MAX: parseInt(process.env.KUAISHOU_LONG_SLEEP_MAX) || 30,
  SHORT_SLEEP_INTERVAL_MIN: parseInt(process.env.KUAISHOU_SHORT_SLEEP_INTERVAL_MIN) || 5,
  SHORT_SLEEP_INTERVAL_MAX: parseInt(process.env.KUAISHOU_SHORT_SLEEP_INTERVAL_MAX) || 10,
  SHORT_SLEEP_MIN: parseInt(process.env.KUAISHOU_SHORT_SLEEP_MIN) || 3,
  SHORT_SLEEP_MAX: parseInt(process.env.KUAISHOU_SHORT_SLEEP_MAX) || 5,
  GOLD_BONUS_ENABLED: process.env.KUAISHOU_GOLD_BONUS_ENABLED?.["toLowerCase"]() !== "false",
  GOLD_BONUS_THRESHOLD: parseInt(process.env.KUAISHOU_GOLD_BONUS_THRESHOLD, 10) || 1000,
  ACCOUNT: "👤",
  PROXY: "🔌",
  TASK: "📋",
  AD: "📺",
  COOLDOWN: "⏱️",
  WAIT: "⌛",
  CHECK: "🔍",
  GIFT: "🎁",
  TIME: "⏰",
  MONEY: "💵"
};
function logWithColor(_0x508624, _0x2f8350, _0x4eb798) {
  if (process.env.NO_COLOR) {
    return console.log(_0x2f8350 + " " + _0x4eb798);
  }
  return console.log("" + COLORS[_0x508624] + _0x2f8350 + " " + _0x4eb798 + "[0m");
}
function printSeparator(_0x2c2e27 = 80, _0x52b3f9 = "=") {
  console.log(_0x52b3f9.repeat(_0x2c2e27));
}
const isDevMode = false;
const showDebugLogs = false;
process.env.SUPPRESS_DEPRECATION_WARNINGS !== "0" && process.env.SUPPRESS_DEPRECATION_WARNINGS !== "false" && (process.noDeprecation = true);
function loadAccountsFromEnv() {
  const _0x166d04 = Object.keys(process.env).filter(_0x3e5392 => /^ksck/i.test(_0x3e5392)).sort((_0x26b073, _0x1d9298) => {
    const _0x1ea2e5 = parseInt(_0x26b073.replace(/^ksck/i, ""), 10) || 0;
    const _0x59cdcb = parseInt(_0x1d9298.replace(/^ksck/i, ""), 10) || 0;
    if (_0x1ea2e5 !== _0x59cdcb) {
      return _0x1ea2e5 - _0x59cdcb;
    }
    return _0x26b073.localeCompare(_0x1d9298);
  });
  if (_0x166d04.length === 0) {
    logWithColor("RED", "❌", "未找到 ksck/ksck1/ksck2 环境变量");
    return [];
  }
  const _0x33ae28 = [];
  for (const _0x1c2bb0 of _0x166d04) {
    let _0x3e2d94 = (process.env[_0x1c2bb0] || "").trim();
    if (!_0x3e2d94) {
      continue;
    }
    const _0x2f8198 = _0x3e2d94.split("\n").map(_0x555c36 => _0x555c36.trim()).filter(Boolean);
    for (const _0xc81922 of _0x2f8198) {
      try {
        const _0x14491e = parseAccountConfig(_0xc81922);
        _0x14491e ? (_0x14491e.source = {
          key: _0x1c2bb0,
          line: _0x2f8198.indexOf(_0xc81922) + 1
        }, _0x33ae28.push(_0x14491e)) : logWithColor("RED", "❌", "账号格式错误（" + _0x1c2bb0 + "）：" + _0xc81922);
      } catch (_0x1f8dae) {
        logWithColor("RED", "❌", "解析账号失败（" + _0x1c2bb0 + "）：" + _0xc81922 + "，错误：" + _0x1f8dae.message);
      }
    }
  }
  const _0x187318 = _0x33ae28.slice(0, 1);
  _0x187318.forEach((_0x4773d5, _0x4ab0e6) => {
    _0x4773d5.index = _0x4ab0e6 + 1;
    _0x4773d5.remark ? _0x4773d5.nickname = "账号" + _0x4773d5.index + "(" + _0x4773d5.remark + ")" : _0x4773d5.nickname = "账号" + _0x4773d5.index;
  });
  return _0x187318;
}
function parseAccountConfig(_0x44adcd) {
  const _0x2a893f = String(_0x44adcd || "").trim().split("#");
  if (_0x2a893f.length < 2) {
    return null;
  }
  const _0x35fdb1 = _0x2a893f[0];
  let _0x2c458c = null;
  let _0x4e07ca = null;
  let _0xe3ca09 = null;
  let _0x232018 = "";
  let _0xebb027 = -1;
  let _0x511390 = -1;
  let _0x8fbd8a = -1;
  if (_0x2a893f.length >= 3) {
    if (_0x2a893f.length >= 5) {
      _0x8fbd8a = 2;
      _0xebb027 = 3;
      _0x511390 = 4;
    } else {
      if (_0x2a893f.length === 4) {
        const _0x1cd426 = _0x2a893f[3].trim();
        /[\u4e00-\u9fa5\s]/.test(_0x1cd426) ? (_0x8fbd8a = 2, _0x511390 = 3) : (_0x8fbd8a = 2, _0xebb027 = 3);
      } else {
        if (_0x2a893f.length === 3) {
          const _0x53e547 = _0x2a893f[2].trim();
          if (_0x53e547.includes("|") || /^socks5:\/\/.+/i.test(_0x53e547)) {
            _0xebb027 = 2;
          } else {
            _0x53e547.includes("Mozilla/") || _0x53e547.includes("kwai-android") ? _0x8fbd8a = 2 : _0x511390 = 2;
          }
        }
      }
    }
    if (_0xebb027 === -1 && _0x8fbd8a === -1 && _0x511390 === -1) {
      for (let _0x394e29 = _0x2a893f.length - 1; _0x394e29 >= 2; _0x394e29--) {
        const _0x369345 = _0x2a893f[_0x394e29].trim();
        if (_0xebb027 === -1 && (_0x369345.includes("|") || /^socks5:\/\/.+/i.test(_0x369345))) {
          _0xebb027 = _0x394e29;
        } else {
          if (_0x8fbd8a === -1 && (_0x369345.includes("Mozilla/") || _0x369345.includes("kwai-android"))) {
            _0x8fbd8a = _0x394e29;
          } else {
            if (_0x511390 === -1) {
              _0x511390 = _0x394e29;
              _0x2c458c = _0x369345;
              break;
            }
          }
        }
      }
    }
  }
  if (_0xebb027 > -1) {
    const _0x196806 = _0x2a893f[_0xebb027].trim();
    if (_0x196806.includes("|")) {
      const _0x22c844 = _0x196806.split("|");
      if (_0x22c844.length >= 2) {
        const [_0x3da521, _0x294d1f, _0x66c0cc, _0x45a042] = _0x22c844;
        _0x4e07ca = "socks5://" + _0x66c0cc + ":" + _0x45a042 + "@" + _0x3da521 + ":" + _0x294d1f;
      }
    } else {
      if (/^socks5:\/\/.+/i.test(_0x196806)) {
        _0x4e07ca = _0x196806;
      } else {
        _0x196806 && logWithColor("YELLOW", "⚠️", "代理字段不是有效的代理格式，忽略：" + _0x196806);
      }
    }
  }
  _0x8fbd8a > -1 && (_0xe3ca09 = _0x2a893f[_0x8fbd8a].trim());
  _0x511390 > -1 && !_0x2c458c && (_0x2c458c = _0x2a893f[_0x511390].trim());
  let _0x4d6b30 = _0x2a893f.length;
  if (_0x511390 > -1) {
    _0x4d6b30 = _0x511390;
  } else {
    if (_0xebb027 > -1) {
      _0x4d6b30 = _0xebb027;
    } else {
      _0x8fbd8a > -1 && (_0x4d6b30 = _0x8fbd8a);
    }
  }
  _0x232018 = _0x2a893f.slice(1, _0x4d6b30).join("#");
  return {
    salt: _0x35fdb1,
    cookie: _0x232018,
    userAgent: _0xe3ca09,
    proxyUrl: _0x4e07ca,
    remark: _0x2c458c
  };
}
function generateKuaishouDid() {
  try {
    const _0x3740d5 = _0x45e2e7 => {
      const _0x1d5ba5 = "0123456789abcdef";
      let _0x46e76a = "";
      for (let _0x582e91 = 0; _0x582e91 < _0x45e2e7; _0x582e91++) {
        _0x46e76a += _0x1d5ba5.charAt(Math.floor(Math.random() * _0x1d5ba5.length));
      }
      return _0x46e76a;
    };
    const _0x57cf0c = _0x3740d5(16);
    const _0x4e08c7 = "ANDROID_" + _0x57cf0c;
    return _0x4e08c7;
  } catch (_0x2fd2b9) {
    logWithColor("RED", "❌", "生成did失败: " + _0x2fd2b9.message);
    const _0x3a5335 = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x3a5335.substring(0, 16);
  }
}
async function sendRequest(_0x4ec603, _0x5cdcd2 = null, _0x31daef = "未知请求") {
  const _0x4deec5 = {
    ..._0x4ec603
  };
  if (_0x5cdcd2) {
    try {
      _0x4deec5.agent = new SocksProxyAgent(_0x5cdcd2);
    } catch (_0x13103a) {}
  }
  return new Promise(_0x44cd26 => {
    request(_0x4deec5, (_0x36623f, _0x8f251b, _0x29dd66) => {
      if (_0x36623f) {
        const _0x3a3304 = _0x36623f.message && _0x36623f.message.includes("代理连接超时");
        return _0x44cd26(null);
      }
      if (!_0x8f251b || _0x8f251b.statusCode !== 200) {
        const _0x4d34c8 = _0x8f251b ? _0x8f251b.statusCode : "无响应";
        showDebugLogs && logWithColor("YELLOW", "[调试]", _0x31daef + " 服务器响应异常: " + _0x4d34c8);
        return _0x44cd26(null);
      }
      try {
        _0x44cd26(JSON.parse(_0x29dd66));
      } catch {
        _0x44cd26(_0x29dd66);
      }
    });
  });
}
async function testProxyConnectivity(_0x1d5f8b, _0x56da83 = "代理连通性检测") {
  if (!_0x1d5f8b) {
    return {
      ok: true,
      msg: "✅ 未配置代理（直连模式）",
      ip: "localhost"
    };
  }
  const _0x463f5a = ["https://api.ipify.org?format=json", "https://ipinfo.io/json", "https://ifconfig.me/all.json"];
  for (const _0x29326a of _0x463f5a) {
    try {
      const _0x1d15cc = await sendRequest({
        method: "GET",
        url: _0x29326a,
        headers: {
          "User-Agent": "ProxyTester/1.0"
        },
        timeout: 8000
      }, _0x1d5f8b, _0x56da83 + " → " + new URL(_0x29326a).hostname);
      if (!_0x1d15cc) {
        continue;
      }
      let _0x23ebf5 = "";
      if (_0x1d15cc.ip) {
        _0x23ebf5 = _0x1d15cc.ip;
      } else {
        if (_0x1d15cc.ip_addr) {
          _0x23ebf5 = _0x1d15cc.ip_addr;
        } else {
          _0x1d15cc.hostname && (_0x23ebf5 = _0x1d15cc.hostname);
        }
      }
      if (_0x23ebf5) {
        return {
          ok: true,
          msg: "✅ SOCKS5代理正常，出口IP: " + _0x23ebf5,
          ip: _0x23ebf5
        };
      }
    } catch (_0x31f4e0) {
      continue;
    }
  }
  return {
    ok: false,
    msg: "❌ 所有IP检查服务均无法通过代理访问",
    ip: ""
  };
}
async function getAccountBasicInfo(_0x13106d, _0x55504c, _0x3ebf2b = "?", _0x36b96d = null) {
  const _0x4c0fc8 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first";
  const _0x2892fe = await sendRequest({
    method: "GET",
    url: _0x4c0fc8,
    headers: {
      Host: "nebula.kuaishou.com",
      "User-Agent": _0x36b96d || "kwai-android aegon/3.56.0",
      Cookie: _0x13106d,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    timeout: 12000
  }, _0x55504c, "账号[" + _0x3ebf2b + "] 获取基本信息");
  if (_0x2892fe && _0x2892fe.result === 1 && _0x2892fe.data) {
    return {
      nickname: _0x2892fe.data.userData?.["nickname"] || null,
      totalCoin: _0x2892fe.data.totalCoin ?? null,
      allCash: _0x2892fe.data.allCash ?? null
    };
  }
  return null;
}
function centerAlign(_0x34bfff, _0x2353d9) {
  _0x34bfff = String(_0x34bfff);
  if (_0x34bfff.length >= _0x2353d9) {
    return _0x34bfff.substring(0, _0x2353d9);
  }
  const _0x480a8f = _0x2353d9 - _0x34bfff.length;
  const _0x150c6e = Math.floor(_0x480a8f / 2);
  const _0x50eb12 = _0x480a8f - _0x150c6e;
  return " ".repeat(_0x150c6e) + _0x34bfff + " ".repeat(_0x50eb12);
}
class KuaishouAdTask {
  constructor({
    index: _0x196ac7,
    salt: _0x1fd62e,
    cookie: _0x47582e,
    nickname = "",
    proxyUrl = null,
    userAgent = null
  }) {
    this.index = _0x196ac7;
    this.salt = _0x1fd62e;
    this.cookie = _0x47582e;
    this.nickname = nickname || "账号" + _0x196ac7;
    this.proxyUrl = proxyUrl;
    this.userAgent = userAgent;
    this.roundCounter = 0;
    this.coinLimit = parseInt(process.env.KUAISHOU_COIN_LIMIT, 10) || 500000;
    this.coinExceeded = false;
    this.extractCookieInfo();
    this.headers = {
      Host: "nebula.kuaishou.com",
      Connection: "keep-alive",
      "User-Agent": this.userAgent || "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      Cookie: this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      box: {
        name: "宝箱广告",
        businessId: 606,
        posId: 20346,
        subPageId: 100024064,
        requestSceneType: 1,
        taskType: 1
      },
      look: {
        name: "看广告得金币",
        businessId: 672,
        posId: 24067,
        subPageId: 100026367,
        requestSceneType: 1,
        taskType: 1
      },
      food: {
        name: "饭补广告",
        businessId: 9362,
        posId: 24067,
        subPageId: 100026367,
        requestSceneType: 7,
        taskType: 2
      }
    };
    this.taskStats = {};
    Object.keys(this.taskConfigs).forEach(_0x33e80d => {
      this.taskStats[_0x33e80d] = {
        success: 0,
        failed: 0,
        totalReward: 0
      };
    });
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = 10;
    this.lowRewardLimit = 3;
    this.stopAllTasks = false;
    this.taskLowRewardStreak = {};
    this.taskStopFlags = {};
    Object.keys(this.taskConfigs).forEach(_0x1a4316 => {
      this.taskLowRewardStreak[_0x1a4316] = 0;
      this.taskStopFlags[_0x1a4316] = false;
    });
    this.taskFailureStreak = {};
    this.continuousFailureLimit = 2;
    this.taskStoppedByFailure = {};
    Object.keys(this.taskConfigs).forEach(_0x462779 => {
      this.taskFailureStreak[_0x462779] = 0;
      this.taskStoppedByFailure[_0x462779] = false;
    });
    this.taskLimitReached = {};
    Object.keys(this.taskConfigs).forEach(_0x3c89ca => {
      this.taskLimitReached[_0x3c89ca] = false;
    });
  }
  async checkCoinLimit() {
    try {
      const _0x27d6b9 = await getAccountBasicInfo(this.cookie, this.proxyUrl, this.index);
      if (_0x27d6b9 && _0x27d6b9.totalCoin) {
        const _0xdfe972 = parseInt(_0x27d6b9.totalCoin);
        if (_0xdfe972 >= this.coinLimit) {
          logWithColor("RED", "⚠️", "账号[" + this.nickname + "] 金币已达 " + _0xdfe972 + "，超过 " + this.coinLimit + " 阈值，将停止任务");
          this.coinExceeded = true;
          this.stopAllTasks = true;
          return true;
        }
      }
      return false;
    } catch (_0x59cd22) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 金币检查异常: " + _0x59cd22.message);
      return false;
    }
  }
  extractCookieInfo() {
    try {
      const _0x59e1f9 = this.cookie.match(/egid=([^;]+)/);
      const _0x1971fb = this.cookie.match(/did=([^;]+)/);
      const _0x41f03f = this.cookie.match(/userId=([^;]+)/);
      const _0x1e4888 = this.cookie.match(/kuaishou\.api_st=([^;]+)/);
      const _0x45e087 = this.cookie.match(/appver=([^;]+)/);
      this.egid = _0x59e1f9 ? _0x59e1f9[1] : "";
      this.did = _0x1971fb ? _0x1971fb[1] : "";
      this.userId = _0x41f03f ? _0x41f03f[1] : "";
      this.kuaishouApiSt = _0x1e4888 ? _0x1e4888[1] : "";
      this.appver = _0x45e087 ? _0x45e087[1] : "";
      (!this.egid || !this.did) && logWithColor("YELLOW", "⚠️", "账号[" + this.nickname + "] cookie格式可能无 egid 或 did，但继续尝试...");
    } catch (_0x1cee59) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 解析cookie失败: " + _0x1cee59.message);
    }
  }
  getTaskStats() {
    return this.taskStats;
  }
  printTaskStats() {
    logWithColor("MAGENTA", "📊", "\n账号[" + this.nickname + "] 任务执行统计:");
    for (const [_0x57618c, _0x3393b0] of Object.entries(this.taskStats)) {
      const _0x14b1ea = this.taskConfigs[_0x57618c].name;
      logWithColor("CYAN", "  -", _0x14b1ea + ": 成功" + _0x3393b0.success + "次, 失败" + _0x3393b0.failed + "次, 总奖励" + _0x3393b0.totalReward + "金币");
    }
  }
  async retryOperation(_0x36977d, _0x34c180, _0x3ca27f = 3, _0xa8796d = 2000) {
    let _0x59d0c8 = 0;
    let _0x36f522 = null;
    while (_0x59d0c8 < _0x3ca27f) {
      try {
        const _0x5a6b7b = await _0x36977d();
        if (_0x5a6b7b) {
          return _0x5a6b7b;
        }
        _0x36f522 = new Error(_0x34c180 + " 返回空结果");
      } catch (_0x3229c3) {
        _0x36f522 = _0x3229c3;
        logWithColor("RED", "❌", "账号[" + this.nickname + "] " + _0x34c180 + " 异常: " + _0x3229c3.message);
      }
      _0x59d0c8++;
      _0x59d0c8 < _0x3ca27f && (logWithColor("YELLOW", "⚠️", "账号[" + this.nickname + "] " + _0x34c180 + " 失败，重试 " + _0x59d0c8 + "/" + _0x3ca27f), await new Promise(_0x32ca9f => setTimeout(_0x32ca9f, _0xa8796d)));
    }
    return null;
  }
  async getAdInfo(_0xaf1af9) {
    try {
      const _0x56acaa = "/rest/e/reward/mixed/ad";
      const _0x2bc42f = {
        encData: "|encData|",
        sign: "|sign|",
        cs: "false",
        client_key: "2ac2a76d",
        videoModelCrowdTag: "1_23",
        os: "android",
        "kuaishou.api_st": this.kuaishouApiSt,
        uQaTag: "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
      };
      const _0xba3e95 = {
        earphoneMode: "1",
        mod: "Xiaomi(23116PN5BC)",
        appver: this.appver,
        isp: "CUCC",
        language: "zh-cn",
        ud: this.userId,
        did_tag: "0",
        net: "WIFI",
        kcv: "1599",
        app: "0",
        kpf: "ANDROID_PHONE",
        ver: "11.6",
        android_os: "0",
        boardPlatform: "pineapple",
        kpn: "NEBULA",
        androidApiLevel: "35",
        country_code: "cn",
        sys: "ANDROID_15",
        sw: "1080",
        sh: "2400",
        abi: "arm64",
        userRecoBit: "0"
      };
      const _0x344dc9 = {
        appInfo: {
          appId: "kuaishou_nebula",
          name: "快手极速版",
          packageName: "com.kuaishou.nebula",
          version: this.appver,
          versionCode: -1
        },
        deviceInfo: {
          osType: 1,
          osVersion: "15",
          deviceId: this.did,
          screenSize: {
            width: 1080,
            height: 2249
          },
          ftt: ""
        },
        userInfo: {
          userId: this.userId,
          age: 0,
          gender: ""
        },
        impInfo: [{
          pageId: 11101,
          subPageId: _0xaf1af9.subPageId,
          action: 0,
          browseType: 3,
          impExtData: "{}",
          mediaExtData: "{}"
        }]
      };
      const _0x3447a3 = Buffer.from(JSON.stringify(_0x344dc9)).toString("base64");
      const _0xd78f8a = await this.generateSignature2(_0x56acaa, querystring.stringify({
        ..._0xba3e95,
        ..._0x2bc42f
      }), this.salt, _0x3447a3);
      if (!_0xd78f8a) {
        logWithColor("YELLOW", "⏱️", "账号[" + this.nickname + "] 服务器拥挤，任务执行中");
        return null;
      }
      const _0x184c64 = {
        ..._0xba3e95,
        sig: _0xd78f8a.sig,
        __NS_sig3: _0xd78f8a.__NS_sig3,
        __NS_xfalcon: "",
        __NStokensig: _0xd78f8a.__NStokensig
      };
      _0x2bc42f.encData = _0xd78f8a.encData;
      _0x2bc42f.sign = _0xd78f8a.sign;
      const _0x33ed09 = "https://api.e.kuaishou.com" + _0x56acaa + "?" + querystring.stringify(_0x184c64);
      const _0x33db86 = await sendRequest({
        method: "POST",
        url: _0x33ed09,
        headers: {
          Host: "api.e.kuaishou.com",
          "User-Agent": this.userAgent || "kwai-android aegon/3.56.0",
          Cookie: "kuaishou_api_st=" + this.kuaishouApiSt
        },
        form: _0x2bc42f,
        timeout: 12000
      }, this.proxyUrl, "账号[" + this.nickname + "] 获取广告");
      if (!_0x33db86) {
        return null;
      }
      if (_0x33db86.errorMsg === "OK" && _0x33db86.feeds && _0x33db86.feeds[0] && _0x33db86.feeds[0].ad) {
        logWithColor("GREEN", "✅", "账号[" + this.nickname + "] 成功获取到广告信息");
        const _0x52c3a5 = _0x33db86.feeds[0].exp_tag || "";
        const _0x82c07 = _0x52c3a5.split("/")[1]?.["split"]("_")?.[0] || "";
        return {
          cid: _0x33db86.feeds[0].ad.creativeId,
          llsid: _0x82c07,
          mediaScene: "video"
        };
      }
      isDevMode && console.log("[调试] getAdInfo 原始响应:", JSON.stringify(_0x33db86));
      return null;
    } catch (_0x248c9e) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 获取广告异常: " + _0x248c9e.message);
      return null;
    }
  }
  async generateSignature(_0x2d9965, _0x11ebfa, _0x2bdbf8, _0x5c551b) {
    try {
      const _0x5aa0d1 = JSON.stringify({
        businessId: _0x5c551b.businessId,
        endTime: this.endTime,
        extParams: "",
        mediaScene: "video",
        neoInfos: [{
          creativeId: _0x2d9965,
          extInfo: "",
          llsid: _0x11ebfa,
          requestSceneType: _0x5c551b.requestSceneType,
          taskType: _0x5c551b.taskType,
          watchExpId: "",
          watchStage: 0
        }],
        pageId: 11101,
        posId: _0x5c551b.posId,
        reportType: 0,
        sessionId: "",
        startTime: this.startTime,
        subPageId: _0x5c551b.subPageId
      });
      const _0x5a2a86 = "bizStr=" + encodeURIComponent(_0x5aa0d1) + "&cs=false&client_key=2ac2a76d";
      const _0x1bbc88 = this.queryParams + "&" + _0x5a2a86;
      const _0xeda58e = await this.requestSignService({
        urlpath: this.taskReportPath,
        urldata: _0x1bbc88,
        api_client_salt: this.salt
      }, "账号[" + this.nickname + "] 生成报告签名");
      if (!_0xeda58e || !_0xeda58e.data) {
        return null;
      }
      return {
        sig: _0xeda58e.data.sig,
        sig3: _0xeda58e.data.__NS_sig3,
        sigtoken: _0xeda58e.data.__NStokensig,
        post: _0x5a2a86
      };
    } catch (_0x4a726b) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 生成签名异常: " + _0x4a726b.message);
      return null;
    }
  }
  async generateSignature2(_0x2343ee, _0x4295ef, _0xa8a025, _0x5f4623) {
    const _0x1081e1 = await this.requestSignService({
      urlpath: _0x2343ee,
      urldata: _0x4295ef,
      api_client_salt: _0xa8a025,
      req_str: _0x5f4623
    }, "账号[" + this.nickname + "] 生成广告签名");
    if (!_0x1081e1) {
      return null;
    }
    return _0x1081e1.data || _0x1081e1;
  }
  async submitReport(_0x818ce3, _0x1acc01, _0x4f0b88, _0x332a19, _0x1ed0df, _0x28edcf) {
    try {
      const _0xbe2ea6 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x818ce3 + "&__NS_sig3=" + _0x1acc01 + "&__NS_xfalcon=&__NStokensig=" + _0x4f0b88);
      const _0x3f3d05 = await sendRequest({
        method: "POST",
        url: _0xbe2ea6,
        headers: {
          Host: "api.e.kuaishou.cn",
          "User-Agent": this.userAgent || "kwai-android aegon/3.56.0",
          Cookie: this.cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: _0x332a19,
        timeout: 12000
      }, this.proxyUrl, "账号[" + this.nickname + "] 提交任务");
      if (!_0x3f3d05) {
        return {
          success: false,
          reward: 0
        };
      }
      if (_0x3f3d05.result === 1) {
        const _0x40b5dc = _0x3f3d05.data?.["neoAmount"] || 0;
        logWithColor("GOLD", "💰", "账号[" + this.nickname + "] " + _0x28edcf.name + _0x40b5dc + "金币奖励！");
        ICONS.GOLD_BONUS_ENABLED && _0x40b5dc < ICONS.GOLD_BONUS_THRESHOLD && (this.did = generateKuaishouDid(), logWithColor("GOLD", "💰", "启动至尊金币专属功能：金币满满 (阈值: " + ICONS.GOLD_BONUS_THRESHOLD + ")"));
        return {
          success: true,
          reward: _0x40b5dc
        };
      }
      if ([20107, 20108, 1003, 415].includes(_0x3f3d05.result)) {
        logWithColor("YELLOW", "⚠️", "账号[" + this.nickname + "] " + _0x28edcf.name + " 已达上限");
        this.taskLimitReached[_0x1ed0df] = true;
        return {
          success: false,
          reward: 0
        };
      }
      logWithColor("RED", "❌", "账号[" + this.nickname + "] " + _0x28edcf.name + " 奖励失败，result=" + _0x3f3d05.result + " msg=" + (_0x3f3d05.errorMsg || ""));
      isDevMode && console.log("[调试] submitReport 原始响应:", JSON.stringify(_0x3f3d05));
      return {
        success: false,
        reward: 0
      };
    } catch (_0x5b7bc9) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 提交任务异常: " + _0x5b7bc9.message);
      return {
        success: false,
        reward: 0
      };
    }
  }
  async requestSignService(_0x1ca3be, _0x4c7a70) {
    const _0x27cd33 = (process.env.km || "").trim();
    if (!_0x27cd33) {
      return null;
    }
    const _0x1e0295 = await sendRequest({
      method: "POST",
      url: proxyApiUrl + "?card_key=" + encodeURIComponent(_0x27cd33),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "X-Card-Key": _0x27cd33
      },
      body: JSON.stringify(_0x1ca3be),
      timeout: 15000
    }, null, _0x4c7a70 + "（签名服务）");
    if (!_0x1e0295) {
      return null;
    }
    if (_0x1e0295.success && _0x1e0295.status === "queued" && _0x1e0295.queue_id) {
      const _0x52701a = await this.pollQueueStatus(_0x1e0295.queue_id);
      if (_0x52701a && _0x52701a.success && (_0x52701a.status === "completed" || _0x52701a.status === "processed")) {
        return _0x52701a;
      }
      logWithColor("YELLOW", "⏱️", "账号[" + this.nickname + "] 服务器拥挤，任务执行中");
      return null;
    }
    if (_0x1e0295.success && (!_0x1e0295.status || _0x1e0295.status === "processed" || _0x1e0295.status === "completed")) {
      return _0x1e0295;
    }
    logWithColor("YELLOW", "⏱️", "账号[" + this.nickname + "] 服务器拥挤，任务执行中");
    return null;
  }
  async pollQueueStatus(_0x158b6e, _0x16479f = 30000, _0x28268e = 2000) {
    const _0x2484a2 = Date.now();
    while (Date.now() - _0x2484a2 < _0x16479f) {
      const _0x14c2b6 = await sendRequest({
        method: "GET",
        url: queueStatusApiUrl + "?queue_id=" + encodeURIComponent(_0x158b6e),
        headers: {
          "User-Agent": this.userAgent || "Mozilla/5.0"
        },
        timeout: 10000
      }, null, "账号[" + this.nickname + "] 签名排队");
      if (_0x14c2b6?.["success"]) {
        if (_0x14c2b6.status === "completed" || _0x14c2b6.status === "processed") {
          return _0x14c2b6;
        }
        if (_0x14c2b6.status === "failed") {
          return _0x14c2b6;
        }
      }
      await new Promise(_0x56ab98 => setTimeout(_0x56ab98, _0x28268e));
    }
    return {
      success: false,
      status: "failed",
      error: "queue_timeout"
    };
  }
  async executeTask(_0x72176d) {
    const _0x1a8b97 = this.taskConfigs[_0x72176d];
    if (!_0x1a8b97) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 未知任务: " + _0x72176d);
      return false;
    }
    if (this.taskLimitReached[_0x72176d] || this.taskStopFlags[_0x72176d] || this.taskStoppedByFailure[_0x72176d]) {
      if (this.taskStopFlags[_0x72176d]) {
        logWithColor("YELLOW", "⚠️", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 因连续低奖励已被停止");
      } else {
        this.taskStoppedByFailure[_0x72176d] && logWithColor("YELLOW", "⚠️", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 因连续失败已被停止");
      }
      return false;
    }
    try {
      const _0x54d4e = await this.retryOperation(() => this.getAdInfo(_0x1a8b97), "获取" + _0x1a8b97.name + "信息", 3);
      if (!_0x54d4e) {
        this.taskStats[_0x72176d].failed++;
        this.taskFailureStreak[_0x72176d]++;
        this.taskFailureStreak[_0x72176d] >= this.continuousFailureLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 连续" + this.continuousFailureLimit + "次失败，停止该任务"), this.taskStoppedByFailure[_0x72176d] = true);
        return false;
      }
      const _0x3ad6ed = Math.floor(Math.random() * 10000) + 30000;
      logWithColor("CYAN", "⏱️", "账号[" + this.nickname + "] ==>" + _0x1a8b97.name + " 随机模拟互动 " + Math.round(_0x3ad6ed / 1000) + " 秒");
      await new Promise(_0x5f323a => setTimeout(_0x5f323a, _0x3ad6ed));
      const _0x493823 = await this.retryOperation(() => this.generateSignature(_0x54d4e.cid, _0x54d4e.llsid, _0x72176d, _0x1a8b97), "生成" + _0x1a8b97.name + "签名", 3);
      if (!_0x493823) {
        this.taskStats[_0x72176d].failed++;
        this.taskFailureStreak[_0x72176d]++;
        this.taskFailureStreak[_0x72176d] >= this.continuousFailureLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 连续" + this.continuousFailureLimit + "次失败，停止该任务"), this.taskStoppedByFailure[_0x72176d] = true);
        return false;
      }
      const _0x26a3ca = await this.retryOperation(() => this.submitReport(_0x493823.sig, _0x493823.sig3, _0x493823.sigtoken, _0x493823.post, _0x72176d, _0x1a8b97), "提交" + _0x1a8b97.name + "报告", 3);
      if (_0x26a3ca?.["success"]) {
        this.taskStats[_0x72176d].success++;
        this.taskStats[_0x72176d].totalReward += _0x26a3ca.reward || 0;
        (_0x26a3ca.reward || 0) <= this.lowRewardThreshold ? (this.lowRewardStreak++, this.taskLowRewardStreak[_0x72176d]++, this.taskLowRewardStreak[_0x72176d] >= this.lowRewardLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止该任务"), this.taskStopFlags[_0x72176d] = true), this.lowRewardStreak >= this.lowRewardLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务"), this.stopAllTasks = true)) : (this.lowRewardStreak = 0, this.taskLowRewardStreak[_0x72176d] = 0, this.taskFailureStreak[_0x72176d] = 0);
        return true;
      }
      this.taskStats[_0x72176d].failed++;
      this.taskFailureStreak[_0x72176d]++;
      this.taskFailureStreak[_0x72176d] >= this.continuousFailureLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 连续" + this.continuousFailureLimit + "次失败，停止该任务"), this.taskStoppedByFailure[_0x72176d] = true);
      return false;
    } catch (_0x4a0948) {
      logWithColor("RED", "❌", "账号[" + this.nickname + "] 任务异常(" + _0x72176d + "): " + _0x4a0948.message);
      this.taskStats[_0x72176d].failed++;
      this.taskFailureStreak[_0x72176d]++;
      this.taskFailureStreak[_0x72176d] >= this.continuousFailureLimit && (logWithColor("RED", "🛑", "账号[" + this.nickname + "] " + _0x1a8b97.name + " 连续" + this.continuousFailureLimit + "次失败，停止该任务"), this.taskStoppedByFailure[_0x72176d] = true);
      return false;
    }
  }
  async executeAllTasksByPriority() {
    const _0x285f29 = Object.keys(this.taskConfigs);
    const _0x3b7f64 = {};
    for (const _0x303d00 of _0x285f29) {
      if (this.stopAllTasks) {
        break;
      }
      logWithColor("MAGENTA", "🚀", "账号[" + this.nickname + "] 开始任务：" + this.taskConfigs[_0x303d00].name);
      _0x3b7f64[_0x303d00] = await this.executeTask(_0x303d00);
      if (this.stopAllTasks) {
        break;
      }
      if (_0x303d00 !== _0x285f29[_0x285f29.length - 1]) {
        const _0x3f6026 = Math.floor(Math.random() * 27000) + 3000;
        logWithColor("CYAN", "⏱️", "账号[" + this.nickname + "] 下一个任务，随机等待 " + Math.round(_0x3f6026 / 1000) + " 秒");
        await new Promise(_0x49b368 => setTimeout(_0x49b368, _0x3f6026));
      }
    }
    return _0x3b7f64;
  }
}
async function concurrentExecute(_0xd6c8c5, _0x2dc13d, _0x531364) {
  const _0x46f77d = new Array(_0xd6c8c5.length);
  let _0x94c8f4 = 0;
  async function _0x306679() {
    while (true) {
      const _0x43ff3d = _0x94c8f4++;
      if (_0x43ff3d >= _0xd6c8c5.length) {
        return;
      }
      const _0x7ba2a9 = _0xd6c8c5[_0x43ff3d];
      try {
        _0x46f77d[_0x43ff3d] = await _0x531364(_0x7ba2a9, _0x43ff3d);
      } catch (_0x46b38e) {
        logWithColor("RED", "❌", "并发执行异常（index=" + (_0x43ff3d + 1) + "）：" + _0x46b38e.message);
        _0x46f77d[_0x43ff3d] = null;
      }
    }
  }
  const _0x36789d = Array.from({
    length: Math.min(_0x2dc13d, _0xd6c8c5.length)
  }, _0x306679);
  await Promise.all(_0x36789d);
  return _0x46f77d;
}
async function processAccount(_0x16fbc6, _0x5448e5 = 10) {
  if (_0x16fbc6.proxyUrl) {
    logWithColor("BLUE", "🔌", "账号[" + _0x16fbc6.index + "] 测试代理连接中...");
    const _0x5dfc1e = await testProxyConnectivity(_0x16fbc6.proxyUrl, "账号[" + _0x16fbc6.index + "]");
    _0x5dfc1e.ok ? logWithColor("BLUE", "  -", "代理连接成功：" + _0x5dfc1e.msg) : logWithColor("RED", "  -", "代理连接失败：" + _0x5dfc1e.msg);
  } else {
    logWithColor("BLUE", "🔌", "账号[" + _0x16fbc6.index + "] 未配置代理，走直连");
  }
  let _0x57237f = await getAccountBasicInfo(_0x16fbc6.cookie, _0x16fbc6.proxyUrl, _0x16fbc6.index, _0x16fbc6.userAgent);
  let _0x6edecb = _0x57237f?.["nickname"] || "账号" + _0x16fbc6.index;
  if (_0x57237f) {
    const _0x3702c3 = _0x57237f.totalCoin != null ? _0x57237f.totalCoin : "未知";
    const _0x3fd098 = _0x57237f.allCash != null ? _0x57237f.allCash : "未知";
    logWithColor("GOLD", "💰", "账号[" + _0x6edecb + "] 初始金币: " + _0x3702c3 + "，初始余额: " + _0x3fd098);
  } else {
    logWithColor("YELLOW", "⚠️", "账号[" + _0x6edecb + "] 基本信息获取失败，继续执行");
  }
  const _0x1a47ef = new KuaishouAdTask({
    ..._0x16fbc6,
    nickname: _0x6edecb
  });
  await _0x1a47ef.checkCoinLimit();
  if (_0x1a47ef.coinExceeded) {
    logWithColor("RED", "❌", "账号[" + _0x1a47ef.nickname + "] 初始金币已超过阈值，不执行任务");
    const _0xa77980 = await getAccountBasicInfo(_0x16fbc6.cookie, _0x16fbc6.proxyUrl, _0x16fbc6.index, _0x16fbc6.userAgent);
    const _0x1539ca = _0x57237f?.["totalCoin"] || 0;
    const _0x2de25d = _0xa77980?.["totalCoin"] || 0;
    const _0xa354b0 = _0x2de25d - _0x1539ca;
    const _0x3635b9 = _0x57237f?.["allCash"] || 0;
    const _0xa4b53f = _0xa77980?.["allCash"] || 0;
    const _0x31d42b = _0xa4b53f - _0x3635b9;
    return {
      index: _0x16fbc6.index,
      nickname: _0x6edecb,
      remark: _0x16fbc6.remark || "",
      initialCoin: _0x1539ca,
      finalCoin: _0x2de25d,
      coinChange: _0xa354b0,
      initialCash: _0x3635b9,
      finalCash: _0xa4b53f,
      cashChange: _0x31d42b,
      stats: _0x1a47ef.getTaskStats(),
      coinLimitExceeded: true
    };
  }
  for (let _0x35edb7 = 0; _0x35edb7 < _0x5448e5; _0x35edb7++) {
    if (_0x1a47ef.coinExceeded) {
      break;
    }
    _0x1a47ef.roundCounter++;
    const _0xd797ee = Math.floor(Math.random() * 27000) + 3000;
    logWithColor("CYAN", "⏱️", "账号[" + _0x1a47ef.nickname + "] 第" + (_0x35edb7 + 1) + "轮，先随机等待 " + Math.round(_0xd797ee / 1000) + " 秒");
    await new Promise(_0x466e59 => setTimeout(_0x466e59, _0xd797ee));
    const _0x1ab290 = await _0x1a47ef.executeAllTasksByPriority();
    await _0x1a47ef.checkCoinLimit();
    if (_0x1a47ef.coinExceeded) {
      break;
    }
    Object.values(_0x1ab290).some(Boolean) ? logWithColor("GREEN", "✅", "账号[" + _0x1a47ef.nickname + "] 第" + (_0x35edb7 + 1) + "轮执行完成") : logWithColor("YELLOW", "⚠️", "账号[" + _0x1a47ef.nickname + "] 第" + (_0x35edb7 + 1) + "轮没有成功任务");
    if (_0x1a47ef.stopAllTasks) {
      break;
    }
    if (_0x35edb7 < _0x5448e5 - 1) {
      if (ICONS.SLEEP_ENABLED) {
        if (_0x1a47ef.roundCounter % ICONS.LONG_SLEEP_INTERVAL === 0) {
          const _0x44011c = ICONS.LONG_SLEEP_MIN * 60 * 1000;
          const _0xcc7997 = ICONS.LONG_SLEEP_MAX * 60 * 1000;
          const _0x41d9ed = Math.floor(Math.random() * (_0xcc7997 - _0x44011c)) + _0x44011c;
          const _0x2dc007 = Math.round(_0x41d9ed / 60000);
          logWithColor("MAGENTA", "💤", "账号[" + _0x1a47ef.nickname + "] 防黑休眠挂机中（长休眠），" + _0x2dc007 + "分钟后继续执行任务");
          await new Promise(_0x211789 => setTimeout(_0x211789, _0x41d9ed));
          logWithColor("GREEN", "✅", "账号[" + _0x1a47ef.nickname + "] 已休息完成，继续执行任务");
        } else {
          const _0x11e651 = ICONS.SHORT_SLEEP_INTERVAL_MAX - ICONS.SHORT_SLEEP_INTERVAL_MIN + 1;
          const _0x216d81 = Math.floor(Math.random() * _0x11e651) + ICONS.SHORT_SLEEP_INTERVAL_MIN;
          const _0x21ca99 = _0x1a47ef.roundCounter % _0x216d81 === 0;
          if (_0x21ca99 && _0x1a47ef.roundCounter > 0) {
            const _0x5929d9 = ICONS.SHORT_SLEEP_MIN * 60 * 1000;
            const _0x32a574 = ICONS.SHORT_SLEEP_MAX * 60 * 1000;
            const _0x14e0fa = Math.floor(Math.random() * (_0x32a574 - _0x5929d9)) + _0x5929d9;
            const _0x7e962a = Math.round(_0x14e0fa / 60000);
            logWithColor("MAGENTA", "💤", "账号[" + _0x1a47ef.nickname + "] 防黑休眠挂机中（短休眠），" + _0x7e962a + "分钟后继续执行任务");
            await new Promise(_0x243c8f => setTimeout(_0x243c8f, _0x14e0fa));
            logWithColor("GREEN", "✅", "账号[" + _0x1a47ef.nickname + "] 已休息完成，继续执行任务");
          }
        }
      }
      const _0x549f87 = Math.floor(Math.random() * 27000) + 3000;
      logWithColor("CYAN", "⏱️", "账号[" + _0x1a47ef.nickname + "] 等待 " + Math.round(_0x549f87 / 1000) + " 秒进入下一轮");
      await new Promise(_0x38620e => setTimeout(_0x38620e, _0x549f87));
    }
  }
  const _0x87b5ba = await getAccountBasicInfo(_0x16fbc6.cookie, _0x16fbc6.proxyUrl, _0x16fbc6.index, _0x16fbc6.userAgent);
  const _0x41464d = _0x57237f?.["totalCoin"] || 0;
  const _0x5817c = _0x87b5ba?.["totalCoin"] || 0;
  const _0x5d0b72 = _0x5817c - _0x41464d;
  const _0x5147e0 = _0x57237f?.["allCash"] || 0;
  const _0xff6c13 = _0x87b5ba?.["allCash"] || 0;
  const _0xd0a5a4 = _0xff6c13 - _0x5147e0;
  _0x1a47ef.printTaskStats();
  return {
    index: _0x16fbc6.index,
    nickname: _0x6edecb,
    remark: _0x16fbc6.remark || "",
    initialCoin: _0x41464d,
    finalCoin: _0x5817c,
    coinChange: _0x5d0b72,
    initialCash: _0x5147e0,
    finalCash: _0xff6c13,
    cashChange: _0xd0a5a4,
    stats: _0x1a47ef.getTaskStats(),
    coinLimitExceeded: _0x1a47ef.coinExceeded
  };
}
function printAccountsSummary(_0x52a52f) {
  if (!_0x52a52f.length) {
    logWithColor("RED", "❌", "没有可显示的账号信息");
    return;
  }
  console.log("\n\n[35m[1m" + "=".repeat(80) + "[0m");
  console.log("[35m[1m|[33m" + centerAlign("      账号信息汇总表      ", 78) + "[35m" + "[1m" + "|" + "[0m");
  console.log("[35m[1m" + "=".repeat(80) + "[0m");
  const _0x18b6ef = ["备注", "账号名", "金币余额", "金币变化"];
  const _0xabbb4b = [15, 24, 15, 21];
  let _0x2eb713 = "[36m|[0m";
  _0x18b6ef.forEach((_0x42d3cf, _0x30658c) => {
    _0x2eb713 += "[33m[1m" + centerAlign(_0x42d3cf, _0xabbb4b[_0x30658c]) + "[36m" + "|" + "[0m";
  });
  console.log(_0x2eb713);
  let _0x273c25 = "[36m|[0m";
  _0xabbb4b.forEach(_0x4d6edd => {
    _0x273c25 += "[36m" + "=".repeat(_0x4d6edd) + "[36m" + "|" + "[0m";
  });
  console.log(_0x273c25);
  _0x52a52f.forEach(_0x29e516 => {
    let _0x406755 = "[36m|[0m";
    const _0x2781ca = _0x29e516.remark || "无";
    _0x406755 += "[35m" + centerAlign(_0x2781ca.substring(0, _0xabbb4b[0] - 2), _0xabbb4b[0]) + "[36m" + "|" + "[0m";
    const _0x2c1310 = _0x29e516.nickname || "-";
    _0x406755 += "[34m" + centerAlign(_0x2c1310.substring(0, _0xabbb4b[1] - 2), _0xabbb4b[1]) + "[36m" + "|" + "[0m";
    _0x406755 += "[33m" + centerAlign(_0x29e516.finalCoin, _0xabbb4b[2]) + "[36m" + "|" + "[0m";
    const _0x14df96 = _0x29e516.coinChange >= 0 ? "+" + _0x29e516.coinChange : _0x29e516.coinChange;
    if (_0x29e516.coinChange > 0) {
      _0x406755 += "[32m" + centerAlign(_0x14df96, _0xabbb4b[3]) + "[36m" + "|" + "[0m";
    } else {
      _0x29e516.coinChange < 0 ? _0x406755 += "[31m" + centerAlign(_0x14df96, _0xabbb4b[3]) + "[36m" + "|" + "[0m" : _0x406755 += "[37m" + centerAlign(_0x14df96, _0xabbb4b[3]) + "[36m" + "|" + "[0m";
    }
    console.log(_0x406755);
  });
  console.log("[35m[1m" + "=".repeat(80) + "[0m");
}
const baseRemoteUrl = "http://152.136.134.72:2025";
const proxyApiUrl = baseRemoteUrl + "/proxySign";
const queueStatusApiUrl = baseRemoteUrl + "/queue_status";
(async () => {
  const _0x3c3a26 = 80;
  const _0x1a2bc7 = _0x362565 => {
    const _0x3f366f = Math.max(0, Math.floor((_0x3c3a26 - _0x362565.length) / 2));
    return " ".repeat(_0x3f366f) + _0x362565;
  };
  console.log("");
  console.log("[33m[1m" + _0x1a2bc7("🎉 奥利奥定制版 🎉") + "[0m");
  console.log("[35m[1m" + _0x1a2bc7("🏆 安全稳定 · 高效收益 · 尊贵体验 🏆") + "[0m");
  console.log("[36m[1m" + "=".repeat(_0x3c3a26) + "[0m");
  console.log("[32m[1m" + _0x1a2bc7("🎉 系统初始化完成，快手至尊奥利奥版启动成功！") + "[0m");
  console.log("");
  const _0x2cc4d5 = loadAccountsFromEnv();
  logWithColor("BLUE", "👤", "共找到 " + _0x2cc4d5.length + " 个有效账号");
  !_0x2cc4d5.length && process.exit(1);
  const _0x2f3d8d = 1;
  const _0x244a6c = parseInt(process.env.KUAISHOU_ROUNDS_PER_ACCOUNT) || 100;
  logWithColor("INFO", "ℹ️", "当前设置每账号运行轮次: " + _0x244a6c + " 轮");
  const _0x454ad5 = [];
  await concurrentExecute(_0x2cc4d5, _0x2f3d8d, async _0x5c30a8 => {
    logWithColor("MAGENTA", "🚀", "\n—— 开始账号[" + _0x5c30a8.index + "] ——");
    try {
      const _0x36b6a8 = await processAccount(_0x5c30a8, _0x244a6c);
      _0x454ad5.push(_0x36b6a8);
    } catch (_0x3c3789) {
      logWithColor("RED", "❌", "账号[" + _0x5c30a8.index + "] 执行异常：" + _0x3c3789.message);
    }
  });
  _0x454ad5.sort((_0x1970bb, _0x21773b) => _0x1970bb.index - _0x21773b.index);
  printAccountsSummary(_0x454ad5);
  console.log("\n[33m[1m🎉 全部完成，祝您收益满满！ 🎉[0m");
})();