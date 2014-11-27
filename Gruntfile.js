/*
grunt.initConfig   // 定义模块的参数配置
grunt.loadNpmTasks // 引用声明，完成任务所需的模块加载
grunt.registerTask // 定义具体的任务   
*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {

      options: {
        banner: '/*\n Minified by Uglify <%=grunt.template.today("yyyy-MM-dd-HH:mm:ss")%>*/\n'
      },

      minify: {
        expand: true,
        cwd: 'js/', //待压缩目录
        src: ['**/*.js', '!**/*.min.js', '!**/full.js'], //过滤待压缩文件
        dest: 'publish/js',
        ext: '.min.js'
      }
    },

    sass: {
      compile: {
        expand: true,
        src: ['*.scss'],
        cwd: 'css',
        dest: 'css',
        ext: '.sprite.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css','**/*.css', '!*.min.css', '!*.sprite.css'],
        dest: 'publish/css',
        ext: '.min.css'
      }
    },

    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['publish/**/*.min.js', '!publish/**/full.min.js'],
        dest: 'publish/js/full.min.js'
      },
      css: {
          src: ['publish/**/*.min.css', '!publish/**/full.min.css'],
        dest: 'publish/css/full.min.css'
      }
    },

    sprite: {
      options: {
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: 'images/slice/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'publish/images/',
        // 替换后的背景路径，默认 ../images/
        spritepath: '../images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true,
        // 默认使用二叉树最优排列算法
        algorithm: 'binary-tree',
        // 默认使用`pngsmith`图像处理引擎
        engine: 'pngsmith'
      },

      autoSprite: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: '*.sprite.css',
          dest: 'css/',
          ext: '.sprited.css'
        }]
      }
    },

    clean: {
        build: {
            src: ['.sass-cache/', 'publish/', 'css/*.sprited.css', 'css/*.sprite.css']
        }
    },

    watch: {
      scripts: {
        files: ['js/*.js','css/*.scss'],
        tasks: ['init'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-css-sprite');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // task(s).
  // 压缩js
  grunt.registerTask('jsminify', ['uglify']);
  // 合并js
  grunt.registerTask('jscombo', ['concat:js']);
  // sass编译css
  grunt.registerTask('sassc', ['sass']);
  // 压缩css
  grunt.registerTask('cssminify', ['cssmin']);
  // css sprite
  grunt.registerTask('isprite', ['sprite']);
  // 合并css
  grunt.registerTask('csscombo', ['concat:css']);
  // 清除编译目录
  grunt.registerTask('cleanup', ['clean:build']);

  grunt.registerTask('jsop', ['uglify', 'concat:js']);
  grunt.registerTask('cssop', ['sass', 'sprite', 'cssmin', 'concat:css']);

  grunt.registerTask('init', ['jsop', 'cssop']);

  grunt.event.on('watch', function(action,filepath){
    grunt.log.writeln('---Found: '+ filepath + ' has changed, processing...');
    grunt.config('jsop',filepath);
    grunt.config('cssop',filepath);
  });

};