// test
function crypto(f) {
            var dl = document.getElementById('dl');
            dl.innerText = 'Loading...';
            var reader = new FileReader();
            reader.readAsBinaryString(f);
            reader.onload = function () {
                var iFile = new Uint8ClampedArray(this.result.length);
                for (var p = 0; p < this.result.length; p++) {
                    iFile[p] = this.result.charCodeAt(p);
                };
                var icode = parseInt(iFile.length / 3);
                var cw = ch = parseInt(Math.sqrt(icode) + 1);
                var c = document.getElementById("canvas");
                (cw * (ch - 1) > icode) ? ch-- : ch;
                c.width = cw;
                c.height = ch;
                var ctx = c.getContext("2d");
                var imgData = ctx.createImageData(cw, ch);
                for (var i = n = 0; i < iFile.length; i += 3) {
                    imgData.data[n] = iFile[i];
                    imgData.data[n + 1] = iFile[i + 1];
                    imgData.data[n + 2] = iFile[i + 2];
                    imgData.data[n + 3] = 255;
                    n += 4;
                };
                iFile = null;
                ctx.putImageData(imgData, 0, 0);
                var dataUrl = c.toDataURL();
                var dataB64 = dataUrl.substr(dataUrl.indexOf(',') + 1);
                var binary = atob(dataB64);
                var dataBuf = new Uint8ClampedArray(binary.length);
                for (var d = 0; d < binary.length; d++) {
                    dataBuf[d] = binary.charCodeAt(d);
                };
                var fileBlob = new Blob([dataBuf]);
                var dataUrl = window.URL.createObjectURL(fileBlob);
                dl.href = dataUrl;
                dl.innerText = dl.download = f.name + '.dpc.png';
            };
        };
        function uncrypto(f) {
            var dl = document.getElementById('dl');
            dl.innerText = 'Loading...';
            var reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = function () {
                var image = new Image();
                image.src = this.result;
                image.onload = function () {
                    var c = document.getElementById("canvas");
                    var ctx = c.getContext("2d");
                    var maxW = c.width = this.width;
                    var maxH = c.height = this.height;
                    ctx.drawImage(this, 0, 0, maxW, maxH);
                    var imgData = ctx.getImageData(0, 0, maxW, maxH);
                    var oFile = new Array();
                    for (var i = 0; i < imgData.data.length; i += 4) {
                        if (imgData.data[i + 3] !== 0) {
                            oFile.push(imgData.data[i]);
                            oFile.push(imgData.data[i + 1]);
                            oFile.push(imgData.data[i + 2]);
                        };
                    };
                    (oFile[oFile.length - 1] === 0) ? oFile.pop() : null;
                    (oFile[oFile.length - 1] === 0) ? oFile.pop() : null;
                    var dataBuf = new Uint8ClampedArray(oFile.length);
                    for (var b = 0; b < oFile.length; b++) {
                        dataBuf[b] = oFile[b];
                    }
                    oFile = null;
                    var fileBlob = new Blob([dataBuf], { type: '' });
                    var dataUrl = window.URL.createObjectURL(fileBlob);
                    dl.href = dataUrl;
                    dl.innerText = dl.download = f.name.slice(0, f.name.length - 8);
                };
            };
        };
