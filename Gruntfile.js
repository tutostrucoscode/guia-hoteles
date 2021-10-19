module.exports = function (grunt) {
  require("time-grunt")(grunt);
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
  });

  grunt.initConfig({
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "css",
            src: ["*.scss"],
            dest: "css",
            ext: ".css",
          },
        ],
      },
    },

    watch: {
      files: ["css/*.scss"],
      tasks: ["css"],
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/*.js"],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
        },
      },
    },

    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "./",
            src: "img/*.{png,gif,jpg,jpeg}",
            dest: "dist/",
          },
        ],
      },
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./",
            src: ["*.html"],
            dest: "dist",
          },
        ],
      },
      fonts: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "node_modules/open-iconic/font",
            src: ["fonts/*.*"],
            dest: "dist",
          },
        ],
      },
    },

    clean: {
      build: {
        src: ["dist/"],
      },
    },

    cssmin: {
      dist: {},
    },

    uglify: {
      dist: {},
    },

    concat: {
      options: {
        separator: ";",
      },
      dist: {},
    },

    useminPrepare: {
      foo: {
        dest: "dist",
        src: ["index.html", "contacto.html", "nosotros.html", "precios.html"],
      },
      options: {
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
          post: {
            css: [
              {
                name: "cssmin",
                createConfig: function (context, block) {
                  let generated = context.options.generated;
                  generated.options = {
                    keepSpecialComments: 0,
                    rebase: false,
                  };
                },
              },
            ],
          },
        },
      },
    },

    usemin: {
      html: [
        "dist/index.html",
        "dist/contacto.html",
        "dist/nosotros.html",
        "dist/precios.html",
      ],
      options: {
        assetsDir: ["dist", "dist/css", "dist/js"],
      },
    },
  });

  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("img:compress", ["imagemin"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "usemin",
  ]);
};
