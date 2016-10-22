

module.exports = function (grunt) {

	// <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			bulid: ['./cssWeight.js'],
			bulidG: ['Gruntfile.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			bulid: {
				files: ['./cssWeight.js', 'Gruntfile.js', 'cssWeight.css', 'cssWeight.html'],
				tasks: ['jshint'],
				options: {
					//刷新浏览器,启动livereload
					livereload: 35729
				}
			}
		},
		// 通过connect任务，创建一个静态服务器
		connect: {
			options: {
        // 服务器端口号
        port: 8000,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: 'localhost',
        //livereload:35729,
        open: true
      },
      livereload: {
      	options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: function(connect, opitons) {
          	return [
							// 把脚本，注入到静态文件中//可以不用？
							//require('connect-livereload')(),
							require('serve-static')(opitons.base[0], {'index': ['cssWeight.html']})
							];
						}
					}
				}
			}
		});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['jshint', 'connect', 'watch']);
};