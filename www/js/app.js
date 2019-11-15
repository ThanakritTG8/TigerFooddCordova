var firebaseConfig = {
  apiKey: "AIzaSyDWxIv_Yc22Fc0UJApkZqjnbmV-qiqbbPY",
  authDomain: "tgfood-6eaae.firebaseapp.com",
  databaseURL: "https://tgfood-6eaae.firebaseio.com",
  projectId: "tgfood-6eaae",
  storageBucket: "tgfood-6eaae.appspot.com",
  messagingSenderId: "1084753868707",
  appId: "1:1084753868707:web:a1abd0b24cada4e4394c16",
  measurementId: "G-BCXTW2P2C1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//Use firestore
var db = firebase.firestore();

var select_locationmap_lat = 'Please Select' ;
var select_locationmap_lng = 'Please Select' ;

// function
function restaurent(id) {
  localStorage.setItem("selectedrestaurent", id);
  $("#myNavigator")[0].pushPage("listMenu.html");
}

var rid = [];
var rname = [];
var rlist = [];
var prices = [];
var rprice = parseInt(0);
function addtocart(id, name, list, price) {
  rprice = parseInt(price);
  prices.push(rprice);

  localStorage.setItem("setid", id);
  localStorage.setItem("setname", name);
  localStorage.setItem("setlist", list);

  var setId = localStorage.getItem("setid");
  var setName = localStorage.getItem("setname");
  var setList = localStorage.getItem("setlist");

  rprice = prices + parseInt(price);
  console.log(
    "ID หลัก: " +
    setName +
    " " +
    "id: " +
    setId +
    "menu: " +
    " " +
    setList +
    " " +
    "price : " +
    price +
    " " +
    "sum: " +
    prices
  );
  const array_order = [id];
  for (let i = 0; i < array_order.length; i++) {
    rlist.push(setList);
    rname.push(setName);
  }
  
  // for (let i = 0; i < prices.length; i++) {
  //   const element = array[i];
    
  // }

}


//page
document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });

    $("#cart").click(function () {
      $("#content")[0].load("cart.html");
      $("#sidemenu")[0].close();
    });

    $("#map").click(function () {
      $("#content")[0].load("map.html");
      $("#sidemenu")[0].close();
    });

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#setting").click(function () {
      $("#content")[0].load("profile.html");
      $("#sidemenu")[0].close();
    });
  }


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    //homepage
    $("#dessert").click(function () {
      localStorage.setItem("selectedCategory", "dessert");
      $("#myNavigator")[0].pushPage("category.html");
    });

    $("#pearltea").click(function () {
      localStorage.setItem("selectedCategory", "pearltea");
      $("#myNavigator")[0].pushPage("category.html");
    });

    $("#cookedtoOrder").click(function () {
      localStorage.setItem("selectedCategory", "cookToOrder");
      $("#myNavigator")[0].pushPage("category.html");
    });

    $("#fastfood").click(function () {
      localStorage.setItem("selectedCategory", "fastfood");
      $("#myNavigator")[0].pushPage("category.html");
    });

    $("#chickenrice").click(function () {
      localStorage.setItem("selectedCategory", "chickenrice");
      $("#myNavigator")[0].pushPage("category.html");
    });

    $("#noodle").click(function () {
      localStorage.setItem("selectedCategory", "noodle");
      $("#myNavigator")[0].pushPage("category.html");
    });

    page.querySelector('#carousel').addEventListener("postchange", function () {
      page.querySelector('#dot0').classList.remove("circle_current");
      page.querySelector('#dot1').classList.remove("circle_current");
      page.querySelector('#dot2').classList.remove("circle_current");
      page.querySelector('#dot3').classList.remove("circle_current");
      page.querySelector('#dot' + page.querySelector('#carousel').getActiveIndex()).classList.add("circle_current");

    });


    $("#slidemenu").empty();
    db.collection("slidemenu").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var item = `<ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">  
        <img src="${doc.data().url}" alt="" style="width:400px ; height:250px" >
        </ons-carousel-item>`;

        $("#carousel").append(item);
      });
    });


  }


  if (page.id === 'categoryPage') {
    console.log();



    $("#restaurent_recommended").empty();
    var category = localStorage.getItem("selectedCategory");
    db.collection("restaurent").where("category", "==", category).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var item = `<ons-card class="restaurent" onclick="restaurent('${doc.data().resid}');">
        <ons-row style="width:100%">
            <div class="left" style="width:30%">
                <img class="photorestaurent"
                    src="${doc.data().resUrl}"
                    alt="" id="${doc.data().resid}">
            </div>
            <div class="center" style="width:40%; margin-top:30px; ">
                <a class="text">${doc.data().resname}</a>
            </div>
            <div class="right" style="width:30%; margin-top:30px">
                <a class="rating">${doc.data().rating}<ons-icon icon="fa-star" class="starRating">
                    </ons-icon>
                </a>
            </div>
        </ons-row>
    </ons-card>`;
        $("#restaurent_recommended").append(item);

      });

    });
  }

  if (page.id === 'listmenu') {


    $("#menu").empty();
    var resid = localStorage.getItem("selectedrestaurent");
    db.collection("restaurent").where("resid", "==", resid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-card class="resdetail" >
        <p class="resname">${doc.data().resname}</p>
      <p class="resrating">rating : ${doc.data().rating}<ons-icon icon="fa-star"></ons-icon></p>
        <p class="opentime">${doc.data().time}</p>
        <p class="tel">${doc.data().tel}</p>
        </ons-card>`;
        $("#menu").append(item);

        doc.data().menu.forEach(element => {

          var item = `<ons-card class="list" 
          onclick="ons.notification.toast('Hi there!', { timeout: 1000, animation: 'fade' }); 
          addtocart(${doc.data().resid},'${doc.data().resname}', '${element.list}', ${element.price});">
          <ons-row>
              <div class="left" style="width:50%">
                  <a class="listmenu">${element.list}</a>
              </div>
              <div class="right" style="width: 50%;">
                  <a class="price">${element.price}฿</a>
              </div>
          </ons-row>
      </ons-card>`;
          $("#list").append(item);

        });

        doc.data().topping.forEach(element => {

          var item = `<ons-card class="list" 
          onclick="ons.notification.toast('Hi there!', { timeout: 1000, animation: 'fall' }); 
          addtocart(${doc.data().resid}, '${doc.data().resname}', '${element.type}', ${element.price});">
            <ons-row>
                <div class="left" style="width:50%">
                    <a class="listmenu">${element.type}</a>
                </div>
                <div class="right" style="width: 50%;">
                    <a class="price">${element.price}฿</a>
                </div>
            </ons-row>
        </ons-card>`
          $("#topping").append(item);
        });


      });
    });
  }


//map
if (page.id === 'mapPage') {

  var onSuccess = function(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    mapboxgl.accessToken =
      "pk.eyJ1IjoidGdyb2NrMTk5NyIsImEiOiJjazJsYXhiNmcwNTdxM2NscDU3M2tndzJrIn0.PpwD7OtiZwmYpr-kQuJv6A";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    var marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(map);

    function onDragEnd() {
      var lngLat = marker.getLngLat();
      select_locationmap_lat = lngLat.lat;
      select_locationmap_lng = lngLat.lng;
      coordinates.style.display = "block";
      coordinates.innerHTML =
        "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;

      localStorage.setItem("LLat", select_locationmap_lat);
      localStorage.setItem("Lng", select_locationmap_lng);
    }

    marker.on("dragend", onDragEnd);
  };

  function onError(error) {
    alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


// profile----------------------------
  if (page.id === 'profilePage') {
    console.log("profile");


    $(".logout1").click(function () {
      $("#content")[0].load("login.html");
    });
  }



  if (page.id === 'cartPage') {
    console.log("cart");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#cartlist").empty();
    for (var i = 0; i < rlist.length; i++) {

      var list = `<ons-list-item>
    
     <div class="center">
         <div class="listmenu">`+ rlist[i] + `</div>
     </div>
     <div class="right">
         <div class="pricemenu">`+ prices[i] + `</div>
     </div>
  </ons-list-item>`;

      $("#cartlist").append(list);
    }

  let sum = 0;

  for (let i = 0; i < prices.length; i++) {
    sum += prices[i];
  }
  console.log(sum);
    var result = ` <ons-list-item>
   <div class="left">
       Total
   </div>
   <div class="right">
       `+ sum +`
   </div>
</ons-list-item>`;

$("#sum").append(result);
  }


  if (page.id === 'loginPage') {
    console.log("loginPage");
    $(".signinbtn").click(function () {
      var username = $("#username").val();
      var password = $("#password").val();

      firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(function () {
          content.load("Resturant_manu.html");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log("errorCode :" + errorCode);
          console.log("errorMessage:" + errorMessage);
          ons.notification.alert("Incorrect Email or Password");
        });
    });

    $("#back_home").click(function () {
      $("#content")[0].load("Resturant_manu.html");
    });


    $("#gmail-button").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .then(function () {
          $("#content")[0].load("Resturant_manu.html");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    });


    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });
  }
});

