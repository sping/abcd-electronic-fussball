module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      deployTo: '/var/api/abcdef',
      deployTo: '/var/www/fussball-react',
      repositoryUrl: 'git@github.com:sping/abcd-electronic-fussball.git',
      keepReleases: 10,
      deleteOnRollback: false,
      shallowClone: false
    },
    staging: {
      branch: 'develop',
      servers: 'root@adleman.servers.sping.nl'
    },
    production: {
      branch: 'master',
      servers: 'root@adleman.servers.sping.nl'
    }
  });

  shipit.blTask('build', function() {
    return shipit.local('cd tmp/app/web && npm install && npm run build');
  });

  shipit.on('fetched', function () {
    return shipit.start('build');
  });
};
