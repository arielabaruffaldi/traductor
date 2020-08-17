const selector = document.getElementById('translate');
selector.addEventListener('click', (e) => {
    e.preventDefault();
    startLang(selector);
})

const startLang = (el) => {
    let text = el.getAttribute('data-text');
    let file = el.getAttribute('data-file');
    file = file.split(',');
    text = text.split(',');
    let index = el.getAttribute('data-index');
    if (index >= file.length) {
        index = 0;
    }
    changeName(el, text[index]);
    changeIndex(el, index);
    loadLang(file[index]);
    let htmlLang = document.getElementsByTagName('html')[0];
    htmlLang.setAttribute('lang', file[index]);
};

const changeName = function(el, name) {
    el.innerHTML = name;
};

const changeIndex = function(el, index) {
    el.setAttribute('data-index', ++index);
};

const loadLang = (lang) => {
    const processLang = (data) => {
        let arr = data.split('\n');
        for (let i in arr) {
            if (lineValid(arr[i])) {
                let obj = arr[i].split('=>');
                assignText(obj[0], obj[1]);
            }
        }
    };
    const assignText = (key, value) => {
        document.querySelectorAll(`[data-lang=${key}]`).forEach(el => {
            el.innerHTML = value;
        })
    };
    const lineValid = (line) => {
        return (line.trim().length > 0);
    };

    document.getElementsByClassName('loading-lang')[0].classList.add('show')

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName('loading-lang')[0].classList.remove('show')
            processLang(this.responseText)
        }
    };

    xhttp.open("GET", `lang/${lang}.txt`, true);
    xhttp.send();
};