// 初始化连接和事件
        function setup() {
            output = document.getElementById("output");
            ws = new WebSocket("ws://echo.websocket.org/echo");
            // 监听open
            ws.onopen = function (e) {
                log("Connected");
                sendMessage("Hello WebSocket!");
            }
            // 监听close
            ws.onclose = function (e) {
                log("Disconnected: " + e.reason);
            }
            //监听errors
            ws.onerror = function (e) {
                log("Error ");
            }
            // 监听 messages 
            ws.onmessage = function (e) {
                log("Message received: " + e.data);
                //收到消息后关闭
                ws.close();
            }
        }
        // 发送消息
        function sendMessage(msg) {
            ws.send(msg);
            log("Message sent");
        }
        // logging
        function log(s) {
            var p = document.createElement("p");
            p.style.wordWrap = "break-word";
            p.textContent = s;
            output.appendChild(p);
            // Also log information on the javascript console
            console.log(s);
        }
        // Start 
        setup();