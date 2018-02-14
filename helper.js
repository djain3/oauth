const request = require('request');

module.exports = {
  vkGetToken,
  vkGetFriends,
  isUsed
};

let users = [];

function vkGetToken (code) {
  const reqOptions = {
    url: 'https://oauth.vk.com/access_token?client_id=6361891&client_secret=AvUQ24WUdLipSFkoPahr&redirect_uri=https://fathomless-beach-33.herokuapp.com&code=' + code,
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
    request(reqOptions, (err, res) => {
      if (!err) {
        //db dud
        users[res.body.user_id] = res.body.access_token;
        resolve({user_id: res.body.user_id});
      } else {
        reject(err);
      }
    });
  });
}

function vkGetFriends (user_id) {
  const reqOptions = {
    url: 'https://api.vk.com/method/friends.get?user_id=' + user_id + '&order=random&count=5&fields=nickname,photo_100&access_token=' + users[user_id] + '&v=5.71 ',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
    request(reqOptions, (err, res) => {
      if (!err) {
        //db dud
        users[res.body.user_id] = res.body.access_token;
        resolve(res.body);
      } else {
        reject(err);
      }
    });
  });
}

function isUsed (user_id) {
  const reqOptions = {
    url: 'https://api.vk.com/method/users.isAppUser?user_id=' + user_id + '&access_token=' + users[user_id] + '&v=5.71 ',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return new Promise((resolve, reject) => {
    request(reqOptions, (err, res) => {
      if (!err) {
        //db dud
        users[res.body.user_id] = res.body.access_token;
        resolve(res.body);
      } else {
        reject(err);
      }
    });
  });
}