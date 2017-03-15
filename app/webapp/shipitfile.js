module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      dirToCopy: 'webapp/build',
      deployTo: '/var/www/widm',
      repositoryUrl: 'https://bingneef@bitbucket.org/snowflakeapps/widm.git',
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
    return shipit.local('cd tmp/webapp && npm install && npm run build');
  });

  shipit.on('fetched', function () {
    return shipit.start('build');
  });
};
