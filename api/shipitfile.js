module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-pm2')(shipit);
  require('shipit-npm')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      deployTo: '/var/api/abcdef',
      repositoryUrl: 'git@github.com:sping/abcd-electronic-fussball.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      shallowClone: true,
      dirToCopy: 'api',
      npm: {
        remote: true,
        installFlags: ['--only=production']
      },
      shared: {
        overwrite: false,
        files: [
          'config/config.json',
          'config/env.json',
          'app.json'
        ],
      }
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

  shipit.blTask('db:migrate', function() {
    return shipit.remote('cd ' + shipit.config.deployTo + '/current && npm run db:migrate');
  });

  shipit.on('published', function() {
    return shipit.start('db:migrate');
  });
};


