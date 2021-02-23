document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                
                //muat daftar tautan menu
                document.querySelectorAll(".topnav , .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                //daftarkan event listener utk tiap tautan
                document.querySelectorAll(".sidenav a , .topnav a ").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        //tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        //muat konten halaman yg dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page)
                    });
                });
            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    //Load Page Content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page)
    
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                var content = document.querySelector("#content")
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>"
                } else {
                    content.innerHTML = "<p> ups.. Halaman tidak ditemukan</p>"
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true)
        xhttp.send()
    }
})