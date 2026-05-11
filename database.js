const firebaseConfig = {
    databaseURL: "https://pinoosamp-default-rtdb.asia-southeast1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("jerry_shared_files");

async function uploadFile() {
    const userInp = document.getElementById('u').value;
    const passInp = document.getElementById('p').value;
    const res = await fetch('admin.json');
    const auth = await res.json();

    if (userInp === auth.username && passInp === auth.password) {
        const data = {
            n: document.getElementById('n').value,
            a: document.getElementById('a').value,
            c: document.getElementById('c').value,
            f: document.getElementById('f').value,
            p: document.getElementById('pr').value,
            l: document.getElementById('l').value
        };
        if (data.n && data.l) {
            db.push(data).then(() => {
                alert("Success");
                location.reload();
            });
        }
    } else {
        alert("Denied");
    }
}

db.on("value", (s) => {
    const container = document.getElementById('list');
    container.innerHTML = "";
    s.forEach((child) => {
        const v = child.val();
        container.innerHTML += `
            <div class="card">
                <img src="${v.p}" onerror="this.src='https://via.placeholder.com/400x200/12151c/58a6ff?text=No+Preview'">
                <div class="card-info">
                    <h3>${v.n}</h3>
                    <p><span>Author:</span> ${v.a}</p>
                    <p><span>Command:</span> <code>${v.c}</code></p>
                    <p><span>Fitur:</span> ${v.f}</p>
                    <a href="${v.l}" target="_blank" class="dl">DOWNLOAD</a>
                </div>
            </div>`;
    });
});
