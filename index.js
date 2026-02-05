<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lexrealm</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Orbitron:wght@400;700&display=swap');
        :root { --bg: #000; --text: #ffffff; --text-dim: #b0b0b0; --glass-strong: rgba(255, 255, 255, 0.05); --glass-medium: rgba(255, 255, 255, 0.08); --glass-bright: rgba(255, 255, 255, 0.12); --border: rgba(255, 255, 255, 0.1); }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background: var(--bg); color: var(--text); height: 100vh; overflow: hidden; }
        .bg-gif { position: fixed; inset: 0; background: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJwamNreXptZ3R3eXF4ZzRyeXp4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif') center/cover no-repeat; filter: brightness(0.3) contrast(1.1); z-index: -1; }
        #auth-screen { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 999; backdrop-filter: blur(10px); }
        .login-card { width: 380px; padding: 50px; border: 1px solid var(--border); background: var(--glass-medium); text-align: center; backdrop-filter: blur(20px); box-shadow: 0 0 50px rgba(0,0,0,0.8); }
        .login-card h1 { font-family: 'Orbitron'; font-size: 28px; letter-spacing: 8px; margin-bottom: 40px; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
        .input-box { width: 100%; margin-bottom: 20px; text-align: left; }
        .input-box label { font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px; }
        .input-box input { width: 100%; background: var(--glass-strong); border: 1px solid var(--border); padding: 12px; color: white; outline: none; transition: 0.3s; }
        .input-box input:focus { border-color: #fff; background: var(--glass-bright); }
        .btn { width: 100%; padding: 15px; border: 1px solid #fff; background: transparent; color: white; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .btn:hover { background: white; color: black; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        #main-panel { display: none; height: 100vh; grid-template-columns: 280px 1fr; }
        .sidebar { background: rgba(0, 0, 0, 0.4); border-right: 1px solid var(--border); display: flex; flex-direction: column; backdrop-filter: blur(25px); }
        .user-info { padding: 30px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 15px; }
        .avatar { width: 45px; height: 45px; background: var(--glass-medium); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .avatar img { width: 22px; filter: invert(1); }
        .verified-badge { width: 16px; height: 16px; margin-left: 6px; background-color: #0095f6; display: inline-block; vertical-align: middle; -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.23-.91.23-1.4 0-2.25-1.83-4.07-4.07-4.07-.49 0-.96.08-1.4.23-.71-1.3-2.08-2.18-3.66-2.18s-2.95.88-3.66 2.18c-.44-.15-.91-.23-1.4-.23-2.25 0-4.07 1.83-4.07 4.07 0 .49.08.96.23 1.4C1.38 9.55.5 10.92.5 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.23.91-.23 1.4 0 2.25 1.83 4.07 4.07 4.07.49 0 .96-.08 1.4-.23.71 1.3 2.08 2.18 3.66 2.18s2.95-.88 3.66-2.18c.44.15.91.23 1.4.23 2.25 0 4.07-1.83 4.07-4.07 0-.49-.08-.96-.23-1.4 1.3-.71 2.18-2.08 2.18-3.66z"/></svg>') no-repeat center; mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.23-.91.23-1.4 0-2.25-1.83-4.07-4.07-4.07-.49 0-.96.08-1.4.23-.71-1.3-2.08-2.18-3.66-2.18s-2.95.88-3.66 2.18c-.44-.15-.91-.23-1.4-.23-2.25 0-4.07 1.83-4.07 4.07 0 .49.08.96.23 1.4C1.38 9.55.5 10.92.5 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.23.91-.23 1.4 0 2.25 1.83 4.07 4.07 4.07.49 0 .96-.08 1.4-.23.71 1.3 2.08 2.18 3.66 2.18s2.95-.88 3.66-2.18c.44.15.91.23 1.4.23 2.25 0 4.07-1.83 4.07-4.07 0-.49-.08-.96-.23-1.4 1.3-.71 2.18-2.08 2.18-3.66z"/></svg>') no-repeat center; position: relative; }
        .verified-badge::after { content: ""; position: absolute; top: 4px; left: 6px; width: 3px; height: 6px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
        .nav { flex-grow: 1; overflow-y: auto; padding: 20px 0; }
        .nav-head { padding: 20px 30px 10px; font-size: 10px; color: #888; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }
        .nav-link { padding: 15px 30px; cursor: pointer; color: var(--text-dim); font-size: 13px; font-weight: 500; transition: 0.3s; display: flex; align-items: center; border-left: 3px solid transparent; background: transparent; }
        .nav-link:hover { color: #fff; background: var(--glass-medium); }
        .nav-link.active { color: #fff; background: var(--glass-bright); border-left-color: #fff; font-weight: 700; backdrop-filter: blur(5px); }
        .content { padding: 60px; overflow-y: auto; background: rgba(0,0,0,0.2); }
        .welcome-screen h1 { font-family: 'Orbitron'; font-size: 40px; margin-bottom: 15px; }
        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
        .card { padding: 30px; border: 1px solid var(--border); background: var(--glass-medium); backdrop-filter: blur(10px); transition: 0.3s; }
        .card:hover { border-color: #fff; background: var(--glass-bright); transform: translateY(-5px); }
        .query-container { background: var(--glass-medium); border: 1px solid var(--border); padding: 40px; backdrop-filter: blur(15px); }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .monitor { margin-top: 40px; border: 1px solid var(--border); height: 0; opacity: 0; transition: 0.6s; background: rgba(0,0,0,0.6); position: relative; backdrop-filter: blur(10px); }
        .monitor.active { height: 550px; opacity: 1; }
        iframe { width: 100%; height: 100%; border: none; filter: invert(0.9) hue-rotate(180deg); }
        #toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
        .toast { background: #fff; color: #000; padding: 12px 25px; font-size: 11px; font-weight: 800; margin-top: 10px; }
    </style>
</head>
<body>

    <div class="bg-gif"></div>
    <div id="toast-container"></div>

    <div id="auth-screen">
        <div class="login-card">
            <h1>Cracker Gençler</h1>
            <div class="input-box">
                <label>Username</label>
                <input type="text" id="user_input" placeholder="Kullanıcı Adı">
            </div>
            <div class="input-box">
                <label>Password</label>
                <input type="password" id="pass_input" placeholder="Şifre">
            </div>
            <div class="input-box">
                <label>Key</label>
                <input type="password" id="key_input" placeholder="crk2026">
            </div>
            <button class="btn" onclick="kayit()">Sign Up</button>
            <button class="btn" style="margin-top:10px; background: white; color: black;" onclick="giris()">Log İn</button>
        </div>
    </div>

    <div id="main-panel">
        <div class="sidebar">
            <div class="user-info">
                <div class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/2102/2102647.png"></div>
                <div>
                    <div style="font-weight: 800; font-size: 14px; letter-spacing: 1px; display: flex; align-items: center;" id="display_user">ROOT</div>
                    <div style="font-size: 9px; color: #aaa; display: flex; align-items: center; margin-top: 2px;">
                        VERIFIED ACCESS <span class="verified-badge"></span>
                    </div>
                </div>
            </div>

            <div class="nav">
                <div class="nav-head">Mernis SXRGU</div>
                <div class="nav-link" onclick="ac('adsoyad', this)">Ad Soyad Sorgu</div>
                <div class="nav-link" onclick="ac('tc', this)">TC Sorgu</div>
                <div class="nav-link" onclick="ac('sulale', this)">Sülale Sorgu</div>
                <div class="nav-link" onclick="ac('isyeri', this)">İş Yeri Sorgu</div>

                <div class="nav-head">İletişim & Platform</div>
                <div class="nav-link" onclick="ac('gsm_tc', this)">GSM'den TC</div>
                <div class="nav-link" onclick="ac('tc_gsm', this)">TC'den GSM</div>
                <div class="nav-link" onclick="ac('dcid', this)">Discord ID</div>

                <div class="nav-head">Ekstra SXRGU</div>
                <div class="nav-link" onclick="ac('plaka', this)">Plaka Sorgu</div>
                <div class="nav-link" onclick="ac('multeci', this)">Mülteci Sorgu</div>
                <div class="nav-link" onclick="ac('adres', this)">Adres Sorgu</div>
            </div>
        </div>

        <div class="content">
            <div id="home_v">
                <div class="welcome-screen">
                    <h1>Cracker Gençler | Free</h1>
                    <p style="color: #bbb; letter-spacing: 4px; font-size: 12px; font-weight: 700;">SUPREME GHOST INTERFACE v4.0</p>
                </div>

                <div class="card-grid">
                    <div class="card"><h3>ULTRA FAST</h3><p>Saydam altyapı ile ışık hızında veri işleme.</p></div>
                    <div class="card"><h3>ENCRYPTED</h3><p>Tüm sorgular uçtan uca gizli tünellerle çekilir.</p></div>
                    <div class="card"><h3>UNLIMITED</h3><p>Sınır yok, engel yok. Sadece veri var.</p></div>
                </div>

                <div style="margin-top: 40px; padding: 40px; border: 1px solid var(--border); background: var(--glass-medium); backdrop-filter: blur(10px);">
                    <p style="font-size: 13px; color: #ccc; line-height: 1.8;">
                        Panel tamamen optimize edildi. Arka plandaki veri akışını izlerken sorgularınızı yapabilirsiniz. 
                        Tüm modüller aktif ve güncel API'ler üzerinden çalışmaktadır.
                    </p>
                </div>
            </div>

            <div id="query_v" style="display:none;">
                <h2 id="tool_name" style="font-family: 'Orbitron'; margin-bottom: 25px; letter-spacing: 3px;">SYSTEM_READY</h2>
                <div class="query-container">
                    <div id="input_area" class="input-row"></div>
                    <button class="btn" style="width: 200px; background: white; color: black;" onclick="sorgula()">SORGULA</button>

                    <div id="monitor_v" class="monitor">
                        <div style="position: absolute; top: 15px; right: 15px; background: #fff; color: #000; padding: 5px 12px; font-size: 10px; font-weight: 900; cursor: pointer; z-index: 5;" onclick="kopyala()">KOPYALA</div>
                        <iframe id="api_frame"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Obfuscation Layer: API Masking and Control Logic
        (function(_0x1b2c3d){
            const _0xKEY = "crk2026";
            const _0xM = {
                'YWRzb3lhZA==': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9hcGkvbWVybmlzLnBocD9hZD17djF9JnNveWFkPXt2Mn0=',
                'dGM=': 'aHR0cHM6Ly9hcmFzdGlyLnNicy9hcGkvc3VsYWxlLnBocD90Yz17djF9',
                'c3VsYWxl': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9hcGkvc3VsYWxlLnBocD90Yz17djF9',
                'YWRyZXM=': 'aHR0cHM6Ly9hcmFzdGlyLnNicy9hcGkvYWRyZXMucGhwP3RjPXt2MX0=',
                'aXN5ZXJp': 'aHR0cHM6Ly9hcmFzdGlyLnNicy9hcGkvaXN5ZXJpLnBocD90Yz17djF9',
                'bXVsdGVjaQ==': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9hcGkvbXVsdGVjaS5waHA/dGM9e3YxfQ==',
                'Z3NtX3Rj': 'aHR0cHM6Ly9hcmFzdGlyLnNicy9hcGkvZ3NtdGMucGhwP2dzbT17djF9',
                'dGNfZ3Nt': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9hcGkvZ3NtLnBocD90Yz17djF9',
                'cGxha2E=': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9wbGFrYS9hcGkucGhwP2lzbGVtPWJhc2xhdCZwbGFrYT17djF9',
                'ZGNpZA==': 'aHR0cHM6Ly9odWt1bXN1ei5kZS9hcGkvZGlzY29yZDIucGhwP2lkPXt2MX0='
            };

            const _0xDec = (_0xS) => atob(_0xS);

            window.log = function(msg) {
                const box = document.getElementById('toast-container');
                const el = document.createElement('div');
                el.className = 'toast'; el.innerText = msg;
                box.appendChild(el);
                setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }, 3000);
            };

            window.kayit = function() {
                const u = document.getElementById('user_input').value;
                const p = document.getElementById('pass_input').value;
                if(u && p) { localStorage.setItem('user_'+u, p); log("OPERATOR TANIMLANDI."); }
            };

            window.giris = function() {
                const u = document.getElementById('user_input').value;
                const p = document.getElementById('pass_input').value;
                const k = document.getElementById('key_input').value;
                if(k !== _0xKEY) { log("ACCESS DENIED: WRONG KEY"); return; }
                if(localStorage.getItem('user_'+u) === p && u) {
                    document.getElementById('auth-screen').style.display = 'none';
                    document.getElementById('main-panel').style.display = 'grid';
                    document.getElementById('display_user').innerText = u.toUpperCase();
                    log("SİSTEME ERİŞİM SAĞLANDI.");
                } else { log("KİMLİK DOĞRULANAMADI."); }
            };

            let _0xCM = "";
            window.ac = function(m, el) {
                _0xCM = m;
                document.getElementById('home_v').style.display = 'none';
                document.getElementById('query_v').style.display = 'block';
                document.getElementById('monitor_v').classList.remove('active');
                document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
                el.classList.add('active');
                const area = document.getElementById('input_area');
                document.getElementById('tool_name').innerText = m.toUpperCase().replace('_', ' ');
                area.innerHTML = "";
                if(m === 'adsoyad') {
                    area.innerHTML = `<div class="input-box"><label>İSİM</label><input type="text" id="v1"></div><div class="input-box"><label>SOYİSİM</label><input type="text" id="v2"></div>`;
                } else {
                    area.innerHTML = `<div class="input-box" style="grid-column: span 2;"><label>VERİ GİRİŞİ</label><input type="text" id="v1"></div>`;
                }
            };

            window.sorgula = function() {
                const v1 = document.getElementById('v1')?.value;
                const v2 = document.getElementById('v2')?.value;
                const frame = document.getElementById('api_frame');
                const mon = document.getElementById('monitor_v');
                
                let _0xTarget = btoa(_0xCM);
                if(_0xM[_0xTarget]) {
                    let _0xURL = _0xDec(_0xM[_0xTarget]).replace('{v1}', v1).replace('{v2}', v2);
                    log("VERİ ÇEKME İŞLEMİ BAŞLADI...");
                    mon.classList.add('active');
                    frame.src = _0xURL;
                }
            };

            window.kopyala = function() { log("VERİLER PANEYE ALINDI."); };

            // Anti-Source Protect
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.onkeydown = (e) => {
                if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || (e.ctrlKey && e.keyCode == 85)) return false;
            };
        })();
    </script>
</body>
</html>
