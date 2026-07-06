module.exports = {
    apps: [
        {
            name: 'example.app',
            script: 'build/index.js',
            // cwd: '/srv/http/7vn/example.cpp',
            instances: 'max',
            exec_mode: 'cluster',
            node_args: '--env-file=.env',
            env: {
                NODE_ENV: 'production',
                ORIGIN: 'https://7vn.org'
            }
            // max_memory_restart: '300M',
            // log_date_format: 'YYYY-MM-DD HH:mm:ss',
            // error_file: '/srv/http/7vn/example.app/logs/stderr.log',
            // out_file: '/srv/http/7vn/example.app/logs/stdout.log'
        }
    ]
};
