import { addHistory } from './base';

export function install(pkg) {
  var payload = {};
  payload[pkg] = true;
  return {
    type: 'NPM_INSTALL',
    payload: payload
  };
}

export function npm(names) {
  return (dispatch, getState) => {
    if (names.length) {
      switch (names[0]) {
        case 'install':
          if (names[1] === 'netlify-cli' && names[2] === '-g') {
            dispatch(install('netlify-cli'));
            return dispatch(addHistory(
              'Great job! Now you have a new netlify command available',
              'Try typing \'netlify\' to learn more about what it does'
            ));
          }
          if (names[1] === 'netlify-cli' && names[2] !== '-g') {
            return dispatch(addHistory(
              'Make sure you add -g when installing netlify-cli',
              'Without -g you won\'t actually add netlify as a global command'
            ));
          }
          if (names[1] === 'netlify') {
            return dispatch(addHistory(
              'The \'netlify\' package in npm is our node library that you can',
              'use to do deploys from within your own scripts or apps.',
              'To start this tutorial you\'ll need \'netlify-cli\''
            ));
          }
          if (names.length === 1) {
            return dispatch(addHistory(
              `ENOENT, open '/Users/mbc/package.json'`,
              `package.json This is most likely not a problem with npm itself.`,
              `package.json npm can't find a package.json file in your current directory.`
            ));
          }
          return dispatch(addHistory(
            'Don\'t worry about this package right now.',
            'You won\'t need it for this tutorial.'
          ));
        default:
          dispatch(addHistory(
            'You really didn\'t expect us to implement all of npm in the browser, right?',
            'How about typing \'npm install netlify-cli -g\'?'
          ));
      }
    } else {
      dispatch(addHistory(
'Usage: npm <command>',
'',
'where <command> is one of:',
'    access, add-user, adduser, apihelp, author, bin, bugs, c,',
'    cache, completion, config, ddp, dedupe, deprecate, dist-tag,',
'    dist-tags, docs, edit, explore, faq, find, find-dupes, get,',
'    help, help-search, home, i, info, init, install, issues, la,',
'    link, list, ll, ln, login, ls, outdated, owner, pack,',
'    prefix, prune, publish, r, rb, rebuild, remove, repo,',
'    restart, rm, root, run-script, s, se, search, set, show,',
'    shrinkwrap, star, stars, start, stop, t, tag, test, tst, un,',
'    uninstall, unlink, unpublish, unstar, up, update, v,',
'    verison, version, view, whoami',
'',
'npm <cmd> -h     quick help on <cmd>',
'npm -l           display full usage info',
'npm faq          commonly asked questions',
'npm help <term>  search for help on <term>',
'npm help npm     involved overview',
'',
'or on the command line via: npm <command> --key value',
'Config info can be viewed via: npm help config'));
    }
  };
}
