module.exports = function()
{
    var grunt = require('grunt');
    grunt.initConfig({
        jshint: {
            files: ["*.js"],
            options: {
                esnext: true,
                globals: {
                    jQuery: true
                }
            }
        },
        less: {
            production: {
                files: {
                    "public/stylesheets/style.css": ["public/stylesheets/*.less"]
                }
            }
        },
        autoprefixer: {
            single_file: {
                src: "public/stylesheets/style.css",
                dest: "public/stylesheets/style.css"
            }
        },
        browserify: {
            client: {
                src: ["client.js"],
                dest: "public/javascripts/bundled/bundle.js"
            }
        },
        watch: {
            css: {
                files: ["public/stylesheets/*.less"],
                tasks: ["css"]
            },
            scripts: {
                files: ["public/javascripts/*.js", "client.js", "routes/*.js"],
                tasks: ["browserify"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("css", ["less", "autoprefixer"]);
    grunt.registerTask("js", ["browserify"])
    grunt.registerTask("default", ["js"]);

};