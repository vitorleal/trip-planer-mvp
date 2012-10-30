module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'public/javascripts/*.js', 'configs/*.js']
    },
    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  false,
        noarg:   true,
        sub:     true,
        undef:   true,
        eqnull:  true,
        browser: true
      },
      globals: {
        jQuery:    true,
        $:         true,
        google:    true,
        module:    true,
        require:   true,
        __dirname: true,
        process:   true,
        console:   true,
        global:    true
      }
    },
    /*concat: {
      dist: {
        src: ['public/intro.js', 'src/project.js', 'src/outro.js'],
        dest: 'dist/built.js'
      }
    },*/
    min: {
      dist: {
        src: ['public/javascripts/map.js'],
        dest: 'public/javascripts/min/map.min.js'
      }
    }/*,
    img: {
      task: {
          src: 'public/images',
          dest: 'public/images'
      }
    }*/
  });

  grunt.loadNpmTasks('grunt-img');

  // Default task.
  grunt.registerTask('default', 'lint min');

};