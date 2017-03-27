module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'app/web/build',
      deployTo: '/var/www/fussball-react',
      repositoryUrl: 'git@github.com:sping/abcd-electronic-fussball.git',
      keepReleases: 10,
      deleteOnRollback: false,
      shallowClone: false
    },
    production: {
      servers: 'bing@5.157.85.46',
      branch: 'master'
    },
    staging: {
      servers: 'bing@5.157.85.46',
      branch: 'develop'
    },
  });

  shipit.blTask('build', function() {
    return shipit.local('cd tmp/app/web && npm install && npm run build');
  });

  shipit.on('fetched', function () {
    return shipit.start('build');
  });
};
