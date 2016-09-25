import { Template } from 'meteor/templating';

Session.setDefault("currentUrl", {index: "active", login: "", reg: ""});

Template.container.currentUrl = function () {
  return Session.get("currentUrl");
};

var urlRouter = Backbone.Router.extend({
  routes: {
    "":  "index",
    "login": "login",
    "reg": "reg",
    "logout": "logout"
  },
  index: function () {
    Session.set("currentUrl", {index: "active", login: "", reg: ""});
  },
  login: function () {
    if (Meteor.userId()) {
      this.navigate("/", true);
      Session.set("info", {success: "", error: "用户已在线"});
      return;
    }
    Session.set("currentUrl", {index: "", login: "active", reg: ""});
  },
  reg: function () {
    if (Meteor.userId()) {
      this.navigate("/", true);
      Session.set("info", {success: "", error: "用户已在线"});
      return;
    }
    Session.set("currentUrl", {index: "", login: "", reg: "active"});
  },
  logout: function () {
    if (Meteor.userId()) {
      Meteor.logout();
      this.navigate("/", true);
      Session.set("info", {success: "登出成功", error: ""});
    } else {
      this.navigate("/", true);
      Session.set("info", {success: "", error: "用户不在线"});
    }
  },
  redirect: function (url) {
    this.navigate(url, true);
  }
});

Router = new urlRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

Template.nav.active = function () {
  return Session.get("currentUrl");
};

Template.reg.events({
  'click #submit': function (evt) {
    evt.preventDefault();
    var $username = $("#username").val();
    var $password = $("#password").val();
    var $password_repeat = $("#password-repeat").val();
    if ($password.length ===0 || $username.length ===0) {
      Session.set("info", {success: "", error: "用户名或密码不能为空"});
      return;
    }
    if ($password !== $password_repeat) {
      Session.set("info", {success: "", error: "两次输入密码不一致"});
      return;
    }
    Accounts.createUser({username: $username, password: $password}, function (err) {
      if (err) {
        Session.set("info", {success: "", error: err.reason});
      } else {
        Router.redirect("/");//跳转到主页
        Session.set("info", {success: "注册成功", error: ""});
      }
    });
  }
});

Session.setDefault("info", {success: "", error: ""});

Template.info.info = function () {
  return Session.get("info");
};

Template.login.events({
  'click #submit': function (evt) {
    evt.preventDefault();
    var $username = $("#username").val();
    var $password = $("#password").val();
    if ($password.length ===0 || $username.length ===0) {
      Session.set("info", {success: "", error: "用户名或密码不能为空"});
      return;
    }
    Meteor.loginWithPassword($username, $password, function (err) {
      if (err) {
        Session.set("info", {success: "", error: err.reason});
      } else {
        Router.redirect("/");//跳转到主页
        Session.set("info", {success: "登陆成功", error: ""});
      }
    });
  }
});