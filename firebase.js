  var firebaseConfig = {
        apiKey: "AIzaSyADFzYFDM3D6__WXHZ0RvwxzHspzFvEwmw",
        authDomain: "pemersatu-7b002.firebaseapp.com",
        projectId: "pemersatu-7b002",
        storageBucket: "pemersatu-7b002.appspot.com",
        messagingSenderId: "867511991001",
        appId: "1:867511991001:web:bcff279318ec224859dcc8",
        measurementId: "G-QCED8REGCD"
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();
    let currentToken = '';

    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            displayOnPage('Izin notifikasi diberikan.');
            messaging.getToken().then((token) => {
                if (token) {
                    currentToken = token;
                    sendTokenToServer(token);
                } else{
                    displayOnPage('Tidak ada token pendaftaran yang tersedia. Minta izin untuk menghasilkan satu. <a href="https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=ms">Ketahui lebih lanjut</a>');
                }
            }).catch((err) => {
                displayOnPage('Terjadi kesalahan saat mengambil token. ' + err + ' <a href="https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token">Ketahui lebih lanjut</a>');
            });
        } else {
            displayOnPage('Tidak dapat mendapatkan izin untuk memberi notifikasi. <a href="https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=ms">Ketahui lebih lanjut</a>');
        }
    });

    function sendTokenToServer(token) {
        if (token) {
            fetch('https://pwa.pemersatu.fun/fb.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'token=' + encodeURIComponent(token) + '&action=store',
            })
            .then(response => response.text())
            .then(data => displayOnPage(data))
            .catch((error) => {
                displayOnPage('Error: ' + error + ' <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Ketahui lebih lanjut</a>');
            });
        }
    }

    function deleteTokenFromServer(token) {
        if (token) {
            fetch('https://pwa.pemersatu.fun/fb.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'token=' + encodeURIComponent(token) + '&action=delete',
            })
            .then(response => response.text())
            .then(data => displayOnPage(data))
            .catch((error) => {
                displayOnPage('Error: ' + error + ' <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Ketahui lebih lanjut</a>');
            });
        }
    }

    messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
            displayOnPage('Token refreshed.');
            // Delete old token from server and add this new one to the server.
            deleteTokenFromServer(currentToken);
            sendTokenToServer(refreshedToken);
            currentToken = refreshedToken;
        }).catch((err) => {
            displayOnPage('Unable to retrieve refreshed token ' + err + ' <a href="https://firebase.google.com/docs/cloud-messaging/js/client#monitor-token-refresh">Ketahui lebih lanjut</a>');
        });
    });

    function displayOnPage(message) {
        // Cek apakah pengguna sudah menutup notifikasi
        var noticeClosed = localStorage.getItem('noticeClosed');
        var noticeClosedDate = new Date(noticeClosed);
        var now = new Date();

        // Jika pengguna belum menutup notifikasi atau sudah lebih dari 3 hari sejak mereka menutupnya
        if (!noticeClosed || now.getTime() - noticeClosedDate.getTime() > 3*24*60*60*1000) {
            document.getElementById('message-text').innerHTML = message;
            document.getElementById('floating-message').style.display = 'block';

            // Tutup notifikasi setelah 2 detik
            setTimeout(function() {
                document.getElementById('floating-message').style.display = 'none';
            }, 2000);
        }
    }

    function closeNotice() {
        // Tutup notifikasi
        document.getElementById('floating-message').style.display = 'none';

        // Simpan tanggal dan waktu saat pengguna menutup notifikasi
        localStorage.setItem('noticeClosed', new Date());
    }
