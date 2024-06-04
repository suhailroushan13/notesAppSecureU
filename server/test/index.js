import autocannon from 'autocannon';
import { PassThrough } from 'stream';

function run(url) {
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 100, // Number of concurrent connections
        duration: 20, // Duration of the test in seconds
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });

    autocannon.track(inst, { outputStream });

    outputStream.on('data', data => buf.push(data));
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    });
}

console.log('Running autocannon test...');
run('http://172.20.160.178:5000/');
