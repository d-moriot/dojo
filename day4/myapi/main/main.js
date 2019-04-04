function testapi() {
  let request = new XMLHttpRequest();
  request.open('GET', './api/v1/list');
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    const profilewrapper = document.querySelector('#profile-wrapper');
    profilewrapper.innerHTML = "";
    let introduction = request.response;

    const name = document.createElement('li');
    name.textContent = "名前: " + introduction.name;
    document.getElementById("profile-wrapper").appendChild(name);

    for (var item of introduction.whoami) {
      const whoami = document.createElement('li');
      whoami.textContent = "俺といえば: " + item;
      document.getElementById("profile-wrapper").appendChild(whoami);
    }
  };
}

function apiNode() {
  // APIからJSONを取得する
  fetch('./api/v1/list')
    .then((response) => response.json())
    .then((profile) => {
      // id="profile-container"要素を取得する
      const profileContainer = document.querySelector('#profile-container');

      // コンテナの中身を全部消す
      profileContainer.innerHTML = "";

      const name = document.createElement('li');
      name.textContent = "名前: " + profile.name;
      document.getElementById("profile-container").appendChild(name);

      const age = document.createElement('li');
      age.textContent = "年齢: " + profile.age;
      document.getElementById("profile-container").appendChild(age);

      const job = document.createElement('li');
      job.textContent = "仕事: " + profile.job;
      document.getElementById("profile-container").appendChild(job);

      for (var item of profile.whoami) {
        const whoami = document.createElement('li');
        whoami.textContent = "俺といえば: " + item;
        document.getElementById("profile-container").appendChild(whoami);
      }

      for (var item of profile.fav.hobbies) {
        const hobby = document.createElement('li');
        hobby.textContent = "趣味: " + item;
        document.getElementById("profile-container").appendChild(hobby);
      }

      for (var item of profile.fav.foods) {
        const food = document.createElement('li');
        food.textContent = "飲食: " + item;
        document.getElementById("profile-container").appendChild(food);
      }
    });
}