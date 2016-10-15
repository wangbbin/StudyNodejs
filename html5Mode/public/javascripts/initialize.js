window.onload = function() {
  var title = document.querySelector('#title');
  var content = document.querySelector('#content');
  var node = document.querySelector('#node');
  var javascript = document.querySelector('#javascript');
  var resolveContent = function(target) {
    switch (true) {
      case target === '/':
            target = '/articles/index.json';
            break;
      case /node/.test(target):
            target = '/articles/node.json';
            break;
      case /javascript/.test(target):
            target = '/articles/javascript.json';
            break;
    }

    superagent
        .get(target)
        .end(function(err, res) {
          title.textContent = res.body.title;
          content.textContent = res.body.content;
        })
  };

  window.history.replaceState({
    "target": window.location.pathname
  }, null, './');

  window.onpopstate = function(event) {
    resolveContent(event.state.target);
  };

  node.addEventListener('click', function(event) {
    event.preventDefault();

    window.history.pushState({
      "target": "/node/"
    }, null, '/node/');

    resolveContent('/node/');

    window.onpopstate = function(event) {
      resolveContent(event.state.target);
    };
  });
  //pushState修改地址记录，onpopstate表示通过后退方式退回pushState后的路径时，执行何种操作。
  javascript.addEventListener('click', function(event) {
    event.preventDefault();

    window.history.pushState({
      "target": "/javascript/"
    }, null, '/javascript/');

    resolveContent('/javascript/');

    window.onpopstate = function(event) {
      resolveContent(event.state.target);
    };
  });
};